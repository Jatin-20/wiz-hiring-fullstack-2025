import { useParams } from 'react-router-dom';

function EventDetails() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Event Details for ID: {id}</h1>;
}
export default EventDetails;
