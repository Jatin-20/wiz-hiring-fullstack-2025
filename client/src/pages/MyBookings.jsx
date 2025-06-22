// Importing hooks and helper functions
import { useState } from 'react';
import { getBookingsByEmail } from '../api'; // API function to fetch bookings
import { isValidEmail } from '../utils/validation'; // Utility to validate email format

// Component to allow users to check their bookings using their email
function MyBookings() {
  // State to store email entered by the user
  const [email, setEmail] = useState('');

  // State to store the fetched bookings
  const [bookings, setBookings] = useState([]);

  // State to show loading state while fetching
  const [loading, setLoading] = useState(false);

  // Function that runs when user clicks on "Fetch" button
  const handleFetch = async () => {
    // If input is empty, show an alert
    if (!email) return alert("Enter an email to search.");

    // If email is not in valid format, show an alert
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Show loading indicator while data is being fetched

    try {
      // Make an API call to get bookings using email
      const data = await getBookingsByEmail(email);
      setBookings(data); // Store the bookings in state
    } catch (err) {
      alert("Failed to fetch bookings"); // Show error message
      console.error(err); // Print error in console for debugging
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Page heading */}
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {/* Email input and fetch button */}
      <div className="mb-4 flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on typing
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleFetch} // When clicked, fetch bookings
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {/* Show loading message while bookings are being fetched */}
      {loading && <p>Loading...</p>}

      {/* Show bookings if found */}
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
        // If no bookings and not loading, show this
        !loading && <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}

export default MyBookings;
