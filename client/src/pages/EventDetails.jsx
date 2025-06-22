import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, bookSlot } from '../api';
import { isValidEmail } from '../utils/validation';
import { isValidName } from '../utils/validation';


function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Could not load event');
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  const handleBooking = async (slotTime) => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!isValidName(name)) {
      alert("Please enter a valid name (only letters and spaces).");
      return;
    }  
    
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }    

    try {
      await bookSlot(event.id, slotTime, name, email);
      alert("Booking successful!");
      window.location.reload();
    } catch (err) {
      alert("Failed to book slot.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">{event.title}</h2>
      <p className="text-sm text-gray-500 mb-4">Created by: {event.creatorName?.trim() ? event.creatorName : 'Unknown'}</p>
      <p className="mb-2 text-gray-700">{event.description}</p>

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

      <div className="mt-6 space-y-3">
        {event.slots.map((slot, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded"
          >
            <span>{new Date(slot.time).toLocaleString()}</span>
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
