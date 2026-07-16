import {
    FaCheckCircle,
    FaTimesCircle,
  } from "react-icons/fa";
  
  export default function KeywordAnalysis({
    found,
    missing,
  }) {
  
    return (
  
      <div className="resume-card">
  
        <h2 className="card-title">
          Keyword Analysis
        </h2>
  
        <p className="card-subtitle">
          These keywords are compared against
          ATS systems and job descriptions.
        </p>
  
        <div className="keyword-grid">
  
          <div>
  
            <h3 className="keyword-heading success">
              Matched Keywords
            </h3>
  
            <div className="keyword-list">
  
              {found.map((skill) => (
  
                <div
                  key={skill}
                  className="keyword success"
                >
  
                  <FaCheckCircle />
  
                  {skill}
  
                </div>
  
              ))}
  
            </div>
  
          </div>
  
          <div>
  
            <h3 className="keyword-heading danger">
              Missing Keywords
            </h3>
  
            <div className="keyword-list">
  
              {missing.map((skill) => (
  
                <div
                  key={skill}
                  className="keyword danger"
                >
  
                  <FaTimesCircle />
  
                  {skill}
  
                </div>
  
              ))}
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  }