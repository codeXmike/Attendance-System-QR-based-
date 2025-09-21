// src/models/faculty.js
import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    logo: { type: String },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("faculty", facultySchema);
