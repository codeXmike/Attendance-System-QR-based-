import express from 'express';
import { login } from '../contollers/authController.js';

const router = express.Router();


router.post('/login', login);
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout route hit' });
});
router.post('/refresh', (req, res) => {
  res.json({ message: 'Refresh token route hit' });
});

export default router;