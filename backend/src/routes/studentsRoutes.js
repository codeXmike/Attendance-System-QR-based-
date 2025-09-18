import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all students' });
});
router.post('/', (req, res) => {
  res.json({ message: 'Create a student' });
});
router.get('/:id', (req, res) => {
  res.json({ message: `Get student ${req.params.id}` });
});
router.put('/:id', (req, res) => {
  res.json({ message: `Update student ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete student ${req.params.id}` });
});

export default router;