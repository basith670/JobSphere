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
        console.error(error);
      
        const data = error.response?.data;
      
        if (data?.errors?.non_field_errors?.length) {
          toast.error(data.errors.non_field_errors[0]);
        } else if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error("Failed to apply.");
        }
      }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-modal">

      <div className="apply-modal-content">

        <h2>Apply for this Job</h2>

        <form onSubmit={handleApply}>

          <label>Resume</label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />

          <label>Cover Letter</label>

          <textarea
            rows="6"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
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
              {loading ? "Applying..." : "Apply"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}