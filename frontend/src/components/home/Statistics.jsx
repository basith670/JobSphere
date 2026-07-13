import "./Statistics.css";
import CountUp from "react-countup";

const stats = [
  {
    number: 1250,
    suffix: "+",
    label: "Open Jobs",
  },
  {
    number: 8,
    suffix: "+",
    label: "Companies",
  },
  {
    number: 320,
    suffix: "+",
    label: "Candidates Hired",
  },
  {
    number: 96,
    suffix: "%",
    label: "Success Rate",
  },
];

const Statistics = () => {
  return (
    <section className="statistics">

      <div className="stats-container">

        <div className="stats-heading">

          <span>JobSphere in Numbers</span>

          <h2>
            Trusted by Companies and Professionals
          </h2>

        </div>

        <div className="stats-grid">

          {stats.map((item) => (

            <div
              key={item.label}
              className="stat-card"
            >

                <h3>

                {item.number}

                {item.suffix}

                </h3>

              <p>{item.label}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Statistics;