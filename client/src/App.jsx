import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent'; 
import MyBookings from "./pages/MyBookings";
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
      </Router>
  );
}



export default App;
