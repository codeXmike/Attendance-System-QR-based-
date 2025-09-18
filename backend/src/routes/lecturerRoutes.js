import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all lecturers' });
});
router.post('/', (req, res) => {
  res.json({ message: 'Create a lecturer' });
});
router.get('/:id', (req, res) => {
  res.json({ message: `Get lecturer ${req.params.id}` });
});
router.put('/:id', (req, res) => {
  res.json({ message: `Update lecturer ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete lecturer ${req.params.id}` });
});

export default router;