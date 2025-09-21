// src/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  department_id: { type: String, required: true },
  lecturer_id: { type: String, required: true },
  credits: { type: Number, default: 3 },
  semester: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);
