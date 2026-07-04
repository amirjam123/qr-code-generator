import { Context } from "telegraf";
import { GENERATE_PROMPT_TEXT } from "../types";

export async function handleGenerate(ctx: Context): Promise<void> {
  await ctx.reply(GENERATE_PROMPT_TEXT, {
    reply_markup: { force_reply: true, input_field_placeholder: "فایل یا متن خود را ارسال کنید" },
  });
}
