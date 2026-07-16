import { useState } from "react";

import { toast } from "react-toastify";

import CoverLetterHero from "../../components/coverletter/CoverLetterHero";
import ResumeSelector from "../../components/resume/ResumeSelector";

import { generateCoverLetter } from "../../services/coverLetterService";

import "../../components/airesume/AIResume.css";

export default function CoverLetter() {

  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Professional");

  const handleGenerate = async () => {

    if (!resumeId || !jobDescription.trim()) {

      toast.warning(
        "Please select a resume and enter a job description."
      );

      return;

    }

    try {

      setLoading(true);

      const data = await generateCoverLetter({
        resume_id: resumeId,
        job_description: jobDescription,
        tone,
      });

      setCoverLetter(data.cover_letter);

      toast.success("Cover Letter Generated.");

    } catch (err) {

      console.error(err);

      toast.error("Unable to generate cover letter.");

    } finally {

      setLoading(false);

    }

  };

  const handleCopy = async () => {

    await navigator.clipboard.writeText(coverLetter);

    toast.success("Copied to clipboard.");

  };

  return (

    <div className="resume-page">

      {/* ================= HERO ================= */}

      <CoverLetterHero />

      {/* ================= WORKSPACE ================= */}

      <div className="match-workspace">

        {/* LEFT PANEL */}

        <div className="workspace-card">

          <h2>Select Resume</h2>

          <ResumeSelector
            value={resumeId}
            onChange={setResumeId}
          />

          <h2
            style={{
              marginTop: "30px",
            }}
          >
            Writing Tone
          </h2>

          <select
            className="resume-input"
            value={tone}
            onChange={(e) =>
              setTone(e.target.value)
            }
          >

            <option>
              Professional
            </option>

            <option>
              Formal
            </option>

            <option>
              Friendly
            </option>

          </select>

        </div>

        {/* RIGHT PANEL */}

        <div className="workspace-card">

          <div className="workspace-header">

            <h2>
              Job Description
            </h2>

            <span>
              {jobDescription.length} Characters
            </span>

          </div>

          <textarea
            rows="12"
            className="resume-textarea"
            placeholder="Paste the complete job description here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
          />

          <button
            className="analyze-btn"
            onClick={handleGenerate}
            disabled={loading}
          >

            {loading
              ? "Generating..."
              : "Generate Cover Letter"}

          </button>

        </div>

      </div>

      {/* ================= OUTPUT ================= */}

      {coverLetter ? (

        <div className="resume-card">

          <div className="workspace-header">

            <h2>
              AI Generated Cover Letter
            </h2>

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >

              <button
                className="resume-btn"
                onClick={handleCopy}
              >
                Copy
              </button>

              <button
                className="resume-btn"
                onClick={() => window.print()}
              >
                Print
              </button>

            </div>

          </div>

          <div className="cover-letter-preview">

            <pre>
              {coverLetter}
            </pre>

          </div>

        </div>

      ) : (

        <div className="resume-card">

          <h2>
            Ready to Generate
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.8",
              marginTop: "15px",
            }}
          >
            Select your resume, paste the job description,
            choose your preferred writing tone and click
            <strong> Generate Cover Letter </strong>
            to create a personalized, recruiter-ready
            cover letter using AI.
          </p>

        </div>

      )}

    </div>

  );

}