import { FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function EmptyState({ title = "No jobs found", message = "Try adjusting your filters or search terms" }) {
  return (
    <div className="min-h-64 flex flex-col items-center justify-center">
      <FiAlertCircle size={48} className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>
      <Link to="/jobs" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Browse All Jobs
      </Link>
    </div>
  );
}
