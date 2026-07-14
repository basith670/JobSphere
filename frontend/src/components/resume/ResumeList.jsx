import ResumeCard from "./ResumeCard";

export default function ResumeList({
  resumes,
  onDelete,
}) {
  if (!resumes.length) {
    return (
      <div className="resume-card">
        <h3>No resumes uploaded yet.</h3>
        <p>
          Upload your first resume to start applying for jobs.
        </p>
      </div>
    );
  }

  return (
    <div className="resume-grid">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}