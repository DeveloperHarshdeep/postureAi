import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Posture Detection Backend is running...');
});

export default router;
