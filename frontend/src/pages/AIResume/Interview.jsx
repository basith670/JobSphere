import { useState } from "react";

import toast from "react-hot-toast";

import InterviewHero from "../../components/interview/InterviewHero";
import ResumeSelector from "../../components/resume/ResumeSelector";
import InterviewSummary from "../../components/interview/InterviewSummary";
import InterviewActions from "../../components/interview/InterviewActions";

import { generateInterviewQuestions } from "../../services/interviewService";

import "../../components/airesume/AIResume.css";

export default function Interview() {

  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const [interviewType, setInterviewType] = useState("Mixed");
  const [experience, setExperience] = useState("Fresher");

  const handleGenerate = async () => {

    if (!resumeId) {
      toast.warning("Please select a resume.");
      return;
    }

    try {

      setLoading(true);

      const data = await generateInterviewQuestions({
        resume_id: resumeId,
        job_description: jobDescription,
        interview_type: interviewType,
        experience,
      });

      setQuestions(data);

      toast.success(
        "Interview Questions Generated."
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Unable to generate interview questions."
      );

    } finally {

      setLoading(false);

    }

  };

  const renderSection = (title, items) => (

    <div className="resume-card">

      <h2>{title}</h2>

      {

        items.length === 0 ? (

          <p>No questions available.</p>

        ) : (

          <div className="question-list">

            {

              items.map((question, index) => (

                <div
                  key={index}
                  className="question-card"
                >

                  <div className="question-number">
                    Q{index + 1}
                  </div>

                  <p>{question}</p>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

  return (

    <div className="resume-page">

      {/* HERO */}

      <InterviewHero />

      {/* WORKSPACE */}

      <div className="match-workspace">

        {/* LEFT PANEL */}

        <div className="workspace-card">

          <h2>Select Resume</h2>

          <div className="form-group">

            <label>Resume</label>

            <ResumeSelector
              value={resumeId}
              onChange={setResumeId}
            />

          </div>

          <div className="form-group">

            <label>Interview Type</label>

            <select
              className="resume-input"
              value={interviewType}
              onChange={(e) =>
                setInterviewType(e.target.value)
              }
            >

              <option>Mixed</option>
              <option>Technical</option>
              <option>HR</option>

            </select>

          </div>

          <div className="form-group">

            <label>Experience Level</label>

            <select
              className="resume-input"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
            >

              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3+ Years</option>

            </select>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="workspace-card">

          <div className="workspace-header">

            <h2>Job Description</h2>

            <span>Optional</span>

          </div>

          <textarea
            rows="12"
            className="resume-textarea"
            placeholder="Paste the job description to generate more relevant interview questions..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
          />

          <button
            className="analyze-btn"
            onClick={handleGenerate}
            disabled={loading}
          >

            {
              loading
                ? "Generating..."
                : "Generate Questions"
            }

          </button>

        </div>

      </div>

      {/* RESULTS */}

      {

        questions ? (

          <>

            <InterviewSummary
              questions={questions}
            />

            {renderSection(
              "Technical Questions",
              questions.technical_questions
            )}

            {renderSection(
              "Coding Questions",
              questions.coding_questions
            )}

            {renderSection(
              "Behavioral Questions",
              questions.behavioral_questions
            )}

            {renderSection(
              "HR Questions",
              questions.hr_questions
            )}

            <InterviewActions
              questions={questions}
            />

          </>

        ) : (

          <div className="resume-card">

            <h2>
              Ready to Practice
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.8",
              }}
            >

              Select your resume, choose an interview type,
              set your experience level, then generate
              personalized interview questions powered by AI.

            </p>

          </div>

        )

      }

    </div>

  );

}