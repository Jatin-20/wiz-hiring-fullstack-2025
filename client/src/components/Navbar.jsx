import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? 'bg-blue-200 font-semibold' : ''
    }`;

  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BOOKRINO
        </Link>
        <div className="space-x-3 text-sm">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/create" className={linkClass('/create')}>Create Event</Link>
          <Link to="/my-bookings" className={linkClass('/my-bookings')}>My Bookings</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
