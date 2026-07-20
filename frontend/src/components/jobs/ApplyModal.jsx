import "./ApplyModal.css";
import toast from "react-hot-toast";
import { useState } from "react";
import { applyJob } from "../../services/applicationService";

export default function ApplyModal({
  jobId,
  onClose,
}) {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.warning("Please select your resume.");
      return;
    }

    const formData = new FormData();

    formData.append("job", jobId);
    formData.append("resume", resume);
    formData.append("cover_letter", coverLetter);

    try {
      setLoading(true);

      await applyJob(formData);

      toast.success("Application submitted successfully!");

      onClose();
    } catch (error) {
      console.error("Full Error:", error);
      console.error("Response:", error.response);
      console.error("Response Data:", error.response?.data);
    
      const data = error.response?.data;
    
      if (data) {
        Object.values(data).flat().forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error("Failed to apply.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="apply-modal"
      onClick={onClose}
    >
      <div
        className="apply-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Apply for this Job</h2>

        <form onSubmit={handleApply}>
          <label htmlFor="resume">
            Resume
          </label>

          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />

          {resume && (
            <small className="selected-file">
              Selected: <strong>{resume.name}</strong>
            </small>
          )}

          <label htmlFor="coverLetter">
            Cover Letter
          </label>

          <textarea
            id="coverLetter"
            rows={6}
            placeholder="Write a short cover letter (optional)..."
            value={coverLetter}
            onChange={(e) =>
              setCoverLetter(e.target.value)
            }
          />

          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Applying..."
                : "Apply Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}