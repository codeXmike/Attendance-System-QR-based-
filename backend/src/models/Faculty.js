// src/models/Faculty.js
import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Faculty", facultySchema);
