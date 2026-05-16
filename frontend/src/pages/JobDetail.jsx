import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jobService } from '../services/api';
import { FiArrowLeft, FiMapPin, FiDollarSign, FiBriefcase, FiCalendar, FiExternalLink } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobService.getJobById(id);
        setJob(data.data);
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState title="Job not found" message="This job posting may have been removed or is no longer available." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
        >
          <FiArrowLeft size={20} />
          <span>Back to Jobs</span>
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-2xl text-gray-600">{job.company}</p>
                </div>
                {job.company_logo && (
                  <img
                    src={job.company_logo}
                    alt={job.company}
                    className="w-24 h-24 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                    <FiMapPin size={18} className="text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Salary</p>
                  <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                    <FiDollarSign size={18} className="text-green-600" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                    <FiBriefcase size={18} className="text-purple-600" />
                    <span>{job.experience}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Posted</p>
                  <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                    <FiCalendar size={18} className="text-orange-600" />
                    <span>{new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Category & Featured Badge */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {job.category}
                </span>
                {job.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Apply Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Apply?</h3>

              {job.apply_link ? (
                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold mb-4"
                >
                  <span>Apply Now</span>
                  <FiExternalLink size={18} />
                </a>
              ) : (
                <button disabled className="w-full px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold mb-4 cursor-not-allowed">
                  No Apply Link
                </button>
              )}

              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Details</h4>
                  <ul className="space-y-2">
                    <li>✓ {job.experience} level position</li>
                    <li>✓ Based in {job.location}</li>
                    <li>✓ {job.category} role</li>
                    <li>✓ Salary: {job.salary}</li>
                  </ul>
                </div>
              </div>

              <hr className="my-6" />

              <div className="text-xs text-gray-500">
                <p>Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                <p>Job ID: {job.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
