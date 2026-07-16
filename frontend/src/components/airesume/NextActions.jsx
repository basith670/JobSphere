import { Link } from "react-router-dom";

import {
  FaBriefcase,
  FaFileSignature,
  FaUserTie,
  FaComments,
} from "react-icons/fa";

export default function NextActions() {

  const actions = [

    {
      title: "Compare With Job",
      icon: <FaBriefcase />,
      path: "/job-match",
      color: "green",
    },

    {
      title: "Generate Cover Letter",
      icon: <FaFileSignature />,
      path: "/cover-letter",
      color: "blue",
    },

    {
      title: "AI Interview",
      icon: <FaUserTie />,
      path: "/interview",
      color: "orange",
    },

    {
      title: "Mock Interview",
      icon: <FaComments />,
      path: "/mock-interview",
      color: "purple",
    },

  ];

  return (

    <div className="resume-card">

      <h2 className="card-title">

        Continue Your AI Journey

      </h2>

      <div className="action-grid">

        {

          actions.map(action => (

            <Link
              key={action.title}
              to={action.path}
              className={`action-card ${action.color}`}
            >

              <div className="action-icon">

                {action.icon}

              </div>

              <h3>{action.title}</h3>

            </Link>

          ))

        }

      </div>

    </div>

  );

}