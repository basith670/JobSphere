import {
    FaFileSignature,
    FaRobot,
    FaEnvelopeOpenText,
  } from "react-icons/fa";
  
  export default function CoverLetterHero() {
  
    return (
  
      <div className="cover-hero">
  
        <div className="cover-left">
  
          <div className="cover-badge">
  
            <FaRobot />
  
            <span>AI Cover Letter Generator</span>
  
          </div>
  
          <h1>
            Create a Professional Cover Letter
          </h1>
  
          <p>
            Generate personalized, recruiter-ready cover letters
            tailored to your resume and the job description in
            just a few seconds.
          </p>
  
        </div>
  
        <div className="cover-right">
  
          <div className="cover-icon">
  
            <FaEnvelopeOpenText />
  
          </div>
  
          <h2>Ready to Apply</h2>
  
          <span>AI Generated</span>
  
        </div>
  
      </div>
  
    );
  
  }