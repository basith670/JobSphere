import { useEffect, useState } from "react";
import { getCompanies } from "../../services/companyService";

export default function RecruiterJobForm({
  initialData = {},
  onSubmit,
  loading = false,
}) {

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    job_type: "Full Time",
    experience: "0-1 Years",
    salary_min: "",
    salary_max: "",
    skills_required: "",
    vacancies: 1,
    deadline: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    is_featured: false,
    is_active: true,
  });

  /* ===========================
     Load Companies
  =========================== */

  useEffect(() => {

    const fetchCompanies = async () => {

      try {

        const data = await getCompanies();

        setCompanies(data);

      }

      catch (error) {

        console.error(error);

      }

    };

    fetchCompanies();

  }, []);

  /* ===========================
     Populate Form (Edit Mode)
  =========================== */

  useEffect(() => {

    setFormData({

      company:
        initialData?.company?.id ??
        initialData?.company ??
        "",

      title: initialData?.title || "",

      location: initialData?.location || "",

      job_type: initialData?.job_type || "Full Time",

      experience: initialData?.experience || "0-1 Years",

      salary_min: initialData?.salary_min || "",

      salary_max: initialData?.salary_max || "",

      skills_required: initialData?.skills_required || "",

      vacancies: initialData?.vacancies || 1,

      deadline: initialData?.deadline
        ? initialData.deadline.slice(0, 10)
        : "",

      description: initialData?.description || "",

      responsibilities:
        initialData?.responsibilities || "",

      requirements:
        initialData?.requirements || "",

      benefits:
        initialData?.benefits || "",

      is_featured:
        initialData?.is_featured || false,

      is_active:
        initialData?.is_active ?? true,

    });

  }, [initialData]);

  /* ===========================
     Handle Change
  =========================== */

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  /* ===========================
     Submit
  =========================== */

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (

    <form
      className="job-form"
      onSubmit={handleSubmit}
    >

      <div className="job-grid">

        {/* Company */}

        <div className="form-group">

          <label>Company *</label>

          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          >

            <option value="">

              Select Company

            </option>

            {companies.map((company) => (

              <option
                key={company.id}
                value={company.id}
              >

                {company.company_name}

              </option>

            ))}

          </select>

        </div>

        {/* Job Title */}

        <div className="form-group">

          <label>Job Title *</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

        </div>

        {/* Location */}

        <div className="form-group">

          <label>Location *</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

        </div>

        {/* Job Type */}

        <div className="form-group">

          <label>Employment Type</label>

          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
          >

            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Contract</option>
            <option>Remote</option>

          </select>

        </div>

        {/* Experience */}

        <div className="form-group">

          <label>Experience</label>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >

            <option>0-1 Years</option>
            <option>1-2 Years</option>
            <option>3-5 Years</option>
            <option>5+ Years</option>

          </select>

        </div>

        {/* Minimum Salary */}

        <div className="form-group">

          <label>Minimum Salary</label>

          <input
            type="number"
            name="salary_min"
            value={formData.salary_min}
            onChange={handleChange}
          />

        </div>

        {/* Maximum Salary */}

        <div className="form-group">

          <label>Maximum Salary</label>

          <input
            type="number"
            name="salary_max"
            value={formData.salary_max}
            onChange={handleChange}
          />

        </div>

        {/* Vacancies */}

        <div className="form-group">

          <label>Vacancies</label>

          <input
            type="number"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleChange}
          />

        </div>

        {/* Skills */}

        <div className="form-group full-width">

          <label>Skills Required</label>

          <input
            type="text"
            name="skills_required"
            value={formData.skills_required}
            onChange={handleChange}
            placeholder="React, Django, PostgreSQL..."
          />

        </div>

        {/* Deadline */}

        <div className="form-group">

          <label>Application Deadline</label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

        </div>

        {/* Featured */}

        <div className="form-group">

          <label>

            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
            />

            Featured Job

          </label>

        </div>

      </div>

      <div className="form-group">

        <label>Description</label>

        <textarea
          rows="6"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Responsibilities</label>

        <textarea
          rows="5"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Requirements</label>

        <textarea
          rows="5"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Benefits</label>

        <textarea
          rows="5"
          name="benefits"
          value={formData.benefits}
          onChange={handleChange}
        />

      </div>

      <button
        className="create-job-btn"
        type="submit"
        disabled={loading}
      >

        {loading
          ? "Saving..."
          : initialData?.id
          ? "Update Job"
          : "Publish Job"}

      </button>

    </form>

  );

}