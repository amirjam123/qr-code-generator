import { Telegraf } from "telegraf";
import { BOT_TOKEN, GENERATE_PROMPT_TEXT } from "./types";
import { handleStart, handleLangCallback } from "./commands/start";
import { handleGenerate } from "./commands/generate";
import { handleCancel } from "./commands/cancel";
import { handleGenerateReply } from "./commands/handleReply";
import { fa, en } from "./i18n";

export const bot = new Telegraf(BOT_TOKEN);

bot.start(handleStart);
bot.command("generate", handleGenerate);
bot.command("cancel", handleCancel);

bot.action(/^lang:(fa|en)$/, handleLangCallback);

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
