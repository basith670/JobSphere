import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaClock,
    FaStar,
  } from "react-icons/fa";
  
  export default function ResumeInsights({
    analysis,
  }) {
  
    const score = analysis.ats_score;
  
    const rating =
      score >= 90
        ? "Outstanding"
        : score >= 75
        ? "Excellent"
        : score >= 60
        ? "Good"
        : "Needs Improvement";
  
    const recruiterReadTime =
      analysis.skills_found.length > 6
        ? "35 sec"
        : "25 sec";
  
    return (
  
      <div className="resume-card">
  
        <h2 className="card-title">
          AI Resume Insights
        </h2>
  
        <div className="insight-list">
  
          <div className="insight-item">
  
            <FaStar className="insight-icon gold"/>
  
            <div>
  
              <h4>Overall Rating</h4>
  
              <p>{rating}</p>
  
            </div>
  
          </div>
  
          <div className="insight-item">
  
            <FaClock className="insight-icon blue"/>
  
            <div>
  
              <h4>Estimated Recruiter Read Time</h4>
  
              <p>{recruiterReadTime}</p>
  
            </div>
  
          </div>
  
          <div className="insight-item">
  
            <FaCheckCircle className="insight-icon green"/>
  
            <div>
  
              <h4>ATS Compatibility</h4>
  
              <p>{score}%</p>
  
            </div>
  
          </div>
  
          <div className="insight-item">
  
            <FaExclamationTriangle className="insight-icon orange"/>
  
            <div>
  
              <h4>Improvement Priority</h4>
  
              <p>
  
                {analysis.missing_skills.length}
  
                {" "}skills missing
  
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  }