import express from "express";
import { login } from "../contollers/authController.js";
import { encrypt, decrypt } from "../utils/cryptoUtils.js";

const router = express.Router();

router.post("/login", (req, res) => {
  // Example encryption + decryption test
  // const payload = encrypt("GOU/U24/CSC/1392");
  // console.log("Encrypted:", payload);

  // const plain = decrypt({"ciphertext":"vE9n2RWva2ChRBpeZU3qkQ==","iv":"Ag2yydZETn5j163u","authTag":"HBdg7bMpgk+GIJqFgognnw=="});
  // console.log("Decrypted:", plain);

  // // Call your real login controller after testing
  return login(req, res);
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logout route hit" });
});

router.post("/refresh", (req, res) => {
  res.json({ message: "Refresh token route hit" });
});

export default router;
