import { useState, useEffect } from 'react';
import { jobService } from '../services/api';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    experience: '',
    featured: false,
  });

  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchTerm, filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        category: filters.category,
        location: filters.location,
        experience: filters.experience,
        featured: filters.featured,
        page: currentPage,
        limit: 12,
      };

      const response = await jobService.getAllJobs(params);
      setJobs(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchInput(value);
  };

  const submitSearch = () => {
    const nextSearchTerm = searchInput.trim();

    if (nextSearchTerm.length === 1) {
      return;
    }

    setSearchTerm(nextSearchTerm);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
          <p className="text-gray-600 text-lg">Find and apply for jobs that match your skills and interests.</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={searchInput}
            onChange={handleSearch}
            onSearch={submitSearch}
            onClear={clearSearch}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            {jobs.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{jobs.length}</span> jobs
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyState
                title="No jobs found"
                message="Try adjusting your search terms or filters to find more opportunities."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
