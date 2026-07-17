export default function TopJobsChart({ jobs }) {

    if (!jobs || jobs.length === 0) {

        return null;

    }

    const maxApplications = Math.max(
        ...jobs.map((job) => job.applications),
        1
    );

    return (

        <section className="recruiter-card top-jobs-card">

            <div className="chart-header">

                <h3>Top Performing Jobs</h3>

                <p>
                    Jobs receiving the highest number of applications.
                </p>

            </div>

            <div className="top-jobs-list">

                {jobs.map((job) => {

                    const percentage =
                        (job.applications / maxApplications) * 100;

                    return (

                        <div
                            key={job.job_title}
                            className="top-job-item"
                        >

                            <div className="top-job-header">

                                <div>

                                    <h4>{job.job_title}</h4>

                                    <span>

                                        {job.applications} Applications

                                    </span>

                                </div>

                                <strong>

                                    {Math.round(percentage)}%

                                </strong>

                            </div>

                            <div className="progress-track">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

}