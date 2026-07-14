import "./AIResume.css";

export default function SkillsCard({
  title,
  skills,
  success,
}) {
  return (
    <div className="resume-card">

      <h2>{title}</h2>

      <div className="skill-badges">

        {skills.length === 0 ? (
          <p>No skills found.</p>
        ) : (
          skills.map((skill, index) => (
            <span
              key={index}
              className={
                success
                  ? "skill-badge success"
                  : "skill-badge danger"
              }
            >
              {success ? "✓" : "✕"} {skill}
            </span>
          ))
        )}

      </div>

    </div>
  );
}