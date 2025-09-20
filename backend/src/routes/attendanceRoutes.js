import express from 'express';

const router = express.Router();

router.post("/scan", (req, res) => {
  res.json({ message: "Scan attendance route hit" });
});
router.get("/course/:courseId", (req, res) => {
  res.json({ message: `Attendance for course ${req.params.courseId}` });
});
router.get("/student/:studentId", (req, res) => {
  res.json({ message: `Attendance for student ${req.params.studentId}` });
});
router.get("/session/:sessionId", (req, res) => {
  res.json({ message: `Attendance for session ${req.params.sessionId}` });
});

export default router;