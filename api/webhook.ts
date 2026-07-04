import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot, registerBotCommands } from "../src/bot";

let initialized = false;

async function initialize() {
  if (initialized) return;
  await registerBotCommands();
  initialized = true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  try {
    await initialize();
    await bot.handleUpdate(req.body);
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(200).send("OK");
  }
}
