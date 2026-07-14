import { useState } from "react";

import {
  startInterview,
  submitInterviewAnswer,
} from "../../services/mockInterviewService";

import ResumeSelector from "../../components/resume/ResumeSelector";

import { toast } from "react-toastify";

export default function MockInterview() {
  const [resumeId, setResumeId] = useState("");

  const [sessionId, setSessionId] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [overallScore, setOverallScore] = useState(null);

  const handleStart = async () => {
    if (!resumeId) {
        toast.warning("Please enter Resume ID.");
      return;
    }

    try {
      setLoading(true);

      const data = await startInterview({
        resume_id: resumeId,
      });

      setSessionId(data.session_id);

      const allQuestions = [
        ...data.questions.technical_questions,
        ...data.questions.coding_questions,
        ...data.questions.behavioral_questions,
      ];

      setQuestions(allQuestions);

      setCurrentIndex(0);

      setAnswer("");

      setResult(null);

      setCompleted(false);

      setOverallScore(null);
    } catch (err) {
      console.error(err);
      toast.error("Unable to start interview.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
        toast.warning("Please enter your answer.");
      return;
    }

    try {
      setLoading(true);

      const data = await submitInterviewAnswer({
        session_id: sessionId,
        question: questions[currentIndex],
        answer: answer,
      });

      setResult(data);

      // Interview Finished
      if (currentIndex === questions.length - 1) {
        setCompleted(true);
        setOverallScore(data.overall_score);
        return;
      }

      // Move to next question after 2 seconds
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setAnswer("");
        setResult(null);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Unable to submit answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">

      <div className="resume-header">
        <h1 className="resume-title">
          AI Mock Interview
        </h1>
      </div>

      {!sessionId && (
        <div className="resume-card">

            <ResumeSelector
            value={resumeId}
            onChange={setResumeId}
            />

          <button
            className="resume-btn"
            onClick={handleStart}
            disabled={loading}
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>

        </div>
      )}

      {sessionId && !completed && (
        <div className="resume-card">

          {/* Progress Bar */}

          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#e5e7eb",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
                height: "100%",
                background: "#14b8a6",
                transition: "0.3s",
              }}
            />
          </div>

          <h3>
            Question {currentIndex + 1} / {questions.length}
          </h3>

          <h2>{questions[currentIndex]}</h2>

          <textarea
            className="resume-textarea"
            rows={10}
            placeholder="Write your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            className="resume-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Evaluating..."
              : "Submit Answer"}
          </button>

        </div>
      )}

      {result && !completed && (
        <div
          className="resume-card"
          style={{ marginTop: "30px" }}
        >
          <h2>Evaluation Result</h2>

          <h3>
            Score: {result.score}/10
          </h3>

          <p>{result.feedback}</p>
        </div>
      )}

      {completed && (
        <div
          className="resume-card"
          style={{
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          <h2>
            🎉 Interview Completed
          </h2>

          <h1
            style={{
              color: "#16a34a",
              marginTop: "20px",
            }}
          >
            Overall Score: {overallScore}/100
          </h1>

          <p
            style={{
              marginTop: "20px",
            }}
          >
            Congratulations! You have completed the AI Mock Interview.
          </p>

          <button
            className="resume-btn"
            style={{
              marginTop: "25px",
            }}
            onClick={() => {
              setSessionId(null);
              setQuestions([]);
              setCurrentIndex(0);
              setAnswer("");
              setResult(null);
              setCompleted(false);
              setOverallScore(null);
            }}
          >
            Start New Interview
          </button>

        </div>
      )}

    </div>
  );
}