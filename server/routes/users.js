import express from 'express';
import { initDB } from '../db.js';
import sendConfirmationEmail from '../utils/sendMail.js';

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

router.post('/book', async (req, res) => {
  const { eventId, slotTime, name, email } = req.body;

  try {
    const db = await initDB();

    // Fetch event title
    const event = await db.get('SELECT title FROM events WHERE id = ?', [eventId]);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Insert booking
    await db.run(
      'INSERT INTO bookings (eventId, slot, name, email) VALUES (?, ?, ?, ?)',
      [eventId, slotTime, name, email]
    );

    // Send confirmation email
    await sendConfirmationEmail(email, event.title, slotTime);

    res.status(200).json({ message: "Booked and email sent" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Failed to book" });
  }
});


export default router;
