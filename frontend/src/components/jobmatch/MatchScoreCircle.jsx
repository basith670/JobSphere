const radius = 85;
const circumference = 2 * Math.PI * radius;

export default function MatchScoreCircle({ score }) {

  const offset =
    circumference -
    (score / 100) * circumference;

  const status =
    score >= 80
      ? "Excellent Match"
      : score >= 60
      ? "Good Match"
      : "Needs Improvement";

  return (

    <div className="match-score-card">

      <h2>Overall Match</h2>

      <div className="match-circle">

      <svg
            viewBox="0 0 220 220"
            width="100%"
            height="100%"
        >

          <circle
            className="match-bg"
            cx="110"
            cy="110"
            r={radius}
          />

          <circle
            className="match-progress"
            cx="110"
            cy="110"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

        </svg>

        <div className="match-content">

          <h1>{score}%</h1>

          <p>Match</p>

        </div>

      </div>

      <h3>{status}</h3>

    </div>

  );

}