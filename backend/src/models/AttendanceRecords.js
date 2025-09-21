// src/models/AttendanceRecord.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true },
  event_id: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
  recorded_at: { type: Date, default: Date.now },
  recorded_by: { type: String },
  scan_method: { type: String },
  metadata: { type: Object, default: {} }
});

export default mongoose.model("AttendanceRecord", attendanceSchema);
