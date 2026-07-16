import {
    FaAward,
    FaCheckCircle,
    FaChartLine,
  } from "react-icons/fa";
  
  export default function InterviewResult({ result }) {
  
    if (!result) {
      return (
        <div className="resume-page">
          <div className="resume-card">
            <h2>Loading Interview Result...</h2>
          </div>
        </div>
      );
    }
  
    const score = result?.overall_score ?? 0;
  
    const strengths = result?.strengths || [];
  
    const improvements = result?.improvements || [];
  
    const performance =
      score >= 80
        ? "Excellent"
        : score >= 60
        ? "Good"
        : score >= 40
        ? "Average"
        : "Needs Improvement";
  
    return (
      <div className="resume-page">
  
        <div className="resume-card">
  
          <h1 className="resume-title">
            Interview Completed 🎉
          </h1>
  
          <div className="analysis-summary">
  
            <div className="summary-card">
  
              <FaAward size={30} />
  
              <h2>{score}%</h2>
  
              <p>Overall Score</p>
  
            </div>
  
            <div className="summary-card">
  
              <FaChartLine size={30} />
  
              <h2>{performance}</h2>
  
              <p>Performance</p>
  
            </div>
  
          </div>
  
          <div className="resume-card" style={{ marginTop: "25px" }}>
  
            <h2>
              <FaCheckCircle
                style={{
                  color: "#16a34a",
                  marginRight: "10px",
                }}
              />
              Strengths
            </h2>
  
            {strengths.length > 0 ? (
  
              <ul className="feedback-list">
  
                {strengths.map((item, index) => (
  
                  <li key={index}>
                    ✅ {item}
                  </li>
  
                ))}
  
              </ul>
  
            ) : (
  
              <p
                style={{
                  color: "#64748b",
                }}
              >
                No strengths identified.
              </p>
  
            )}
  
          </div>
  
          <div className="resume-card" style={{ marginTop: "25px" }}>
  
            <h2>
              ⚠️ Improvements
            </h2>
  
            {improvements.length > 0 ? (
  
              <ul className="feedback-list">
  
                {improvements.map((item, index) => (
  
                  <li key={index}>
                    ⚠️ {item}
                  </li>
  
                ))}
  
              </ul>
  
            ) : (
  
              <p
                style={{
                  color: "#16a34a",
                }}
              >
                Excellent! No improvements suggested.
              </p>
  
            )}
  
          </div>
  
        </div>
  
      </div>
    );
  }