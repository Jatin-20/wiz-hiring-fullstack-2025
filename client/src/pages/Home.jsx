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

  if (loading) return <p className="text-center text-gray-600">Loading events...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events available.</p>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-300 shadow-sm rounded-lg p-5 hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Total Slots: {event.slots?.length || 0}
              </p>
              <Link
                to={`/event/${event.id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
