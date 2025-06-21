const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getEvents() {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}
