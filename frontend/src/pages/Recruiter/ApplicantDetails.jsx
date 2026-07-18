import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
    FaArrowLeft,
    FaBriefcase,
    FaCalendarAlt,
    FaDownload,
    FaEnvelope,
    FaUser,
    FaCheck,
    FaTimes,
    FaCalendarPlus,
} from "react-icons/fa";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
    getApplication,
    updateApplication,
} from "../../services/applicationService";

import InterviewModal from "../../components/recruiter/InterviewModal";

export default function ApplicantDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showInterviewModal, setShowInterviewModal] = useState(false);

  useEffect(() => {

    fetchApplication();

  }, [id]);

  const fetchApplication = async () => {

    try {

      const data = await getApplication(id);

      setApplication(data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  const updateStatus = async (status) => {

    try {

        await updateApplication(
            application.id,
            {
                status,
            }
        );

        toast.success(
            `Application ${status.toLowerCase()} successfully.`
        );

        fetchApplication();

    }

    catch (error) {

        console.error(error);

        toast.error(
            "Unable to update application."
        );

    }

};

const handleInterviewSchedule = async (data) => {

    try {

        await updateApplication(
            application.id,
            {
                interview_date: data.interview_date,
                recruiter_notes: data.recruiter_notes,
                status: "Reviewed",
            }
        );

        toast.success(
            "Interview scheduled successfully."
        );

        setShowInterviewModal(false);

        fetchApplication();

    }

    catch (error) {

        console.error(error);

        toast.error(
            "Unable to schedule interview."
        );

    }

};

  if (loading) {

    return (

      <div className="recruiter-page">

        <div className="recruiter-card">

          Loading...

        </div>

      </div>

    );

  }

  return (

    <div className="recruiter-page">

      {/* ================= Header ================= */}

      <div className="applicant-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >

          <FaArrowLeft />

          Back

        </button>

        <div className="applicant-profile">

          <div className="profile-avatar">

            {application.applicant_first_name?.charAt(0)}
            {application.applicant_last_name?.charAt(0)}

          </div>

          <div className="profile-info">

            <h1>

              {application.applicant_first_name}{" "}
              {application.applicant_last_name}

            </h1>

            <p className="profile-email">

              <FaEnvelope />

              {application.applicant_email}

            </p>

            <div className="profile-job">

              Applied for

              <strong>

                {application.job_title}

              </strong>

              at

              <strong>

                {application.company_name}

              </strong>

            </div>

            <span
              className={`status-badge ${application.status.toLowerCase()}`}
            >

              {application.status}

            </span>

          </div>

        </div>

      </div>

      {/* ================= Stats ================= */}

      <div className="stats-grid">

        <div className="stats-card">

          <FaBriefcase className="stats-icon" />

          <div>

            <h3>

              {application.job_title}

            </h3>

            <span>

              Applied Job

            </span>

          </div>

        </div>

        <div className="stats-card">

          <FaCalendarAlt className="stats-icon" />

          <div>

            <h3>

              {new Date(
                application.applied_at
              ).toLocaleDateString()}

            </h3>

            <span>

              Applied On

            </span>

          </div>

        </div>

        <div className="stats-card">

          <FaUser className="stats-icon" />

          <div>

            <h3>

              {application.status}

            </h3>

            <span>

              Current Status

            </span>

          </div>

        </div>

      </div>

      {/* ================= Resume ================= */}

      <div className="recruiter-card">

<h2>

    Resume

</h2>

<div className="resume-box">

    <div>

        <h3>

            Candidate Resume

        </h3>

        <p>

            PDF Document

        </p>

    </div>

    <div className="resume-actions">

        <a
            href={application.resume}
            target="_blank"
            rel="noreferrer"
            className="secondary-btn"
        >

            Preview

        </a>

        <a
            href={application.resume}
            download
            className="create-job-btn"
        >

            <FaDownload />

            Download

        </a>

    </div>

</div>

</div>

      {/* ================= Cover Letter ================= */}

      <div className="recruiter-card">

        <h2>

          Cover Letter

        </h2>

        <div className="cover-letter-box">

            <blockquote>

                {application.cover_letter ||
                "No cover letter provided."}

            </blockquote>

        </div>

      </div>

{/* ================= Recruiter Notes ================= */}

<div className="recruiter-card">

    <h2>

        Recruiter Notes

    </h2>

    <div className="notes-box">

        {

            application.recruiter_notes ?

            (

                <p>

                    {application.recruiter_notes}

                </p>

            )

            :

            (

                <div className="empty-notes">

                    📝

                    <h4>

                        No recruiter notes

                    </h4>

                    <p>

                        Notes can be added after reviewing the candidate.

                    </p>

                </div>

            )

        }

    </div>

</div>

{/* ================= Recruiter Actions ================= */}

<div className="recruiter-card">

    <h2>

        Recruiter Actions

    </h2>

    <div className="action-buttons">

        <button
            className="shortlist-btn"
            onClick={() =>
                updateStatus("Shortlisted")
            }
        >

            <FaCheck />

            Shortlist

        </button>

        <button
                className="interview-btn"
                onClick={() => setShowInterviewModal(true)}
            >

                <FaCalendarPlus />

                Schedule Interview

            </button>

        <button
            className="reject-btn"
            onClick={() =>
                updateStatus("Rejected")
            }
        >

            <FaTimes />

            Reject

        </button>

    </div>
            <InterviewModal

            open={showInterviewModal}

            onClose={() =>
                setShowInterviewModal(false)
            }

            onSave={handleInterviewSchedule}

        />

</div>

</div>

  );

}