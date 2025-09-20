import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all courses' });
});
router.post('/', (req, res) => {
  res.json({ message: 'Create a course' });
});
router.get('/:id', (req, res) => {
  res.json({ message: `Get course ${req.params.id}` });
});
router.put('/:id', (req, res) => {
  res.json({ message: `Update course ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete course ${req.params.id}` });
});

export default router;