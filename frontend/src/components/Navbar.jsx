import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiGrid } from 'react-icons/fi';
import { useState } from 'react';
import { useAuthStore } from '../hooks/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <span>💼</span>
            <span>JobAlert</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/jobs" className="hover:text-blue-600 transition">Jobs</Link>
            {isAuthenticated && (
              <Link to="/admin/dashboard" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <FiGrid size={20} />
                <span>Dashboard</span>
              </Link>
            )}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 rounded transition"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 rounded transition"
            >
              Jobs
            </Link>
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 rounded transition text-blue-600"
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
