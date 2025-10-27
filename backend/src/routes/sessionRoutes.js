import express from 'express';
import { createSessions, endSessions } from '../contollers/sessionController.js';
import { getSessions } from '../contollers/sessionController.js';
const router = express.Router();

router.post('/', createSessions);
router.get('/', getSessions);
router.get('/:id', (req, res) => {
  res.json({ message: `Get session ${req.params.id}` });
});
router.get('/course/:id', (req, res) => {
  res.json({ message: `Get sessions for course ${req.params.id}` });
});
router.put('/:id', (req, res) => {
  res.json({ message: `Update session ${req.params.id}` });
});
router.put('/:id/end', endSessions);
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete session ${req.params.id}` });
});

export default router;