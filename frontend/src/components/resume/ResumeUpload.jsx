import { useState } from "react";

import { createResume } from "../../services/resumeService";

export default function ResumeUpload({ onResumeAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    full_name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    certifications: "",
    linkedin: "",
    github: "",
    portfolio: "",
    resume_file: null,
    is_default: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await createResume(data);

      alert("Resume uploaded successfully.");

      if (onResumeAdded) {
        await onResumeAdded();
      }

      setFormData({
        title: "",
        full_name: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        skills: "",
        experience: "",
        education: "",
        projects: "",
        certifications: "",
        linkedin: "",
        github: "",
        portfolio: "",
        resume_file: null,
        is_default: false,
      });
    } catch (err) {
      console.error(err);
      alert("Unable to upload resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-card">
      <h2>Upload Resume</h2>

      <form
        className="resume-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Resume Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <textarea
          className="full"
          name="summary"
          placeholder="Professional Summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />

        <textarea
          className="full"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <textarea
          className="full"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <textarea
          className="full"
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
          required
        />

        <textarea
          className="full"
          name="projects"
          placeholder="Projects (Optional)"
          value={formData.projects}
          onChange={handleChange}
        />

        <textarea
          className="full"
          name="certifications"
          placeholder="Certifications (Optional)"
          value={formData.certifications}
          onChange={handleChange}
        />

        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
        />

        <input
          type="url"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
        />

        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio URL"
          value={formData.portfolio}
          onChange={handleChange}
        />

        <div className="resume-upload full">
          <input
            type="file"
            name="resume_file"
            accept=".pdf"
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
            />{" "}
            Set as Default Resume
          </label>
        </div>

        <div className="resume-actions full">
          <button
            type="submit"
            className="resume-btn"
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Upload Resume"}
          </button>
        </div>
      </form>
    </div>
  );
}