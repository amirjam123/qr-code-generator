import { Context } from "telegraf";
import { getLang } from "../i18n";

export async function handleCancel(ctx: Context): Promise<void> {
  const lang = getLang(ctx.from?.language_code);
  await ctx.reply(lang.cancelled);
}
