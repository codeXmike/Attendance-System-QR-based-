// src/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course_code: { type: String, required: true },
  name: { type: String, required: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // optional
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);
