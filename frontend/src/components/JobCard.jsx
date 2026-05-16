import { Link } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiBriefcase, FiStar, FiExternalLink } from 'react-icons/fi';

export default function JobCard({ job, featured = false }) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="card-hover group">
        {/* Header with Logo */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            {job.company_logo && (
              <img
                src={job.company_logo}
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm">{job.company}</p>
            </div>
          </div>
          {featured && (
            <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              <FiStar size={16} />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-gray-700">
            <FiMapPin size={16} className="text-blue-600" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FiDollarSign size={16} className="text-green-600" />
            <span className="text-sm font-semibold">{job.salary}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FiBriefcase size={16} className="text-purple-600" />
            <span className="text-sm">{job.experience}</span>
          </div>
          <div className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded w-fit">
            {job.category}
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{new Date(job.created_at).toLocaleDateString()}</span>
          <div className="flex items-center space-x-1 text-blue-600 group-hover:text-blue-700 font-semibold">
            <span>View Details</span>
            <FiExternalLink size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
