import { Context } from "telegraf";
import { fa, en } from "../i18n";

export async function handleStart(ctx: Context): Promise<void> {
  await ctx.reply("Choose your language / زبان خود را انتخاب کنید:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🇬🇧 English", callback_data: "lang:en" },
          { text: "🇮🇷 فارسی", callback_data: "lang:fa" },
        ],
      ],
    },
  });
}

export async function handleLangCallback(ctx: Context): Promise<void> {
  const data = (ctx.callbackQuery as any)?.data as string;
  const lang = data === "lang:fa" ? fa : en;

  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `${lang.welcome}\n\n` +
    `${lang.commandsTitle}\n\n` +
    `${lang.cmdGenerate}\n` +
    `${lang.cmdCancel}`
  );
}
