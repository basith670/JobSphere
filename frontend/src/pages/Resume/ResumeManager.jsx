import { useEffect, useState } from "react";

import ResumeUpload from "../../components/resume/ResumeUpload";
import ResumeList from "../../components/resume/ResumeList";

import { getResumes } from "../../services/resumeService";

import "../../components/resume/Resume.css";

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingResume, setEditingResume] = useState(null);

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

  const handleEdit = (resume) => {
    setEditingResume(resume);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdated = async () => {
    setEditingResume(null);
    await loadResumes();
  };

  return (
    <div className="resume-page">
      <div className="resume-header">
        <h1 className="resume-title">Resume Manager</h1>

        <p className="resume-subtitle">
          Upload, update and manage your resumes for job applications.
        </p>
      </div>

      <ResumeUpload
        editingResume={editingResume}
        onResumeAdded={loadResumes}
        onResumeUpdated={handleUpdated}
      />

      <div className="resume-section-space" />

      {loading ? (
        <div className="empty-state">
          <h3>Loading resumes...</h3>
        </div>
      ) : (
        <ResumeList
          resumes={resumes}
          onDelete={loadResumes}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}