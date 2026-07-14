import { useNavigate } from "react-router-dom";
import { deleteResume } from "../../services/resumeService";
import { toast } from "react-toastify";

export default function ResumeCard({
  resume,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Delete this resume?")) {
      return;
    }

    try {
      await deleteResume(resume.id);

      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete resume.");
    }
  };

  const handleAnalyze = () => {
    navigate(`/ai-resume/${resume.id}`);
  };

  return (
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
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}