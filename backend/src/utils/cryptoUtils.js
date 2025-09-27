
import crypto from "crypto";

/**
 * @param {string} text
 * @returns {{ciphertext: string, iv: string, authTag: string}}
 */
export function encrypt(text) {
  const SECRET_KEY = Buffer.from(process.env.AES_SECRET_KEY, "base64"); // 64 hex chars = 32 bytes
const ALGO = "aes-256-gcm";

  const iv = crypto.randomBytes(12); // 12 bytes for GCM
  const cipher = crypto.createCipheriv(ALGO, SECRET_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted,
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  };
}

/**
 * @param {{ciphertext: string, iv: string, authTag: string}} payload
 * @returns {string} plaintext
 */
export function decrypt({ ciphertext, iv, authTag }) {
  console.log("Data", { ciphertext, iv, authTag });
  const SECRET_KEY = Buffer.from(process.env.AES_SECRET_KEY, "base64"); // 64 hex chars = 32 bytes
const ALGO = "aes-256-gcm";

  const decipher = crypto.createDecipheriv(
    ALGO,
    SECRET_KEY,
    Buffer.from(iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(authTag, "base64"));

  let decrypted = decipher.update(ciphertext, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
