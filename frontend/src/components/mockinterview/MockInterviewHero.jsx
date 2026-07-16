import { FaRobot } from "react-icons/fa";

export default function MockInterviewHero() {

  return (

    <div className="resume-hero">

      <div>

        <span className="hero-badge">
          AI Mock Interview
        </span>

        <h1>
          Practice Like a Real Interview
        </h1>

        <p>

          Answer AI-generated interview questions,
          improve your communication skills,
          and receive instant performance feedback.

        </p>

      </div>

      <div className="hero-icon">

        <FaRobot />

      </div>

    </div>

  );

}