import QRCode from "qrcode";

export async function generateQRBuffer(text: string): Promise<Buffer> {
  return QRCode.toBuffer(text, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}
