import express from 'express';

const router = express.Router();

router.post('/qr/generate', (req, res) => {
  res.json({ message: 'QR code generated' });
});
router.post('/qr/decrypt', (req, res) => {
  res.json({ message: 'QR code decrypted' });
});


export default router;