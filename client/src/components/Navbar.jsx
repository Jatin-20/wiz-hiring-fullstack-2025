import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700 tracking-tight">
          BOOKRINO
        </Link>
        <div className="space-x-4 text-sm font-medium text-gray-700">
          <NavLink to="/" label="Home" active={isActive('/')} />
          <NavLink to="/create" label="Create Event" active={isActive('/create')} />
          <NavLink to="/my-bookings" label="My Bookings" active={isActive('/my-bookings')} />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded transition-all ${
        active
          ? 'bg-blue-100 text-blue-700 font-semibold border-b-2 border-blue-600'
          : 'hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  );
}

export default Navbar;
