import "./AIResume.css";

export default function HistoryCard({ history }) {
  return (
    <div className="resume-card">

      <h2>Analysis History</h2>

      {history.length === 0 ? (
        <p>No previous analyses.</p>
      ) : (
        <div className="history-list">

          {history.map((item) => (
            <div
              key={item.id}
              className="history-item"
            >
              <div>
                <h4>{item.ats_score}% ATS</h4>

                <p>
                  {new Date(
                    item.analyzed_at
                  ).toLocaleDateString()}
                </p>
              </div>

              <span className="history-score">
                {item.ats_score}%
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}