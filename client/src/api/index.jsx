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

export async function bookSlot(eventId, slotTime) {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ time: slotTime }),
  });
  if (!res.ok) throw new Error('Booking failed');
}
