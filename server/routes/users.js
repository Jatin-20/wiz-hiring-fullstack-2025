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
    // Fetch event title from DB (based on your logic)
    const event = await Event.findById(eventId); // if using MongoDB

    // Save booking logic here...
    
    // Send confirmation email
    await sendConfirmationEmail(email, name, event.title, slotTime);

    res.status(200).json({ message: "Booked and email sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to book" });
  }
});

export default router;
