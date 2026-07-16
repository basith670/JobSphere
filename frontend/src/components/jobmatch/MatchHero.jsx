import {
    FaBriefcase,
    FaRobot,
    FaBullseye,
  } from "react-icons/fa";
  
  export default function MatchHero() {
  
    return (
  
      <div className="match-hero">
  
        <div className="match-hero-left">
  
          <div className="match-badge">
  
            <FaRobot />
  
            <span>AI Job Matching</span>
  
          </div>
  
          <h1>
            AI Job Match
          </h1>
  
          <p>
            Compare your resume with any job
            description and instantly discover
            how well your profile matches the
            employer's requirements.
          </p>
  
        </div>
  
        <div className="match-hero-right">
  
          <div className="hero-icon">
  
            <FaBullseye />
  
          </div>
  
          <h2>
            Find Your Perfect Match
          </h2>
  
          <span>
            AI Powered Analysis
          </span>
  
        </div>
  
      </div>
  
    );
  
  }