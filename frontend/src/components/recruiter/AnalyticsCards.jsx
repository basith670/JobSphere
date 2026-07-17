import {
    FaBriefcase,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaUsers,
    FaBuilding,
} from "react-icons/fa";

export default function AnalyticsCards({

    analytics,
    loading,

}) {

    if (loading) {

        return (

            <section className="analytics-grid">

                {Array.from({ length: 6 }).map((_, index) => (

                    <div
                        key={index}
                        className="analytics-card analytics-skeleton"
                    />

                ))}

            </section>

        );

    }

    if (!analytics) {

        return null;

    }

    const cards = [

        {
            title: "Total Jobs",
            subtitle: "Published positions",
            value: analytics.total_jobs,
            icon: <FaBriefcase />,
            color: "blue",
        },

        {
            title: "Active Jobs",
            subtitle: "Currently hiring",
            value: analytics.active_jobs,
            icon: <FaCheckCircle />,
            color: "green",
        },

        {
            title: "Applications",
            subtitle: "Total received",
            value: analytics.total_applications,
            icon: <FaUsers />,
            color: "purple",
        },

        {
            title: "Pending",
            subtitle: "Awaiting review",
            value: analytics.pending_applications,
            icon: <FaClock />,
            color: "orange",
        },

        {
            title: "Shortlisted",
            subtitle: "Moved forward",
            value: analytics.shortlisted_applications,
            icon: <FaBuilding />,
            color: "teal",
        },

        {
            title: "Rejected",
            subtitle: "Application closed",
            value: analytics.rejected_applications,
            icon: <FaTimesCircle />,
            color: "red",
        },

    ];

    return (

        <section className="analytics-grid">

            {

                cards.map((card) => (

                    <div
                        key={card.title}
                        className="analytics-card"
                    >

                        <div className={`analytics-icon ${card.color}`}>

                            {card.icon}

                        </div>

                        <div className="analytics-content">

                            <span className="analytics-title">

                                {card.title}

                            </span>

                            <h2>

                                {card.value}

                            </h2>

                            <p>

                                {card.subtitle}

                            </p>

                        </div>

                    </div>

                ))

            }

        </section>

    );

}