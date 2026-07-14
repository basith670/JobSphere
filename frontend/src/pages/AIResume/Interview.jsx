import { useState } from "react";
import { generateInterviewQuestions } from "../../services/interviewService";
import ResumeSelector from "../../components/resume/ResumeSelector";

import { toast } from "react-toastify";

export default function Interview() {
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!resumeId) {
        toast.warning("Please enter Resume ID.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateInterviewQuestions({
        resume_id: resumeId,
        job_description: jobDescription,
      });

      setQuestions(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title, items) => (
    <div className="resume-card" style={{ marginTop: "20px" }}>
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <ul>
          {items.map((question, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {question}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="resume-page">
      <div className="resume-header">
        <h1 className="resume-title">
          AI Interview Question Generator
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
          placeholder="Paste Job Description (Optional)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          className="resume-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Questions"}
        </button>
      </div>

      {questions && (
        <>
          {renderSection(
            "Technical Questions",
            questions.technical_questions
          )}

          {renderSection(
            "Coding Questions",
            questions.coding_questions
          )}

          {renderSection(
            "Behavioral Questions",
            questions.behavioral_questions
          )}

          {renderSection(
            "HR Questions",
            questions.hr_questions
          )}
        </>
      )}
    </div>
  );
}