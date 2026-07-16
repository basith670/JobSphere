import {
    FaCheckCircle,
    FaFileAlt,
    FaGithub,
    FaLinkedin,
  } from "react-icons/fa";
  
  export default function ResumeMetrics({
    analysis,
  }) {
  
    const github = analysis.suggestions.some(item =>
      item.toLowerCase().includes("github")
    );
  
    const linkedin = analysis.suggestions.some(item =>
      item.toLowerCase().includes("linkedin")
    );
  
    return (
  
      <div className="metrics-grid">
  
        <div className="metric-card">
  
          <FaCheckCircle className="metric-icon green"/>
  
          <h2>{analysis.ats_score}%</h2>
  
          <p>ATS Compatibility</p>
  
        </div>
  
        <div className="metric-card">
  
          <FaFileAlt className="metric-icon blue"/>
  
          <h2>{analysis.skills_found.length}</h2>
  
          <p>Skills Identified</p>
  
        </div>
  
        <div className="metric-card">
  
          <FaGithub
            className={`metric-icon ${
              github ? "red" : "green"
            }`}
          />
  
          <h2>
  
            {github ? "Missing" : "Present"}
  
          </h2>
  
          <p>GitHub Profile</p>
  
        </div>
  
        <div className="metric-card">
  
          <FaLinkedin
            className={`metric-icon ${
              linkedin ? "red" : "green"
            }`}
          />
  
          <h2>
  
            {linkedin ? "Missing" : "Present"}
  
          </h2>
  
          <p>LinkedIn Profile</p>
  
        </div>
  
      </div>
  
    );
  
  }