export const fa = {
  welcome: "سلام به ربات خوش آمدید. این ربات یک سازنده کیو ار کد می باشد. توسط رنگو ساخته شده.",
  commandsTitle: "دستورات ربات:",
  cmdGenerate: "/generate - ساخت کیو ار کد",
  cmdCancel: "/cancel - لغو عملیات",
  generatePrompt: "لطفا فایل یا داده مورد نظری که قصد تبدیل آن به کیو ار کد را ارسال کنید",
  cancelled: "عملیات متوقف شد.",
  error: "متاسفانه خطایی در پردازش رخ داد. لطفا دوباره تلاش کنید.",
  fileTooLarge: "حجم فایل بیش از ۲۰ مگابایت است و پشتیبانی نمی‌شود.",
  chooseLang: "زبان خود را انتخاب کنید:",
  langFarsi: "فارسی",
  langEnglish: "English",
  placeholder: "فایل یا متن خود را ارسال کنید",
};

export const en = {
  welcome: "Welcome to the bot. This is a QR Code generator bot. Made by Rango.",
  commandsTitle: "Bot Commands:",
  cmdGenerate: "/generate - Generate QR Code",
  cmdCancel: "/cancel - Cancel operation",
  generatePrompt: "Please send the file or data you want to convert to a QR Code",
  cancelled: "Operation cancelled.",
  error: "An error occurred while processing. Please try again.",
  fileTooLarge: "File size exceeds 20MB and is not supported.",
  chooseLang: "Choose your language:",
  langFarsi: "فارسی",
  langEnglish: "English",
  placeholder: "Send a file or text",
};

export type Lang = typeof fa;

export function getLang(languageCode?: string): Lang {
  if (languageCode && languageCode.startsWith("fa")) return fa;
  return en;
}
