import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  analyzeResume,
  getAnalysisHistory,
} from "../../services/aiResumeService";

import ATSCard from "../../components/airesume/ATSCard";
import SkillsCard from "../../components/airesume/SkillsCard";
import SuggestionsCard from "../../components/airesume/SuggestionsCard";
import HistoryCard from "../../components/airesume/HistoryCard";

import "../../components/airesume/AIResume.css";

import { toast } from "react-toastify";

export default function ResumeAnalysis() {
  const { resumeId } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, [resumeId]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);

      const analysisData = await analyzeResume(resumeId);
      const historyData = await getAnalysisHistory();

      setAnalysis(analysisData);

      // Supports both paginated and non-paginated APIs
      setHistory(historyData.results || historyData);
    } catch (err) {
      console.error(err);
      toast.error("Unable to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="resume-page">
        <h1 className="resume-title">
          Analyzing Resume...
        </h1>
      </div>
    );
  }

  return (
    <div className="resume-page">

      <div className="resume-header">
        <h1 className="resume-title">
          AI Resume Analysis
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        <ATSCard score={analysis.ats_score} />

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
        <HistoryCard
          history={history}
        />
      </div>

    </div>
  );
}