import { useState } from "react";

import { matchResume } from "../../services/jobMatchService";

import ATSCard from "../../components/airesume/ATSCard";
import SkillsCard from "../../components/airesume/SkillsCard";
import SuggestionsCard from "../../components/airesume/SuggestionsCard";
import ResumeSelector from "../../components/resume/ResumeSelector";
import MatchHero from "../../components/jobmatch/MatchHero";
import MatchWorkspace from "../../components/jobmatch/MatchWorkspace";
import MatchSummary from "../../components/jobmatch/MatchSummary";
import MatchScoreCircle from "../../components/jobmatch/MatchScoreCircle";

import MatchedSkillsCard from "../../components/jobmatch/MatchedSkillsCard";
import MissingSkillsCard from "../../components/jobmatch/MissingSkillsCard";

import RecommendationCard from "../../components/jobmatch/RecommendationCard";

import toast from "react-hot-toast";

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

      <MatchHero />

      <MatchWorkspace
    resumeId={resumeId}
    setResumeId={setResumeId}
    jobDescription={jobDescription}
    setJobDescription={setJobDescription}
    handleAnalyze={handleAnalyze}
    loading={loading}
/>

      {result && (

        <>

          <MatchSummary
              result={result}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >

            <MatchScoreCircle
                score={result.match_score}
            />

            <MatchedSkillsCard
                skills={result.matched_skills}
            />

            <MissingSkillsCard
                skills={result.missing_keywords}
            />

          </div>

          <div style={{ marginTop: "20px" }}>
          <RecommendationCard
    suggestions={result.suggestions}
/>
          </div>
        </>

      )}

    </div>
  );
}