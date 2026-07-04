import { Context } from "telegraf";
import { t_, getUserLang } from "../i18n";

export async function handleCancel(ctx: Context): Promise<void> {
  const lang = (ctx.from?.id && (await getUserLang(ctx.from.id))) || ctx.from?.language_code || "en";
  await ctx.reply(t_(lang, "cancelled"));
}
