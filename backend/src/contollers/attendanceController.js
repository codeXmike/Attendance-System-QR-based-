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
    if (!student) {
      return res.status(404).json({ error: "Invalid QR code: student not found" });
    }
    console.log("Scanned student:", student.name, student.matric_no);

    // 3. Find session
    const session = await AttendanceSession.findOne({ id: sessionId, status: "in-progress" });
    if (!session) {
      return res.status(400).json({ error: "No active attendance session" });
    }

    // 4. Check if already scanned
    const alreadyScanned = session.scans.find(s => s.student_id.toString() === student._id.toString());
    if (alreadyScanned) {
      return res.json({
        name: student.name,
        matricNo: student.matricNo,
        status: "duplicate"
      });
    }

    // 5. Record attendance
    session.scans.push({
      student_id: student._id,
      timeScanned: new Date(),
      status: "present"
    });
    await session.save();

    // 6. Respond with student info
    res.json({
      name: student.name,
      matricNo: student.matricNo,
      course: session.session_type === "Lecture" ? session.session_ref : undefined,
      status: "marked"
    });

  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Failed to process scan" });
  }
};