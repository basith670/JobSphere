import {
    FaRobot,
    FaUserTie,
    FaComments,
  } from "react-icons/fa";
  
  export default function InterviewHero() {
  
    return (
  
      <div className="interview-hero">
  
        <div className="interview-left">
  
          <div className="interview-badge">
  
            <FaRobot />
  
            <span>AI Interview Coach</span>
  
          </div>
  
          <h1>
            AI Interview Preparation
          </h1>
  
          <p>
            Generate personalized HR and technical interview
            questions based on your skills and desired role.
            Practice smarter and build confidence before your
            next interview.
          </p>
  
        </div>
  
        <div className="interview-right">
  
          <div className="interview-icon">
  
            <FaUserTie />
  
          </div>
  
          <h2>
            Interview Ready
          </h2>
  
          <span>
            AI Powered Practice
          </span>
  
        </div>
  
      </div>
  
    );
  
  }