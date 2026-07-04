import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./types";
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
    { command: "start", description: "Start the bot" },
    { command: "generate", description: "Generate QR Code" },
    { command: "cancel", description: "Cancel operation" },
  ]);
  await bot.telegram.setChatMenuButton({ menuButton: { type: "commands" } });
}
