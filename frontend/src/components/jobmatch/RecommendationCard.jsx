import {
    FaRobot,
    FaArrowRight,
  } from "react-icons/fa";
  
  export default function RecommendationCard({
    suggestions,
  }) {
  
    return (
  
      <div className="recommendation-card">
  
        <div className="recommendation-header">
  
          <FaRobot />
  
          <h2>AI Recommendations</h2>
  
        </div>
  
        {suggestions.length ? (
  
          suggestions.map((item, index) => (
  
            <div
              key={index}
              className="recommendation-item"
            >
  
              <FaArrowRight />
  
              <span>{item}</span>
  
            </div>
  
          ))
  
        ) : (
  
          <div className="recommendation-empty">
  
            Great! Your resume already matches
            this job very well.
  
          </div>
  
        )}
  
      </div>
  
    );
  
  }