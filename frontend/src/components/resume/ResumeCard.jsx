import { deleteResume } from "../../services/resumeService";

export default function ResumeCard({
  resume,
  onDelete,
}) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResume(resume.id);

      alert("Resume deleted successfully.");

      onDelete();
    } catch (error) {
      console.error(error);
      alert("Unable to delete resume.");
    }
  };

  return (
    <div className="resume-item">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h3>{resume.title}</h3>

        {resume.is_default && (
          <span
            style={{
              background: "#DCFCE7",
              color: "#15803D",
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Default
          </span>
        )}
      </div>

      <div className="resume-meta">

        <p>
          <strong>Name:</strong>{" "}
          {resume.full_name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {resume.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {resume.phone}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {resume.location}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(
            resume.created_at
          ).toLocaleDateString()}
        </p>

      </div>

      <div className="resume-buttons">

        {resume.resume_file && (
          <a
            href={resume.resume_file}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            View PDF
          </a>
        )}

        <button
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}