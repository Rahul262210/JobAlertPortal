import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white opacity-80">404</h1>
        <h2 className="text-4xl font-bold text-white mt-4">Page Not Found</h2>
        <p className="text-xl text-blue-100 mt-4">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 mt-8 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          <FiHome size={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
