import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ message: 'Login route hit' });
});
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout route hit' });
});
router.post('/refresh', (req, res) => {
  res.json({ message: 'Refresh token route hit' });
});

export default router;
