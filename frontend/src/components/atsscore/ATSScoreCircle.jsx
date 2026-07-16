const radius = 85;
const circumference = 2 * Math.PI * radius;

export default function ATSScoreCircle({ score }) {

  const offset =
    circumference -
    (score / 100) * circumference;

  return (

    <div className="ats-circle-card">

      <svg
        width="220"
        height="220"
      >

        <circle
          className="circle-bg"
          cx="110"
          cy="110"
          r={radius}
        />

        <circle
          className="circle-progress"
          cx="110"
          cy="110"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

      </svg>

      <div className="circle-content">

        <h1>{score}%</h1>

        <p>ATS Score</p>

      </div>

    </div>

  );

}