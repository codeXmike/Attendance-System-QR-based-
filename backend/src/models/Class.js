// src/models/Class.js
import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "CSC 400 Level"
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Class", classSchema);
