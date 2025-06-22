const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getEvents() {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}

export async function getEventById(id) {
  const res = await fetch(`${API_BASE_URL}/events/${id}`);
  return res.json();
}


export async function bookSlot(eventId, slot, name, email) {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, slot }),
  });
  if (!res.ok) throw new Error('Booking failed');
}

export async function getBookingsByEmail(email) {
  const res = await fetch(`${API_BASE_URL}/users/${email}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

