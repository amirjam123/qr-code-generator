import { Context } from "telegraf";
import { fa, en, Lang } from "../i18n";

export async function handleStart(ctx: Context): Promise<void> {
  const lang: Lang = ctx.from?.language_code?.startsWith("fa") ? fa : en;

  await ctx.reply(
    `${lang.welcome}\n\n` +
    `${lang.commandsTitle}\n\n` +
    `${lang.cmdGenerate}\n` +
    `${lang.cmdCancel}`
  );
}
