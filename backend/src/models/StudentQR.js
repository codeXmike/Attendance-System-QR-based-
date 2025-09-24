// src/models/StudentQR.js
import mongoose from "mongoose";

const studentQRSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
  qr_code: { type: String, required: true }, // AES-256 encrypted matric, Base64/Hex
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("StudentQR", studentQRSchema);
