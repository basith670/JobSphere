import { useState } from "react";

import ResumeSelector from "../../components/resume/ResumeSelector";

import ATSScoreCircle from "../../components/atsscore/ATSScoreCircle";

import { calculateATS } from "../../services/atsService";

import "./ATSScore.css";

import { toast } from "react-toastify";

export default function ATSScore() {

  const [resumeId, setResumeId] = useState("");

  const [score, setScore] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {

    if (!resumeId) {
      toast.warning("Select a Resume");
      return;
    }

    try {

      setLoading(true);

      const data = await calculateATS(resumeId);

      setScore(data.atsScore);

    } catch (err) {

      console.error(err);

      toast.error("Unable to calculate ATS Score.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="ats-page">

      <h1 className="ats-title">
        ATS Resume Score
      </h1>

      <div className="ats-card">

        <ResumeSelector
          value={resumeId}
          onChange={setResumeId}
        />

        <button
          className="ats-btn"
          onClick={handleCalculate}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate ATS"}
        </button>

      </div>

      {score !== null && (

        <div className="ats-result">

            <ATSScoreCircle
                score={score}
            />

          <div className="ats-details">

            <div className="ats-row">

              <span>Keyword Match</span>

              <strong>{score}%</strong>

            </div>

            <div className="ats-row">

              <span>Formatting</span>

              <strong>95%</strong>

            </div>

            <div className="ats-row">

              <span>Readability</span>

              <strong>90%</strong>

            </div>

            <div className="ats-row">

              <span>Sections</span>

              <strong>92%</strong>

            </div>

            <div className="ats-row">

              <span>File Compatibility</span>

              <strong>100%</strong>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}