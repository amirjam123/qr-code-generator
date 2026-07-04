import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/bot";

function getMimeTypeFromPath(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    mp4: "video/mp4", webm: "video/webm", avi: "video/x-msvideo", mov: "video/quicktime",
    mp3: "audio/mpeg", ogg: "audio/ogg", wav: "audio/wav", flac: "audio/flac",
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp",
  };
  return (ext && map[ext]) || "application/octet-stream";
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderPlayer(mediaUrl: string, mimeType: string): string {
  const safeUrl = escapeHtml(mediaUrl);
  let playerHtml: string;

  if (mimeType.startsWith("image/")) {
    playerHtml = `<img src="${safeUrl}" alt="media" />`;
  } else if (mimeType.startsWith("video/")) {
    playerHtml = `<video controls autoplay playsinline src="${safeUrl}"></video>`;
  } else if (mimeType.startsWith("audio/")) {
    playerHtml = `<audio controls autoplay src="${safeUrl}"></audio>`;
  } else {
    playerHtml = `<a href="${safeUrl}" class="btn" download>دانلود فایل</a>`;
  }

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>مشاهده فایل</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#111;font-family:Tahoma,sans-serif}
  img,video,audio{max-width:100vw;max-height:100vh;object-fit:contain}
  .btn{display:inline-block;padding:14px 32px;background:#0088cc;color:#fff;text-decoration:none;border-radius:8px;font-size:18px}
</style>
</head>
<body>
${playerHtml}
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const fileParam = Array.isArray(req.query.file) ? req.query.file[0] : req.query.file;
    if (!fileParam || typeof fileParam !== "string") {
      return res.status(400).send("Missing file parameter");
    }

    const fileData = JSON.parse(Buffer.from(fileParam, "base64url").toString("utf-8"));
    const fileId = fileData.id as string;
    const fileLink = await bot.telegram.getFileLink(fileId);
    const fileInfo = await bot.telegram.getFile(fileId);
    const mimeType = fileData.mime || (fileInfo.file_path ? getMimeTypeFromPath(fileInfo.file_path) : "application/octet-stream");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(renderPlayer(fileLink.href, mimeType));
  } catch (error) {
    console.error("View error:", error);
    return res.status(500).send("Error");
  }
}
