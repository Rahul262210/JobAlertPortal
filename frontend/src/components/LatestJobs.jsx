import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { jobService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';

export default function LatestJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getLatestJobs(6);
        setJobs(data.data);
      } catch (error) {
        console.error('Failed to fetch latest jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="py-8"><LoadingSpinner /></div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Jobs</h2>
            <p className="text-gray-600">Recently posted positions</p>
          </div>
          <Link to="/jobs" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold">
            <span>View All</span>
            <FiArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
