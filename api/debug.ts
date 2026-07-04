import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/bot";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const commands = await bot.telegram.getMyCommands();
    const webhookInfo = await bot.telegram.getWebhookInfo();
    return res.status(200).json({ commands, webhook: webhookInfo });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
