import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isFutureDateTime } from '../utils/validation'; // Custom validation function to check if date is in future

function CreateEvent() {
  // Defining state variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxBookings, setMaxBookings] = useState(1);
  const [slots, setSlots] = useState([]); // Array to store all time slots
  const [creatorName, setCreatorName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Used to redirect user after successful event creation

  // Function to update individual time slot
  const handleSlotChange = (value, index) => {
    const updated = [...slots];
    updated[index] = value;
    setSlots(updated);
  };

  // Function to add a new slot input field
  const addSlotField = () => {
    setSlots([...slots, '']);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh

    // Check if all slot fields are filled
    if (slots.some(s => !s)) {
      alert("Please fill all time slots.");
      return;
    }

    // Check if all slots are future dates
    if (slots.some(s => !isFutureDateTime(s))) {
      alert("All time slots must be in the future.");
      return;
    }

    // Convert slot times to ISO format (UTC)
    const formattedSlots = slots.map(s => new Date(s).toISOString());

    try {
      // Sending form data to backend using fetch POST request
      const res = await fetch(import.meta.env.VITE_API_URL + '/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          maxBookingsPerSlot: Number(maxBookings),
          slots: formattedSlots,
          creatorName,
        }),
      });

      // If response not okay, throw error
      if (!res.ok) throw new Error('Failed to create event');

      const data = await res.json();

      // Show success message and reset form
      setSuccessMessage(`🎉 Event "${title}" created successfully! ID: ${data.eventId}`);
      setTitle('');
      setDescription('');
      setMaxBookings(1);
      setSlots([]);

      // Redirect to home page after short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error("Event creation failed:", err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

      {/* Success message after event creation */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded mb-4 border border-green-300">
          {successMessage}
        </div>
      )}

      {/* Event creation form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Creator Name */}
        <input
          type="text"
          placeholder="Creator Name"
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Event Title */}
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Event Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        ></textarea>

        {/* Max Bookings */}
        <input
          type="number"
          placeholder="Max bookings per slot"
          value={maxBookings}
          onChange={(e) => setMaxBookings(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          min="1"
          required
        />

        {/* Time slots input section */}
        <div className="space-y-2">
          <label className="block font-medium">Time Slots</label>
          {slots.map((slot, idx) => (
            <input
              key={idx}
              type="datetime-local"
              value={slot}
              onChange={(e) => handleSlotChange(e.target.value, idx)}
              className="w-full border px-3 py-2 rounded"
              min={new Date().toISOString().slice(0, 16)} // Prevent past slots
              required
            />
          ))}

          {/* Button to add more slot inputs */}
          <button type="button" onClick={addSlotField} className="text-blue-600 hover:underline text-sm">
            + Add Another Slot
          </button>
        </div>

        {/* Submit button */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
