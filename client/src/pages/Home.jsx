import { useEffect, useState } from 'react';
import { getEvents } from '../api';
import { Link } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error loading events", err);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Events</h1>

      {events.length === 0 && <p>No events found.</p>}

      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-md p-4 rounded border">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-700 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500">
              Total Slots: {event.slots?.length || 0}
            </p>
            <Link
              to={`/event/${event.id}`}
              className="inline-block mt-3 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
