// src/models/AttendanceSession.js
import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema({
  session_name: { type: String, required: true },
  session_type: { type: String, enum: ["Lecture", "Event", "Hostel"], required: true },
  started_at: { type: Date, default: Date.now },
  ended_at: { type: Date },
  created_by: { type: mongoose.Schema.Types.ObjectId, required: true},
  status: { type: String, enum: ["in-progress", "closed"], default: "in-progress" },
  metadata: { type: Object, default: {} }, // ✅ add this
  records: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
      status: { type: String, enum: ["Present", "Absent"], default: "Present" },
      recorded_at: { type: Date, default: Date.now },
      scan_method: { type: String, enum: ["Phone Cam", "2D Scanner", "Manual"], default: "2D Scanner" },
      metadata: { type: Object, default: {} },
    },
  ],
});


export default mongoose.model("AttendanceSession", attendanceSessionSchema);
