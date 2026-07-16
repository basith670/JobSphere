import { useEffect, useState } from "react";

import { getResumes } from "../../services/resumeService";

export default function ResumeSelector({
  value,
  onChange,
}) {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await getResumes();

      setResumes(data.results || data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="resume-group">

      <label>Select Resume</label>

      <select
        className="resume-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          Choose your resume
        </option>

        {resumes.map((resume) => (
          <option
            key={resume.id}
            value={resume.id}
          >
            {resume.title}
          </option>
        ))}
      </select>

    </div>
  );
}