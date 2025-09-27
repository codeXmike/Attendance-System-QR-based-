import express from 'express';
import { createStudent } from '../contollers/studentController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all students' });
});
router.post('/', createStudent);

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