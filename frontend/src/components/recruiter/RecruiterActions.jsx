import {
    FaPlus,
    FaUsers,
    FaBriefcase,
    FaChartLine,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function RecruiterActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Post Job",
            description: "Create a new job opening",
            icon: <FaPlus />,
            color: "#0f766e",
            onClick: () => navigate("/recruiter/jobs/create"),
        },

        {
            title: "Applicants",
            description: "Review candidate applications",
            icon: <FaUsers />,
            color: "#2563eb",
            onClick: () => navigate("/recruiter/applicants"),
        },

        {
            title: "Manage Jobs",
            description: "Edit and manage job postings",
            icon: <FaBriefcase />,
            color: "#f59e0b",
            onClick: () => navigate("/recruiter/jobs"),
        },

        {
            title: "Analytics",
            description: "View recruitment insights",
            icon: <FaChartLine />,
            color: "#7c3aed",
            onClick: () => navigate("/recruiter/analytics"),
        },

    ];

    return (

        <section className="recruiter-card">

            <div className="section-header">

                <h2>
                    Quick Actions
                </h2>

            </div>

            <div className="actions-grid">

                {

                    actions.map((item, index) => (

                        <div
                            key={index}
                            className="action-btn"
                            onClick={item.onClick}
                        >

                            <div
                                className="action-icon"
                                style={{
                                    background: item.color,
                                }}
                            >

                                {item.icon}

                            </div>

                            <div className="action-content">

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}