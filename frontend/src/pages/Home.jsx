import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch, FiBriefcase, FiUsers, FiTrendingUp } from 'react-icons/fi';
import FeaturedJobs from '../components/FeaturedJobs';
import LatestJobs from '../components/LatestJobs';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Find Your Dream Job
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Search and apply for thousands of job openings from top companies. Get hired faster with JobAlert Portal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/jobs"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center justify-center space-x-2"
                >
                  <span>Explore Jobs</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
            <div className="hidden md:block text-6xl text-center">
              👔📊💼
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FiBriefcase size={40} className="text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Active Job Listings</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FiUsers size={40} className="text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5000+</h3>
              <p className="text-gray-600">Job Seekers</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FiTrendingUp size={40} className="text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Companies Hiring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <FeaturedJobs />

      {/* Latest Jobs */}
      <LatestJobs />

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse thousands of job openings and find your next opportunity today.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            <FiSearch />
            <span>Start Searching</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
