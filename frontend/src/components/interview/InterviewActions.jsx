import {
    FaCopy,
    FaFilePdf,
    FaPlay,
  } from "react-icons/fa";
  
  import { toast } from "react-toastify";
  
  import { useNavigate } from "react-router-dom";
  
  export default function InterviewActions({
    questions,
  }) {
  
    const navigate = useNavigate();
  
    const copyAll = async () => {
  
      const text = [
  
        ...questions.technical_questions,
  
        ...questions.coding_questions,
  
        ...questions.behavioral_questions,
  
        ...questions.hr_questions,
  
      ].join("\n\n");
  
      await navigator.clipboard.writeText(text);
  
      toast.success(
        "Questions copied."
      );
  
    };
  
    const startMockInterview = () => {
  
      navigate("/mock-interview", {
  
        state: {
  
          interviewQuestions: [
  
            ...questions.technical_questions,
  
            ...questions.coding_questions,
  
            ...questions.behavioral_questions,
  
            ...questions.hr_questions,
  
          ],
  
        },
  
      });
  
    };
  
    return (
  
      <div className="interview-actions">
  
        <button
          className="resume-btn"
          onClick={copyAll}
        >
  
          <FaCopy />
  
          Copy Questions
  
        </button>
  
        <button
          className="resume-btn"
          onClick={() => window.print()}
        >
  
          <FaFilePdf />
  
          Print
  
        </button>
  
        <button
          className="resume-btn"
          onClick={startMockInterview}
        >
  
          <FaPlay />
  
          Start Mock Interview
  
        </button>
  
      </div>
  
    );
  
  }