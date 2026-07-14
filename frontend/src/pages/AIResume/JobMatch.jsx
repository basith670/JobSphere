import { useState } from "react";

import { matchResume } from "../../services/jobMatchService";

import ATSCard from "../../components/airesume/ATSCard";
import SkillsCard from "../../components/airesume/SkillsCard";
import SuggestionsCard from "../../components/airesume/SuggestionsCard";
import ResumeSelector from "../../components/resume/ResumeSelector";

import { toast } from "react-toastify";

export default function JobMatch() {

  const [resumeId, setResumeId] = useState("1");
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {

    if (!jobDescription.trim()) {
        toast.warning("Enter a Job Description.");
      return;
    }

    try {

      setLoading(true);

      const data = await matchResume(
        resumeId,
        jobDescription
      );

      setResult(data);

    } catch (err) {

      console.error(err);

      toast.error("Unable to match resume.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="resume-page">

      <div className="resume-header">
        <h1 className="resume-title">
          AI Job Match
        </h1>
      </div>

      <div className="resume-card">

      <ResumeSelector
            value={resumeId}
            onChange={setResumeId}
            />

        <br />
        <br />

        <textarea
          rows="10"
          className="resume-textarea"
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
        />

        <br />
        <br />

        <button
          className="resume-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze Match"}
        </button>

      </div>

      {result && (

        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >

            <ATSCard
              score={result.match_score}
            />

            <SkillsCard
              title="Matched Skills"
              skills={result.matched_skills}
              success={true}
            />

            <SkillsCard
              title="Missing Skills"
              skills={result.missing_keywords}
              success={false}
            />

          </div>

          <div style={{ marginTop: "20px" }}>
            <SuggestionsCard
              suggestions={result.suggestions}
            />
          </div>
        </>

      )}

    </div>
  );
}