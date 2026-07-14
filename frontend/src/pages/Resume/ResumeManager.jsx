import { useEffect, useState } from "react";

import ResumeUpload from "../../components/resume/ResumeUpload";
import ResumeList from "../../components/resume/ResumeList";

import { getResumes } from "../../services/resumeService";

import "../../components/resume/Resume.css";

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await getResumes();

      setResumes(data);
    } catch (error) {
      console.error("Unable to load resumes:", error);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">

      <div className="resume-header">
        <h1 className="resume-title">
          Resume Manager
        </h1>
      </div>

      <ResumeUpload
        onResumeAdded={loadResumes}
      />

      <div style={{ height: "30px" }} />

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ResumeList
          resumes={resumes}
          onDelete={loadResumes}
        />
      )}

    </div>
  );
}