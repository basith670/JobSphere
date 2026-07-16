import { FaCheckCircle } from "react-icons/fa";

export default function MatchedSkillsCard({ skills }) {

  return (

    <div className="jobmatch-card">

      <h2>Matched Skills</h2>

      <div className="jobmatch-skills">

        {skills.length ? (

          skills.map((skill) => (

            <span
              key={skill}
              className="jobmatch-chip success"
            >
              <FaCheckCircle />

              {skill}

            </span>

          ))

        ) : (

          <p>No matched skills found.</p>

        )}

      </div>

    </div>

  );

}