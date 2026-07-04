import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function getUserLang(userId: number): Promise<string | null> {
  if (!redis) return null;
  try {
    return await redis.get<string>(`lang:${userId}`);
  } catch {
    return null;
  }
}

export async function setUserLang(userId: number, lang: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(`lang:${userId}`, lang);
  } catch (e) {
    console.error("Failed to save language:", e);
  }
}

type Translations = Record<string, Record<string, string>>;

const t: Translations = {
  fa: {
    welcome: "سلام به ربات خوش آمدید. این ربات یک سازنده کیو ار کد می باشد. توسط رنگو ساخته شده.",
    commandsTitle: "دستورات ربات:",
    cmdGenerate: "/generate - ساخت کیو ار کد",
    cmdCancel: "/cancel - لغو عملیات",
    generatePrompt: "لطفا فایل یا داده مورد نظری که قصد تبدیل آن به کیو ار کد را ارسال کنید",
    cancelled: "عملیات متوقف شد.",
    error: "متاسفانه خطایی در پردازش رخ داد. لطفا دوباره تلاش کنید.",
    fileTooLarge: "حجم فایل بیش از ۲۰ مگابایت است و پشتیبانی نمی‌شود.",
    chooseLang: "زبان خود را انتخاب کنید:",
    langSet: "زبان شما تنظیم شد: فارسی",
    placeholder: "فایل یا متن خود را ارسال کنید",
  },
  en: {
    welcome: "Welcome to the bot. This is a QR Code generator bot. Made by Rango.",
    commandsTitle: "Bot Commands:",
    cmdGenerate: "/generate - Generate QR Code",
    cmdCancel: "/cancel - Cancel operation",
    generatePrompt: "Please send the file or data you want to convert to a QR Code",
    cancelled: "Operation cancelled.",
    error: "An error occurred while processing. Please try again.",
    fileTooLarge: "File size exceeds 20MB and is not supported.",
    chooseLang: "Choose your language:",
    langSet: "Language set to: English",
    placeholder: "Send a file or text",
  },
  ru: {
    welcome: "Добро пожаловать! Это бот для генерации QR-кодов. Создано Rango.",
    commandsTitle: "Команды бота:",
    cmdGenerate: "/generate - Создать QR-код",
    cmdCancel: "/cancel - Отменить операцию",
    generatePrompt: "Отправьте файл или данные для создания QR-кода",
    cancelled: "Операция отменена.",
    error: "Произошла ошибка при обработке. Попробуйте снова.",
    fileTooLarge: "Размер файла превышает 20 МБ и не поддерживается.",
    chooseLang: "Выберите язык:",
    langSet: "Язык установлен: Русский",
    placeholder: "Отправьте файл или текст",
  },
  ar: {
    welcome: "مرحبا بك في البوت. هذا بوت لإنشاء رمز QR. صنع بواسطة رانجو.",
    commandsTitle: "أوامر البوت:",
    cmdGenerate: "/generate - إنشاء رمز QR",
    cmdCancel: "/cancel - إلغاء العملية",
    generatePrompt: "يرجى إرسال الملف أو البيانات التي تريد تحويلها إلى رمز QR",
    cancelled: "تم إلغاء العملية.",
    error: "حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى.",
    fileTooLarge: "حجم الملف يتجاوز 20 ميجابايت ولا يُدعم.",
    chooseLang: "اختر لغتك:",
    langSet: "تم تعيين اللغة إلى: العربية",
    placeholder: "أرسل ملفا أو نصا",
  },
  es: {
    welcome: "¡Bienvenido! Este es un bot generador de códigos QR. Hecho por Rango.",
    commandsTitle: "Comandos del bot:",
    cmdGenerate: "/generate - Generar código QR",
    cmdCancel: "/cancel - Cancelar operación",
    generatePrompt: "Envía el archivo o datos que deseas convertir en un código QR",
    cancelled: "Operación cancelada.",
    error: "Ocurrió un error al procesar. Inténtalo de nuevo.",
    fileTooLarge: "El tamaño del archivo supera 20MB y no es compatible.",
    chooseLang: "Elige tu idioma:",
    langSet: "Idioma configurado: Español",
    placeholder: "Envía un archivo o texto",
  },
  fr: {
    welcome: "Bienvenue ! Ceci est un bot générateur de codes QR. Créé par Rango.",
    commandsTitle: "Commandes du bot :",
    cmdGenerate: "/generate - Générer un code QR",
    cmdCancel: "/cancel - Annuler l'opération",
    generatePrompt: "Envoyez le fichier ou les données à convertir en code QR",
    cancelled: "Opération annulée.",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    fileTooLarge: "La taille du fichier dépasse 20 Mo et n'est pas prise en charge.",
    chooseLang: "Choisissez votre langue :",
    langSet: "Langue définie sur : Français",
    placeholder: "Envoyez un fichier ou du texte",
  },
  tr: {
    welcome: "Hoş geldiniz! Bu bir QR kod üreten bottur. Rango tarafından yapılmıştır.",
    commandsTitle: "Bot Komutları:",
    cmdGenerate: "/generate - QR Kod Oluştur",
    cmdCancel: "/cancel - İşlemi İptal Et",
    generatePrompt: "QR koda dönüştürmek istediğiniz dosyayı veya veriyi gönderin",
    cancelled: "İşlem iptal edildi.",
    error: "İşlenirken bir hata oluştu. Lütfen tekrar deneyin.",
    fileTooLarge: "Dosya boyutu 20MB'ı aşıyor ve desteklenmiyor.",
    chooseLang: "Dilinizi seçin:",
    langSet: "Dil ayarlandı: Türkçe",
    placeholder: "Bir dosya veya metin gönderin",
  },
  de: {
    welcome: "Willkommen! Dies ist ein QR-Code-Generator-Bot. Erstellt von Rango.",
    commandsTitle: "Bot-Befehle:",
    cmdGenerate: "/generate - QR-Code erstellen",
    cmdCancel: "/cancel - Vorgang abbrechen",
    generatePrompt: "Senden Sie die Datei oder Daten, die in einen QR-Code umgewandelt werden sollen",
    cancelled: "Vorgang abgebrochen.",
    error: "Bei der Verarbeitung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    fileTooLarge: "Die Dateigröße überschreitet 20 MB und wird nicht unterstützt.",
    chooseLang: "Wählen Sie Ihre Sprache:",
    langSet: "Sprache eingestellt: Deutsch",
    placeholder: "Senden Sie eine Datei oder einen Text",
  },
};

export function t_(lang: string, key: string): string {
  return t[lang]?.[key] || t["en"]?.[key] || key;
}

export const LANG_OPTIONS: Record<string, string> = {
  fa: "🇮🇷 فارسی",
  en: "🇬🇧 English",
  ru: "🇷🇺 Русский",
  ar: "🇸🇦 العربية",
  es: "🇪🇸 Español",
  fr: "🇫🇷 Français",
  tr: "🇹🇷 Türkçe",
  de: "🇩🇪 Deutsch",
};
