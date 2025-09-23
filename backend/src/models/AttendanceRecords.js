// src/models/AttendanceRecord.js
import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },

  session_type: { type: String, enum: ["Lecture", "Event", "Hostel"], required: true },
  session_ref: { type: mongoose.Schema.Types.ObjectId, required: true }, // Course/Event/Hostel
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: "AttendanceSession", required: true },

  lecturer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer" }, // only for lectures
  started_at: { type: Date, required: true },
  ended_at: { type: Date },

  status: { type: String, enum: ["in-progress", "submitted"], default: "in-progress" },

  // optional summary fields
  total_scans: { type: Number, default: 0 },
  total_present: { type: Number, default: 0 },
  total_duplicates: { type: Number, default: 0 }
});

export default mongoose.model("AttendanceRecord", attendanceRecordSchema);
