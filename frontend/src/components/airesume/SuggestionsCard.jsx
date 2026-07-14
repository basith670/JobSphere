import "./AIResume.css";

export default function SuggestionsCard({ suggestions }) {
  return (
    <div className="resume-card">

      <h2>AI Suggestions</h2>

      {suggestions.length === 0 ? (
        <div className="suggestion success">
          ✅ Excellent! No major improvements needed.
        </div>
      ) : (
        <div className="suggestion-list">

          {suggestions.map((item, index) => (
            <div
              key={index}
              className="suggestion"
            >
              <span className="icon">💡</span>

              <div>
                <h4>Recommendation {index + 1}</h4>
                <p>{item}</p>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}