import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { deleteResume } from "../../services/resumeService";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

export default function ResumeCard({
  resume,
  onDelete,
}) {
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteResume(resume.id);

      toast.success("Resume deleted successfully.");

      setOpenDeleteModal(false);

      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = () => {
    navigate(`/ai-resume/${resume.id}`);
  };

  return (
    <>
      <div className="resume-card">
        <h2>{resume.title}</h2>

        <p>
          <strong>Name:</strong> {resume.full_name}
        </p>

        <p>
          <strong>Email:</strong> {resume.email}
        </p>

        <p>
          <strong>Location:</strong> {resume.location}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(resume.created_at).toLocaleDateString()}
        </p>

        <div className="resume-actions">
          <button
            className="resume-btn"
            onClick={handleAnalyze}
          >
            Analyze Resume
          </button>

          <button
            className="delete-btn"
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        open={openDeleteModal}
        title="Delete Resume"
        message={`Are you sure you want to delete "${resume.title}"? This action cannot be undone.`}
        loading={loading}
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}