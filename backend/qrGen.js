import fs from "fs";
import QRCode from "qrcode";
import { encrypt } from "./encrypt.js";

// Example: Encrypt matric no
const matricNo = "GOU/U24/CSC/1353";
const encrypted = encrypt(matricNo);

// Convert encrypted data into a compact JSON string
const payload = JSON.stringify(encrypted);

export const generateQRCode = async (data) => {
  try {
    const imageUrl = await QRCode.toDataURL(data);
    return imageUrl;
  } catch (err) {
    console.error("Failed to generate QR code:", err);
    throw err;
  }
}
QRCode.toFile("./student_qr.png", payload, {
  color: {
    dark: "#000000",  // QR code color
    light: "#ffffff"  // background
  },
}, (err) => {
  if (err) throw err;
  console.log("✅ QR code saved as student_qr.png");
});

// Optionally, also print QR in terminal
QRCode.toString(payload, { type: "terminal" }, (err, qr) => {
  if (err) throw err;
  console.log(qr);
});
