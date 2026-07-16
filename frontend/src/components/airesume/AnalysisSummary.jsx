import "./AnalysisSummary.css";

import {
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
} from "react-icons/fa";

export default function AnalysisSummary({
  atsScore,
  skillsFound,
  missingSkills,
  suggestions,
}) {
  return (
    <div className="analysis-summary">

      <div className="summary-card">

        <div className="summary-icon success">
          <FaChartLine />
        </div>

        <div>
          <h2>{atsScore}%</h2>
          <p>ATS Score</p>
        </div>

      </div>

      <div className="summary-card">

        <div className="summary-icon green">
          <FaCheckCircle />
        </div>

        <div>
          <h2>{skillsFound}</h2>
          <p>Skills Found</p>
        </div>

      </div>

      <div className="summary-card">

        <div className="summary-icon red">
          <FaTimesCircle />
        </div>

        <div>
          <h2>{missingSkills}</h2>
          <p>Missing Skills</p>
        </div>

      </div>

      <div className="summary-card">

        <div className="summary-icon yellow">
          <FaLightbulb />
        </div>

        <div>
          <h2>{suggestions}</h2>
          <p>Suggestions</p>
        </div>

      </div>

    </div>
  );
}