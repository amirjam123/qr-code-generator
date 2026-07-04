import { Context } from "telegraf";

export async function handleCancel(ctx: Context): Promise<void> {
  await ctx.reply("عملیات متوقف شد.");
}
