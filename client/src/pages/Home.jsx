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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Loading events...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">Browse Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events available yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{event.description || 'No description provided.'}</p>
              </div>

              <div className="mt-auto">
                <span className="inline-block mb-3 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  {event.slots?.length || 0} Slot{event.slots?.length === 1 ? '' : 's'}
                </span>
                <Link
                  to={`/event/${event.id}`}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
