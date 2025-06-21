import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxBookings, setMaxBookings] = useState(1);
  const [slots, setSlots] = useState(['']);
  const navigate = useNavigate();

  const handleSlotChange = (value, index) => {
    const updated = [...slots];
    updated[index] = value;
    setSlots(updated);
  };

  const addSlotField = () => {
    setSlots([...slots, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedSlots = slots.map(s => new Date(s).toISOString());

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          maxBookingsPerSlot: Number(maxBookings),
          slots: formattedSlots,
        }),
      });

      if (!res.ok) throw new Error('Failed to create event');
      alert('Event created!');
      navigate('/');
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        ></textarea>
        <input
          type="number"
          placeholder="Max bookings per slot"
          value={maxBookings}
          onChange={(e) => setMaxBookings(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          min="1"
          required
        />

        <div className="space-y-2">
          <label className="block font-medium">Time Slots</label>
          {slots.map((slot, idx) => (
            <input
              key={idx}
              type="datetime-local"
              value={slot}
              onChange={(e) => handleSlotChange(e.target.value, idx)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          ))}
          <button type="button" onClick={addSlotField} className="text-blue-600 hover:underline text-sm">
            + Add Another Slot
          </button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
