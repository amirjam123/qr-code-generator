import { Telegraf } from "telegraf";
import { BOT_TOKEN, GENERATE_PROMPT_TEXT } from "./types";
import { handleStart } from "./commands/start";
import { handleGenerate } from "./commands/generate";
import { handleCancel } from "./commands/cancel";
import { handleGenerateReply } from "./commands/handleReply";

export const bot = new Telegraf(BOT_TOKEN);

bot.start(handleStart);
bot.command("generate", handleGenerate);
bot.command("cancel", handleCancel);

bot.on("message", async (ctx, next) => {
  const handled = await handleGenerateReply(ctx);
  if (!handled) return next();
});

export async function registerBotCommands() {
  await bot.telegram.setMyCommands([
    { command: "start", description: "شروع ربات" },
    { command: "generate", description: "ساخت کیو ار کد" },
    { command: "cancel", description: "لغو عملیات" },
  ]);
}
