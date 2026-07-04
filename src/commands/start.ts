import { Context } from "telegraf";
import { t_, LANG_OPTIONS, getUserLang, setUserLang } from "../i18n";

export async function handleStart(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) return;

  const saved = await getUserLang(userId);
  if (saved) {
    const w = t_(saved, "welcome");
    const ct = t_(saved, "commandsTitle");
    const cg = t_(saved, "cmdGenerate");
    const cc = t_(saved, "cmdCancel");
    await ctx.reply(`${w}\n\n${ct}\n\n${cg}\n${cc}`);
    return;
  }

  const buttons = Object.entries(LANG_OPTIONS).map(([code, label]) => ({
    text: label,
    callback_data: `lang:${code}`,
  }));

  const rows: typeof buttons[] = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }

  await ctx.reply(t_("en", "chooseLang"), {
    reply_markup: { inline_keyboard: rows },
  });
}

export async function handleLangCallback(ctx: Context): Promise<void> {
  const data = (ctx.callbackQuery as any)?.data as string;
  const lang = data.replace("lang:", "");
  const userId = ctx.from?.id;
  if (!userId) return;

  await setUserLang(userId, lang);
  await ctx.answerCbQuery();

  const w = t_(lang, "welcome");
  const ct = t_(lang, "commandsTitle");
  const cg = t_(lang, "cmdGenerate");
  const cc = t_(lang, "cmdCancel");

  await ctx.editMessageText(`${w}\n\n${ct}\n\n${cg}\n${cc}`);
}
