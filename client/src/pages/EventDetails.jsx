// Importing necessary React hooks and functions
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, bookSlot } from '../api'; // API functions
import { isValidEmail } from '../utils/validation'; // Validation for email
import { isValidName } from '../utils/validation'; // Validation for name

function EventDetails() {
  // Getting the event ID from the URL
  const { id } = useParams();

  // State variables to manage event, loading, error, and form inputs
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // useEffect to load event details when the component mounts
  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventById(id); // API call to get event by ID
        setEvent(data); // Store event details in state
      } catch (err) {
        setError('Could not load event'); // If error occurs, set error message
      } finally {
        setLoading(false); // Set loading to false in both cases
      }
    }

    loadEvent();
  }, [id]);

  // Function to handle slot booking
  const handleBooking = async (slotTime) => {
    // Check if name is empty
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    // Check if name is valid (letters and spaces)
    if (!isValidName(name)) {
      alert("Please enter a valid name (only letters and spaces).");
      return;
    }

    // Check if email is empty
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // Check if email format is valid
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // API call to book the slot
      await bookSlot(event.id, slotTime, name, email);
      alert("Booking successful!");
      window.location.reload(); // Reload the page to update UI
    } catch (err) {
      alert("Failed to book slot."); // Handle booking error
    }
  };

  // Show loading message while event is being fetched
  if (loading) return <p className="text-center">Loading...</p>;

  // Show error message if event fetch failed
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // If event is null, return nothing
  if (!event) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Display event title and description */}
      <h2 className="text-2xl font-bold mb-1">{event.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Created by: {event.creatorName?.trim() ? event.creatorName : 'Unknown'}
      </p>
      <p className="mb-2 text-gray-700">{event.description}</p>

      {/* Form to enter name and email for booking */}
      <div className="mt-4 space-y-4">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Show available slots */}
      <div className="mt-6 space-y-3">
        {event.slots.map((slot, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded"
          >
            {/* Display slot time */}
            <span>{new Date(slot.time).toLocaleString()}</span>

            {/* If slot is full, show full message else show Book button */}
            {slot.full ? (
              <span className="text-red-500 font-semibold">Full</span>
            ) : (
              <button
                onClick={() => handleBooking(slot.time)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventDetails;
