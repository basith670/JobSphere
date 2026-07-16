const sections = [
    {
      title: "Contact Information",
      score: 100,
    },
    {
      title: "Technical Skills",
      score: 95,
    },
    {
      title: "Projects",
      score: 90,
    },
    {
      title: "Education",
      score: 85,
    },
    {
      title: "Experience",
      score: 80,
    },
    {
      title: "Achievements",
      score: 60,
    },
  ];
  
  export default function SectionAnalysis() {
  
    return (
  
      <div className="resume-card">
  
        <h2 className="card-title">
          Resume Section Analysis
        </h2>
  
        {
  
          sections.map(section => (
  
            <div
              key={section.title}
              className="section-row"
            >
  
              <div className="section-header">
  
                <span>
                  {section.title}
                </span>
  
                <strong>
                  {section.score}%
                </strong>
  
              </div>
  
              <div className="section-progress">
  
                <div
                  className="section-progress-fill"
                  style={{
                    width: `${section.score}%`
                  }}
                />
  
              </div>
  
            </div>
  
          ))
  
        }
  
      </div>
  
    );
  
  }