import {
    BriefcaseBusiness,
    Bookmark,
    Send,
    TrendingUp,
  } from "lucide-react";
  
  import { useEffect, useRef, useState } from "react";
  
  import JobFilters from "../../components/jobs/JobFilters";
  import JobList from "../../components/jobs/JobList";
  
  import {
    getJobs,
    getDashboardStats,
  } from "../../services/jobService";
  
  import "./CandidateJobs.css";
  
  export default function CandidateJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const [stats, setStats] = useState({
      available_jobs: 0,
      saved_jobs: 0,
      applications: 0,
      profile_strength: 0,
    });
  
    const resultsRef = useRef(null);
    const firstRender = useRef(true);
  
    const [filters, setFilters] = useState({
      search: "",
      job_type: "",
      experience: "",
    });
  
    useEffect(() => {
      loadData();
    }, []);
  
    // ===========================
    // Load Data
    // ===========================
  
    const loadData = async () => {
      setLoading(true);
  
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (err) {
        console.error("Jobs Error:", err);
      }
  
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);
      } catch (err) {
        console.error("Stats Error:", err);
      }
  
      setLoading(false);
    };
  
    // ===========================
    // Save / Unsave Callback
    // ===========================
  
    const handleSaveToggle = (jobId, isSaved) => {
  
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                is_saved: isSaved,
              }
            : job
        )
      );
  
      setStats((prev) => ({
        ...prev,
        saved_jobs: isSaved
          ? prev.saved_jobs + 1
          : Math.max(0, prev.saved_jobs - 1),
      }));
    };
  
    // ===========================
    // Frontend Filtering
    // ===========================
  
    const filteredJobs = jobs.filter((job) => {
      const search = filters.search.toLowerCase().trim();
  
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.company_name.toLowerCase().includes(search);
  
      const matchesType =
        !filters.job_type ||
        job.job_type === filters.job_type;
  
      const matchesExperience =
        !filters.experience ||
        job.experience === filters.experience;
  
      return (
        matchesSearch &&
        matchesType &&
        matchesExperience
      );
    });
  
    // ===========================
    // Auto Scroll
    // ===========================
  
    useEffect(() => {
  
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
  
      if (
        !filters.search &&
        !filters.job_type &&
        !filters.experience
      ) {
        return;
      }
  
      const timer = setTimeout(() => {
  
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
  
      }, 600);
  
      return () => clearTimeout(timer);
  
    }, [
      filters.search,
      filters.job_type,
      filters.experience,
      filteredJobs.length,
    ]);
  
    if (loading) {
      return <h2>Loading Jobs...</h2>;
    }
  
    return (
      <div className="candidate-jobs-page">
  
        {/* Hero */}
  
        <section className="candidate-jobs-hero">
  
          <div className="candidate-jobs-content">
  
            <span className="candidate-badge">
              Candidate Dashboard
            </span>
  
            <h1>Recommended Jobs For You</h1>
  
            <p>
              Explore opportunities that match your
              skills, interests and career goals.
            </p>
  
            <div className="candidate-search">
  
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    search: e.target.value,
                  })
                }
              />
  
            </div>
  
          </div>
  
        </section>
  
        {/* Stats */}
  
        <section className="candidate-job-stats">
  
          <div className="candidate-stat-card">
  
            <div className="candidate-stat-icon">
              <BriefcaseBusiness size={24} />
            </div>
  
            <div>
              <h3>{stats.available_jobs}</h3>
              <p>Available Jobs</p>
            </div>
  
          </div>
  
          <div className="candidate-stat-card">
  
            <div className="candidate-stat-icon">
              <Bookmark size={24} />
            </div>
  
            <div>
              <h3>{stats.saved_jobs}</h3>
              <p>Saved Jobs</p>
            </div>
  
          </div>
  
          <div className="candidate-stat-card">
  
            <div className="candidate-stat-icon">
              <Send size={24} />
            </div>
  
            <div>
              <h3>{stats.applications}</h3>
              <p>Applications</p>
            </div>
  
          </div>
  
          <div className="candidate-stat-card">
  
            <div className="candidate-stat-icon">
              <TrendingUp size={24} />
            </div>
  
            <div>
              <h3>{stats.profile_strength}%</h3>
              <p>Profile Strength</p>
            </div>
  
          </div>
  
        </section>
  
        {/* Filters */}
  
        <JobFilters
          filters={filters}
          setFilters={setFilters}
        />
  
        {/* Results */}
  
        <section
          className="candidate-results"
          ref={resultsRef}
        >
  
          <h2>Recommended Opportunities</h2>
  
          <p>
            Showing {filteredJobs.length}{" "}
            {filteredJobs.length === 1
              ? "job"
              : "jobs"}
          </p>
  
        </section>
  
        {/* Jobs */}
  
        <JobList
        jobs={filteredJobs}
        onSaveToggle={handleSaveToggle}
        detailsBasePath="/candidate/jobs"
      />
  
      </div>
    );
  }