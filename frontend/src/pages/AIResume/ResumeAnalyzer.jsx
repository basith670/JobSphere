import { useState } from "react";
import toast from "react-hot-toast";

import ResumeSelector from "../../components/resume/ResumeSelector";

import {
  analyzeResume,
  getAnalysisHistory,
} from "../../services/aiResumeService";

import ResumeHero from "../../components/airesume/ResumeHero";
import AnalysisSummary from "../../components/airesume/AnalysisSummary";
import ATSCard from "../../components/airesume/ATSCard";
import SkillsCard from "../../components/airesume/SkillsCard";
import SuggestionsCard from "../../components/airesume/SuggestionsCard";
import SectionAnalysis from "../../components/airesume/SectionAnalysis";
import KeywordAnalysis from "../../components/airesume/KeywordAnalysis";
import ResumeInsights from "../../components/airesume/ResumeInsights";
import NextActions from "../../components/airesume/NextActions";
import HistoryCard from "../../components/airesume/HistoryCard";

import "../../components/airesume/AIResume.css";

export default function ResumeAnalyzer() {

  const [resumeId, setResumeId] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {

    if (!resumeId) {
      toast.warning("Please select a resume.");
      return;
    }

    try {

      setLoading(true);

      const analysisData = await analyzeResume(resumeId);

      const historyData = await getAnalysisHistory();

      setAnalysis(analysisData);

      setHistory(historyData.results || historyData);

    } catch (err) {

      console.error(err);

      toast.error("Unable to analyze resume.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="resume-page">

      {analysis ? (

        <ResumeHero
          analysis={analysis}
        />

      ) : (

        <div className="resume-hero">

          <div className="resume-hero-left">

            <div className="hero-ai">
              🤖 AI Resume Analyzer
            </div>

            <h1>
              Analyze Your Resume with AI
            </h1>

            <p>
              Select one of your uploaded resumes to receive an instant ATS
              score, keyword analysis, missing skills, AI suggestions,
              section-by-section evaluation, and actionable recommendations
              to maximize your chances of getting shortlisted.
            </p>

          </div>

        </div>

      )}

      {/* ================= ANALYZER ================= */}

      <div className="resume-card">

        <h2>Select Resume</h2>

        <div style={{ marginTop: "20px" }}>

          <ResumeSelector
            value={resumeId}
            onChange={setResumeId}
          />

        </div>

        <button
          className="resume-btn"
          style={{ marginTop: "25px" }}
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

      </div>

      {/* ================= RESULTS ================= */}

      {analysis && (

        <>

          <div style={{ marginTop: "30px" }}>

            <AnalysisSummary
              atsScore={analysis.ats_score}
              skillsFound={analysis.skills_found.length}
              missingSkills={analysis.missing_skills.length}
              suggestions={analysis.suggestions.length}
            />

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >

            <ATSCard
              score={analysis.ats_score}
            />

            <SkillsCard
              title="Skills Found"
              skills={analysis.skills_found}
              success={true}
            />

            <SkillsCard
              title="Missing Skills"
              skills={analysis.missing_skills}
              success={false}
            />

          </div>

          <div style={{ marginTop: "20px" }}>

            <SuggestionsCard
              suggestions={analysis.suggestions}
            />

          </div>

          <div style={{ marginTop: "20px" }}>

            <SectionAnalysis />

          </div>

          <div style={{ marginTop: "20px" }}>

            <KeywordAnalysis
              found={analysis.skills_found}
              missing={analysis.missing_skills}
            />

          </div>

          <div style={{ marginTop: "20px" }}>

            <ResumeInsights
              analysis={analysis}
            />

          </div>

          <div style={{ marginTop: "20px" }}>

            <NextActions />

          </div>

          <div style={{ marginTop: "20px" }}>

            <HistoryCard
              history={history}
            />

          </div>

        </>

      )}

    </div>

  );

}