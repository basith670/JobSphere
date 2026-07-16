import {
    FaBullseye,
    FaCheckCircle,
    FaTimesCircle,
    FaChartLine,
  } from "react-icons/fa";
  
  export default function MatchSummary({ result }) {
  
    const probability =
      result.match_score >= 80
        ? "High"
        : result.match_score >= 60
        ? "Medium"
        : "Low";
  
    return (
  
      <div className="match-summary">
  
        <div className="match-summary-card">
  
          <FaBullseye className="summary-icon"/>
  
          <h2>{result.match_score}%</h2>
  
          <p>Match Score</p>
  
        </div>
  
        <div className="match-summary-card">
  
          <FaCheckCircle className="summary-icon success"/>
  
          <h2>{result.matched_skills.length}</h2>
  
          <p>Matched Skills</p>
  
        </div>
  
        <div className="match-summary-card">
  
          <FaTimesCircle className="summary-icon danger"/>
  
          <h2>{result.missing_keywords.length}</h2>
  
          <p>Missing Skills</p>
  
        </div>
  
        <div className="match-summary-card">
  
          <FaChartLine className="summary-icon info"/>
  
          <h2>{probability}</h2>
  
          <p>Hiring Chance</p>
  
        </div>
  
      </div>
  
    );
  
  }