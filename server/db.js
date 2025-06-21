import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
  const db = await open({
    filename: './data/database.db',
    driver: sqlite3.Database,
  });

  // Create `events` table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      maxBookingsPerSlot INTEGER,
      slots TEXT
    );
  `);

  // Create `bookings` table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId INTEGER,
      slot TEXT,
      name TEXT,
      email TEXT,
      UNIQUE(eventId, slot, email)
    );
  `);


  
  return db;
};
