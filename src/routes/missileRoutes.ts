import express from 'express';
import Missile from '../models/Missile';

const router = express.Router();

// נתיב לטעינת כל הטילים
router.get('/', async (req, res) => {
  try {
    const missiles = await Missile.find(); 
    res.json(missiles);
  } catch (error) {
    console.error('Error fetching missiles:', error);
    res.status(500).json({ error: 'Failed to fetch missiles data' });
  }
});

export default router;
