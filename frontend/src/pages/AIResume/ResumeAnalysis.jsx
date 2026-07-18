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
import AnalysisSummary from "../../components/airesume/AnalysisSummary";
import ResumeHero from "../../components/airesume/ResumeHero";
import SectionAnalysis from "../../components/airesume/SectionAnalysis";
import KeywordAnalysis from "../../components/airesume/KeywordAnalysis";
import ResumeInsights from "../../components/airesume/ResumeInsights";
import NextActions from "../../components/airesume/NextActions";

import "../../components/airesume/AIResume.css";

import toast from "react-hot-toast";

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

      {/* ================= HERO ================= */}

      <ResumeHero
        analysis={analysis}
      />

      {/* ================= SUMMARY ================= */}

      <AnalysisSummary
        atsScore={analysis.ats_score}
        skillsFound={analysis.skills_found.length}
        missingSkills={analysis.missing_skills.length}
        suggestions={analysis.suggestions.length}
      />

      {/* ================= ATS + SKILLS ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
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

      {/* ================= AI SUGGESTIONS ================= */}

      <div style={{ marginTop: "20px" }}>

        <SuggestionsCard
          suggestions={analysis.suggestions}
        />

      </div>

      {/* ================= RESUME SECTION ANALYSIS ================= */}

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
          <ResumeInsights analysis={analysis} />
        </div>

        <div style={{ marginTop: "20px" }}>

    <NextActions />

</div>

      {/* ================= HISTORY ================= */}

      <div style={{ marginTop: "20px" }}>

        <HistoryCard
          history={history}
        />

      </div>

    </div>

  );

}