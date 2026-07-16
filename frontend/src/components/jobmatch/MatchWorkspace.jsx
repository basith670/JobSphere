import ResumeSelector from "../resume/ResumeSelector";

export default function MatchWorkspace({
  resumeId,
  setResumeId,
  jobDescription,
  setJobDescription,
  handleAnalyze,
  loading,
}) {

  return (

    <div className="match-workspace">

      <div className="workspace-card">

        <h2>Select Resume</h2>

        <ResumeSelector
          value={resumeId}
          onChange={setResumeId}
        />

      </div>

      <div className="workspace-card">

        <div className="workspace-header">

          <h2>Job Description</h2>

          <span>

            {jobDescription.length} Characters

          </span>

        </div>

        <textarea

          rows="12"

          className="resume-textarea"

          placeholder="Paste the complete job description here..."

          value={jobDescription}

          onChange={(e)=>

            setJobDescription(e.target.value)

          }

        />

        <button

          className="analyze-btn"

          onClick={handleAnalyze}

          disabled={loading}

        >

          {loading

            ? "Analyzing..."

            : "Analyze Match"}

        </button>

      </div>

    </div>

  );

}