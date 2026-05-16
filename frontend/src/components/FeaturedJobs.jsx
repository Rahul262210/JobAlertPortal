import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { jobService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getFeaturedJobs();
        setJobs(data.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="py-8"><LoadingSpinner /></div>;
  }

  if (jobs.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
            <p className="text-gray-600">Top positions we think you'll love</p>
          </div>
          <Link to="/jobs" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold">
            <span>View All</span>
            <FiArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
