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

// GET /events — Return all created events
router.get("/", async (req, res) => {
    try {
      const db = await initDB();
  
      const rows = await db.all("SELECT * FROM events");
  
      const events = rows.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        maxBookingsPerSlot: event.maxBookingsPerSlot,
        slots: JSON.parse(event.slots)
      }));
  
      res.json(events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      res.status(500).json({ error: "Could not retrieve events" });
    }
  });
  

export default router;
