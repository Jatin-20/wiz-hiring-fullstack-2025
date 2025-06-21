import express from 'express';
import { initDB } from '../db.js';

const router = express.Router();

// POST /events — Create a new event
router.post('/', async (req, res) => {
  const { title, description, maxBookingsPerSlot, slots } = req.body;

  // Basic validation
  if (!title || !slots || !Array.isArray(slots)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = await initDB();
    const result = await db.run(
      'INSERT INTO events (title, description, maxBookingsPerSlot, slots) VALUES (?, ?, ?, ?)',
      [title, description || '', maxBookingsPerSlot, JSON.stringify(slots)]
    );

    res.status(201).json({ message: 'Event created', eventId: result.lastID });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
