import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Create a session' });
});
router.get('/:id', (req, res) => {
  res.json({ message: `Get session ${req.params.id}` });
});
router.get('/course/:id', (req, res) => {
  res.json({ message: `Get sessions for course ${req.params.id}` });
});
router.put('/:id', (req, res) => {
  res.json({ message: `Update session ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete session ${req.params.id}` });
});

export default router;