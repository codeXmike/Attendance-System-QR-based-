// src/models/Department.js
import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  faculty_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Department", departmentSchema);
