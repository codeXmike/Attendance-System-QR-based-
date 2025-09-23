// src/models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["super", "admin", "faculty", "department", "class", "hostel"], required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Admin", adminSchema);
