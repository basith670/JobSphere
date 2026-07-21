import "./AIResume.css";

export default function ATSCard({ score }) {
  let status = "";
  let color = "#ef4444";

  if (score >= 80) {
    status = "Excellent Resume";
    color = "#16a34a";
  } else if (score >= 60) {
    status = "Good Resume";
    color = "#f59e0b";
  } else if (score >= 40) {
    status = "Average Resume";
    color = "#f97316";
  } else {
    status = "Needs Improvement";
    color = "#dc2626";
  }

  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="resume-card ats-card">

      <h2>ATS Score</h2>

      <div className="progress-ring">

      <svg
          viewBox="0 0 180 180"
          width="100%"
          height="100%"
      >

          <circle
            className="progress-bg"
            cx="90"
            cy="90"
            r={radius}
          />

          <circle
            className="progress-bar"
            cx="90"
            cy="90"
            r={radius}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

        </svg>

        <div className="progress-text">
          <h1>{score}%</h1>
          <p>ATS</p>
        </div>

      </div>

      <h3 style={{ color }}>{status}</h3>

    </div>
  );
}