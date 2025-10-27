import AttendanceSession from "../models/Sessions.js";
import Student from "../models/Students.js";
import Course from "../models/Courses.js";
import { decrypt } from "../utils/cryptoUtils.js";



export const scanStudent = async (req, res) => {
  try {
    const { payload, sessionId } = req.body;
    console.log(req.body);
    // 1. Decrypt
    const matric_no = decrypt(payload);
    // 2. Validate student
    const student = await Student.findOne({ matric_no });
    console.log("Student:", student);
    if (!student) {
      return res.status(404).json({ error: "Invalid QR code: student not found" });
    }
    console.log("Scanned student:", student.name, student.matric_no);

    // 3. Find session
    const session = await AttendanceSession.findOne({ _id: sessionId, status: "in-progress" });
    if (!session) {
      return res.status(400).json({ error: "No active attendance session" });
    }


    // 4. Check if already scanned
    const alreadyScanned = session.records.find(s => s.student_id.toString() === student._id.toString());
    if (alreadyScanned) {
      return res.json({
        name: student.name,
        matricNo: student.matric_no,
        status: "Duplicate"
      }); 
    }

    session.records.push({
      student_id: student._id,
      recorded_at: new Date(),
      status: "Present"
    });
    await session.save();

    res.json({
      student,
      student_id: student._id,
      name: student.name,
      matricNo: student.matric_no,
      course: session.session_type === "Lecture" ? session.session_ref : undefined,
      status: "marked"
    });

  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Failed to process scan" });
  }
};