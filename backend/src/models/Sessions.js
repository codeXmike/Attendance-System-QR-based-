// src/models/AttendanceSession.js
import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema({
  session_type: { type: String, enum: ["Lecture", "Event", "Hostel"], required: true },
  session_ref: { type: mongoose.Schema.Types.ObjectId, required: true }, // points to Lecture/Event/Hostel

  started_at: { type: Date, default: Date.now },
  ended_at: { type: Date }, // mark when closed
  created_by: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  refPath: "created_by_model"
},
created_by_model: {
  type: String,
  required: true,
  enum: ["Lecturer", "Admins"]
},

  status: { type: String, enum: ["in-progress", "closed"], default: "in-progress" },


  // instead of one student per record, keep array inside session
  records: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
      status: { type: String, enum: ["Present", "Absent"], default: "Present" },
      recorded_at: { type: Date, default: Date.now },
      scan_method: { type: String, enum: ["Phone Cam","2D Scanner", "Manual"], default: "2D Scanner" },
      metadata: { type: Object, default: {} }
    }
  ]
});

export default mongoose.model("AttendanceSession", attendanceSessionSchema);
