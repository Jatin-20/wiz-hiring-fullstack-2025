import express from 'express';
import { initDB } from '../db.js';

const router = express.Router();

// GET /users/:email/bookings
router.get('/:email/bookings', async (req, res) => {
  const { email } = req.params;

  try {
    const db = await initDB();

    const bookings = await db.all(
      `SELECT b.id, b.slot, b.name, e.title as eventTitle
       FROM bookings b
       JOIN events e ON b.eventId = e.id
       WHERE b.email = ?`,
      [email]
    );

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

export default router;
