export default function RecruiterPipeline({ dashboard }) {

  const stages = [

      {

          title: "Pending",

          value: dashboard.pipeline.pending,

          color: "#2563eb",

      },

      {

          title: "Reviewed",

          value: dashboard.pipeline.reviewed,

          color: "#0f766e",

      },

      {

          title: "Shortlisted",

          value: dashboard.pipeline.shortlisted,

          color: "#f59e0b",

      },

      {

          title: "Rejected",

          value: dashboard.pipeline.rejected,

          color: "#dc2626",

      },

  ];

  return (

      <section className="recruiter-card">

          <div className="section-header">

              <h2>Application Pipeline</h2>

          </div>

          <div className="pipeline-grid">

              {stages.map((stage, index) => (

                  <div
                      key={index}
                      className="pipeline-card"
                  >

                      <div
                          className="pipeline-top"
                          style={{
                              background: stage.color,
                          }}
                      />

                      <div className="pipeline-content">

                          <h3>{stage.value}</h3>

                          <p>{stage.title}</p>

                      </div>

                  </div>

              ))}

          </div>

      </section>

  );

}