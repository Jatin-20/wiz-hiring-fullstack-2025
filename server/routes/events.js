import express from 'express';
import { initDB } from '../db.js';

const router = express.Router();

// POST /events — Create a new event
router.post('/', async (req, res) => {
  const { title, description, maxBookingsPerSlot, slots, creatorName } = req.body;

  // Basic validation
  if (!title || !slots || !Array.isArray(slots)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = await initDB();
    const result = await db.run(
      'INSERT INTO events (title, description, maxBookingsPerSlot, slots, creatorName) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', maxBookingsPerSlot, JSON.stringify(slots), creatorName || 'Anonymous']
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
        slots: JSON.parse(event.slots),
        creatorName: event.creatorName || 'Anonymous'
      }));
  
      res.json(events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      res.status(500).json({ error: "Could not retrieve events" });
    }
  });
  

// GET /events/:id — Get event details with slot availability
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = await initDB();
  
      const event = await db.get("SELECT * FROM events WHERE id = ?", [id]);
  
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      const parsedSlots = JSON.parse(event.slots);
  
      const bookings = await db.all(
        "SELECT slot, COUNT(*) as count FROM bookings WHERE eventId = ? GROUP BY slot",
        [id]
      );
  
      const bookingMap = {};
      bookings.forEach(b => {
        bookingMap[b.slot] = b.count;
      });
  
      const slotsWithStatus = parsedSlots.map(slot => {
        const count = bookingMap[slot] || 0;
        return {
          time: slot,
          bookings: count,
          full: count >= event.maxBookingsPerSlot
        };
      });
  
      res.json({
        id: event.id,
        title: event.title,
        description: event.description,
        maxBookingsPerSlot: event.maxBookingsPerSlot,
        slots: slotsWithStatus,
        creatorName: event.creatorName || 'Anonymous',
      });
    } catch (err) {
      console.error("Error fetching event details:", err);
      res.status(500).json({ error: "Failed to fetch event details" });
    }
  });
  
// POST /events/:id/bookings — Book a time slot
router.post("/:id/bookings", async (req, res) => {
    const { id } = req.params;
    const { name, email, slot } = req.body;
  
    if (!name || !email || !slot) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const normalizedSlot = new Date(slot).toISOString();
  
    try {
      const db = await initDB();
  
      const event = await db.get("SELECT * FROM events WHERE id = ?", [id]);
  
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      const eventSlots = JSON.parse(event.slots).map(s => new Date(s).toISOString()); // Normalize all event slots

      if (!eventSlots.includes(normalizedSlot)) {
        return res.status(400).json({ error: "Invalid slot" });
      }
  
      const existingBooking = await db.get(
        "SELECT * FROM bookings WHERE eventId = ? AND slot = ? AND email = ?",
        [id, slot, email]
      );
  
      if (existingBooking) {
        return res.status(400).json({ error: "Already booked this slot" });
      }
  
      const slotBookings = await db.get(
        "SELECT COUNT(*) as count FROM bookings WHERE eventId = ? AND slot = ?",
        [id, slot]
      );
  
      if (slotBookings.count >= event.maxBookingsPerSlot) {
        return res.status(400).json({ error: "Slot is full" });
      }
  
      await db.run(
        "INSERT INTO bookings (eventId, slot, name, email) VALUES (?, ?, ?, ?)",
        [id, slot, name, email]
      );
  
      res.status(201).json({ message: "Booking confirmed" });
    } catch (err) {
      console.error("Booking error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// GET /events/user/:email/bookings — View all bookings by a user
router.get('/user/:email/bookings', async (req, res) => {
  const { email } = req.params;

  try {
    const db = await initDB();

    const bookings = await db.all(
      `SELECT b.id, b.name, b.email, b.slot, e.title as eventTitle
       FROM bookings b
       JOIN events e ON b.eventId = e.id
       WHERE b.email = ?
       ORDER BY b.slot ASC`,
      [email]
    );

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

  
export default router;
