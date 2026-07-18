import { useState } from "react";
import { useLocation } from "react-router-dom";

import MockInterviewHero from "../../components/mockinterview/MockInterviewHero";
import InterviewProgress from "../../components/mockinterview/InterviewProgress";
import QuestionCard from "../../components/mockinterview/QuestionCard";
import AnswerBox from "../../components/mockinterview/AnswerBox";
import InterviewResult from "../../components/mockinterview/InterviewResult";

import ResumeSelector from "../../components/resume/ResumeSelector";

import { evaluateAnswer } from "../../services/mockInterviewService";

import "../../components/airesume/AIResume.css";

import toast from "react-hot-toast";

export default function MockInterview() {

  const location = useLocation();

  const defaultQuestions = [

    "Explain React Virtual DOM.",

    "Difference between JWT and Sessions?",

    "What is Django ORM?",

    "Explain useEffect lifecycle.",

    "How would you optimize SQL queries?",

  ];

  const sampleQuestions =
    location.state?.interviewQuestions?.length > 0
      ? location.state.interviewQuestions
      : defaultQuestions;

  const [started, setStarted] = useState(false);

  const [finished, setFinished] = useState(false);

  const [resumeId, setResumeId] = useState("");

  const [current, setCurrent] = useState(1);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const nextQuestion = async () => {

    const trimmedAnswer = answer.trim();

    if (!trimmedAnswer) {

      toast.warning(
        "Please answer this question before continuing."
      );

      return;

    }

    if (trimmedAnswer.length < 10) {

      toast.warning(
        "Please enter at least 10 characters before continuing."
      );

      return;

    }

    const updatedAnswers = [...answers];

    updatedAnswers[current - 1] = trimmedAnswer;

    setAnswers(updatedAnswers);

    if (current === sampleQuestions.length) {

      try {

        setLoading(true);

        const evaluation = await evaluateAnswer({

          questions: sampleQuestions,

          answers: updatedAnswers,

        });

        setResult(evaluation);

        setFinished(true);

      } catch (err) {

        console.error(err);

        toast.error(
          "Unable to evaluate interview."
        );

      } finally {

        setLoading(false);

      }

      return;

    }

    setCurrent((prev) => prev + 1);

    setAnswer("");

  };

  if (finished && result) {

    return (

      <div className="resume-page">

        <InterviewResult
          result={result}
        />

      </div>

    );

  }
  return (

    <div className="resume-page">

      <MockInterviewHero />

      {

        !started ? (

          <div className="match-workspace">

            <div className="workspace-card">

              <h2>

                Interview Setup

              </h2>

              <div className="form-group">

                <label>

                  Resume

                </label>

                <ResumeSelector
                  value={resumeId}
                  onChange={setResumeId}
                />

              </div>

              <div className="form-group">

                <label>

                  Difficulty

                </label>

                <select className="resume-input">

                  <option>Easy</option>

                  <option>Medium</option>

                  <option>Hard</option>

                </select>

              </div>

              <div className="form-group">

                <label>

                  Questions

                </label>

                <select className="resume-input">

                  <option>5 Questions</option>

                  <option>10 Questions</option>

                  <option>15 Questions</option>

                </select>

              </div>

              <button

                className="analyze-btn"

                disabled={!resumeId}

                onClick={() => setStarted(true)}

              >

                Start Interview

              </button>

            </div>

          </div>

        ) : (

          <>

            <InterviewProgress

              current={current}

              total={sampleQuestions.length}

            />

            <QuestionCard

              question={sampleQuestions[current - 1]}

            />

            <AnswerBox

              answer={answer}

              setAnswer={setAnswer}

            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "12px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >

              {

                answer.trim().length >= 10 ? (

                  <span
                    style={{
                      color: "#16a34a",
                      fontWeight: 600,
                    }}
                  >

                    ✅ Ready to continue

                  </span>

                ) : (

                  <span
                    style={{
                      color: "#dc2626",
                      fontWeight: 600,
                    }}
                  >

                    Need{" "}

                    {

                      Math.max(
                        10 - answer.trim().length,
                        0
                      )

                    }

                    {" "}more character

                    {

                      Math.max(
                        10 - answer.trim().length,
                        0
                      ) !== 1 && "s"

                    }

                  </span>

                )

              }

              <span
                style={{
                  color: "#64748b",
                }}
              >

                {answer.trim().length} characters

              </span>

            </div>

            <button

              className="analyze-btn"

              onClick={nextQuestion}

              disabled={loading}

            >

              {

                loading

                  ? "Evaluating..."

                  : current === sampleQuestions.length

                  ? "Finish Interview"

                  : "Next Question"

              }

            </button>

          </>

        )

      }

    </div>

  );

}