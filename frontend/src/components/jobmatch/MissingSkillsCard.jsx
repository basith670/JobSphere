import { FaTimesCircle } from "react-icons/fa";

export default function MissingSkillsCard({ skills }) {

  return (

    <div className="jobmatch-card">

      <h2>Missing Skills</h2>

      <div className="jobmatch-skills">

        {skills.length ? (

          skills.map((skill) => (

            <span
              key={skill}
              className="jobmatch-chip danger"
            >
              <FaTimesCircle />

              {skill}

            </span>

          ))

        ) : (

          <p>Excellent! No missing skills.</p>

        )}

      </div>

    </div>

  );

}