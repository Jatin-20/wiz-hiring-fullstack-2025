import { useState } from 'react';
import { getBookingsByEmail } from '../api';
import { isValidEmail } from '../utils/validation';

function MyBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!email) return alert("Enter an email to search.");
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const data = await getBookingsByEmail(email);
      setBookings(data);
    } catch (err) {
      alert("Failed to fetch bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((b, i) => (
            <li key={i} className="border p-4 rounded shadow-sm">
              <p><strong>Event:</strong> {b.eventTitle}</p>
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Slot:</strong> {new Date(b.slot).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}

export default MyBookings;
