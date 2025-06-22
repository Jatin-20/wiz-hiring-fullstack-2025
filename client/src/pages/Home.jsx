import { useEffect, useState } from 'react';
import { getEvents } from '../api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Loading events...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Browse Events</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">No matching events found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const firstSlot = event.slots?.[0];
            return (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-transform hover:scale-[1.02] p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{event.title}</h2>
                  <p className="text-sm text-gray-500 italic mb-2">
                    Created by: {event.creatorName?.trim() ? event.creatorName : 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {event.description || 'No description provided.'}
                  </p>
                  {firstSlot && (
                    <p className="text-xs text-gray-500">
                      Starts: {format(new Date(firstSlot), 'PPPp')}
                    </p>
                  )}
                </div>

                <div className="mt-4">
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
