// src/models/Lecturer.js
import mongoose from "mongoose";
const lecturerSchema = new mongoose.Schema({
  staff_no: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  department_id: { type: String, required: true },
  phone: { type: String },
  
  sessions:[
    {
      session_id:{ type:String, required: true},
      session_name:{ type:String, required: true},
      session_time:{type: String, required:false}
    }
  ],
  courses:[
    {
      course_id:{ type:String, required: true},
      course_name:{ type:String, required: true},
      lecture_hall:{type: String, required:false}
    }
  ],
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Lecturer", lecturerSchema);

