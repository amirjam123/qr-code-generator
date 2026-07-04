export const BOT_TOKEN = process.env.BOT_TOKEN || "8976954856:AAG2FxiZH1BoBJIRalqKjkwO-QkxinXAf1g";
export const STORAGE_CHANNEL_ID = process.env.STORAGE_CHANNEL_ID || "";
export const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BASE_URL || "";
export const MAX_FILE_SIZE = 20 * 1024 * 1024;
