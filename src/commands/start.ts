import { Context } from "telegraf";

export async function handleStart(ctx: Context): Promise<void> {
  await ctx.reply(
    "سلام به ربات خوش آمدید. این ربات یک سازنده کیو ار کد می باشد. توسط رنگو ساخته شده.\n\n" +
    "دستورات ربات:\n\n" +
    "/generate - ساخت کیو ار کد\n" +
    "/cancel - لغو عملیات"
  );
}
