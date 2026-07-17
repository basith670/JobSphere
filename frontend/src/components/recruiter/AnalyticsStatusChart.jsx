import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
    "#ef4444",
];

export default function AnalyticsStatusChart({ analytics }) {

    if (!analytics) return null;

    const data = [
        {
            name: "Pending",
            value: analytics.pending_applications,
            color: COLORS[0],
        },
        {
            name: "Reviewed",
            value: analytics.reviewed_applications,
            color: COLORS[1],
        },
        {
            name: "Shortlisted",
            value: analytics.shortlisted_applications,
            color: COLORS[2],
        },
        {
            name: "Rejected",
            value: analytics.rejected_applications,
            color: COLORS[3],
        },
    ];

    return (

        <section className="recruiter-card status-chart-card">

            <div className="chart-header">

                <h3>Applications by Status</h3>

                <p>Distribution of all applications.</p>

            </div>

            <div className="status-chart-layout">

                <div className="chart-side">

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={4}
                            >

                                {data.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={entry.color}
                                    />

                                ))}

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                <div className="status-summary">

                    {data.map((item) => (

                        <div
                            key={item.name}
                            className="status-item"
                        >

                            <div className="status-left">

                                <span
                                    className="status-dot"
                                    style={{
                                        background: item.color,
                                    }}
                                />

                                <span>

                                    {item.name}

                                </span>

                            </div>

                            <strong>

                                {item.value}

                            </strong>

                        </div>

                    ))}

                    <div className="status-total">

                        <span>Total Applications</span>

                        <strong>

                            {analytics.total_applications}

                        </strong>

                    </div>

                </div>

            </div>

        </section>

    );

}