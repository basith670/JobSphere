import { useState } from "react";

import { generateCoverLetter } from "../../services/coverLetterService";
import ResumeSelector from "../../components/resume/ResumeSelector";

import { toast } from "react-toastify";

export default function CoverLetter() {
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!resumeId || !jobDescription.trim()) {
        toast.warning("Please enter Resume ID and Job Description.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateCoverLetter({
        resume_id: resumeId,
        job_description: jobDescription,
      });

      setCoverLetter(data.cover_letter);
    } catch (err) {
      console.error(err);
      toast.error("Unable to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.success("Copied to clipboard.");
  };

  return (
    <div className="resume-page">

      <div className="resume-header">
        <h1 className="resume-title">
          AI Cover Letter Generator
        </h1>
      </div>

      <div className="resume-card">

      <ResumeSelector
            value={resumeId}
            onChange={setResumeId}
            />

        <textarea
          className="resume-textarea"
          rows={8}
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          className="resume-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>

      </div>

      {coverLetter && (
        <div
          className="resume-card"
          style={{ marginTop: "30px" }}
        >
          <h2>Generated Cover Letter</h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              lineHeight: "1.8",
            }}
          >
            {coverLetter}
          </pre>

          <button
            className="resume-btn"
            style={{ marginTop: "20px" }}
            onClick={handleCopy}
          >
            Copy Cover Letter
          </button>
        </div>
      )}

    </div>
  );
}