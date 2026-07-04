import { Context } from "telegraf";
import { getLang } from "../i18n";

export async function handleGenerate(ctx: Context): Promise<void> {
  const lang = getLang(ctx.from?.language_code);
  await ctx.reply(lang.generatePrompt, {
    reply_markup: { force_reply: true, input_field_placeholder: lang.placeholder },
  });
}
