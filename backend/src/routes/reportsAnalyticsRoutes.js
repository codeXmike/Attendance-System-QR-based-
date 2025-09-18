import express from 'express';

const router = express.Router();

router.get('/student/:studentId', (req, res) => {
  res.json({ message: `Report for student ${req.params.studentId}` });
});
router.get('/course/:courseId', (req, res) => {
  res.json({ message: `Report for course ${req.params.courseId}` });
});
router.get('/lecture/:lectureId', (req, res) => {
  res.json({ message: `Report for lecture ${req.params.lectureId}` });
});
router.get('/university', (req, res) => {
  res.json({ message: 'University-wide report' });
});

export default router;