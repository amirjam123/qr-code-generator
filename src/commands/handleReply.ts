import { Context } from "telegraf";
import { GENERATE_PROMPT_TEXT, STORAGE_CHANNEL_ID, BASE_URL, MAX_FILE_SIZE } from "../types";
import { generateQRBuffer } from "../qr";
import { getLang, Lang, fa, en } from "../i18n";

function getFileFromMessage(message: any): { file_id: string; file_name?: string; mime_type?: string; file_size?: number } | undefined {
  if (message.photo) return message.photo[message.photo.length - 1];
  if (message.video) return message.video;
  if (message.audio) return message.audio;
  if (message.document) return message.document;
  if (message.voice) return message.voice;
  if (message.video_note) return message.video_note;
  if (message.sticker) return message.sticker;
  return undefined;
}

function detectLang(ctx: Context): Lang {
  return getLang(ctx.from?.language_code);
}

export async function handleGenerateReply(ctx: Context): Promise<boolean> {
  const message = ctx.message;
  if (!message || !("reply_to_message" in message) || !message.reply_to_message) return false;

  const repliedText =
    "text" in message.reply_to_message ? message.reply_to_message.text : undefined;
  if (repliedText !== GENERATE_PROMPT_TEXT && repliedText !== fa.generatePrompt && repliedText !== en.generatePrompt) return false;

  const lang = detectLang(ctx);

  try {
    if ("text" in message && message.text) {
      const qrBuffer = await generateQRBuffer(message.text);
      await ctx.replyWithPhoto({ source: qrBuffer });
      return true;
    }

    const file = getFileFromMessage(message);

    if (!file) {
      await ctx.reply(lang.error);
      return true;
    }

    if (file.file_size && file.file_size > MAX_FILE_SIZE) {
      await ctx.reply(lang.fileTooLarge);
      return true;
    }

    if (!STORAGE_CHANNEL_ID) {
      await ctx.reply(lang.error);
      console.error("STORAGE_CHANNEL_ID is not configured");
      return true;
    }

    const forwarded = await ctx.telegram.forwardMessage(
      STORAGE_CHANNEL_ID,
      message.chat.id,
      message.message_id
    );

    const forwardedFile = getFileFromMessage(forwarded);
    if (!forwardedFile) {
      await ctx.reply(lang.error);
      return true;
    }

    const fileData = JSON.stringify({
      id: forwardedFile.file_id,
      mime: forwardedFile.mime_type || null,
      name: forwardedFile.file_name || null,
    });
    const encodedFileData = Buffer.from(fileData).toString("base64url");
    const viewUrl = `${BASE_URL}/api/view?file=${encodedFileData}`;
    const qrBuffer = await generateQRBuffer(viewUrl);
    await ctx.replyWithPhoto({ source: qrBuffer });
    return true;
  } catch (error) {
    console.error("Error in handleGenerateReply:", error);
    await ctx.reply(lang.error);
    return true;
  }
}
