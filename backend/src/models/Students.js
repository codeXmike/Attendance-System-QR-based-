// src/models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  matric_no: { type: String, required: true },
  matric_hash: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  department_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  status: { type: String, default: "active" }
});

export default mongoose.model("Student", studentSchema);