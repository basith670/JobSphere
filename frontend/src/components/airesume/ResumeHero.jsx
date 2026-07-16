import {
    FaRobot,
    FaFileAlt,
    FaCheckCircle,
  } from "react-icons/fa";
  
  export default function ResumeHero({
    analysis,
  }) {
  
    return (
  
      <div className="resume-hero">
  
        <div className="resume-hero-left">
  
          <div className="hero-ai">
  
            <FaRobot />
  
            <span>AI Resume Intelligence</span>
  
          </div>
  
          <h1>Resume Analysis Report</h1>
  
          <p>
  
            Your resume has been analyzed using
            ATS standards and recruiter best
            practices.
  
          </p>
  
        </div>
  
        <div className="resume-hero-right">
  
          <div className="hero-score">
  
            <h2>{analysis.ats_score}%</h2>
  
            <span>ATS Score</span>
  
          </div>
  
          <div className="hero-info">
  
            <div>
  
              <FaFileAlt />
  
              <span>
                {analysis.skills_found.length}
                {" "}Skills Found
              </span>
  
            </div>
  
            <div>
  
              <FaCheckCircle />
  
              <span>
                {analysis.missing_skills.length}
                {" "}Missing Skills
              </span>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  }