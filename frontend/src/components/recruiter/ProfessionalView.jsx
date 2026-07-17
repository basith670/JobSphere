import { FaBriefcase, FaEdit } from "react-icons/fa";

export default function ProfessionalView({ profile, onEdit }) {

    return (

        <section className="recruiter-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">
                    <FaBriefcase />
                </div>

                <div>

                    <h3>Professional Information</h3>

                    <p>
                        Your career profile and preferences.
                    </p>

                </div>

            </div>

            <div className="profile-details-grid">

                <div className="detail-card">

                    <label>Preferred Role</label>

                    <p>{profile.preferred_role || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Preferred Location</label>

                    <p>{profile.preferred_location || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Years of Experience</label>

                    <p>{profile.years_of_experience || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Expected Salary</label>

                    <p>{profile.expected_salary || "-"}</p>

                </div>

                <div className="detail-card full-width">

                    <label>Skills</label>

                    <p>{profile.skills || "-"}</p>

                </div>

                <div className="detail-card full-width">

                    <label>Experience</label>

                    <p>{profile.experience || "-"}</p>

                </div>

                <div className="detail-card full-width">

                    <label>Education</label>

                    <p>{profile.education || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>LinkedIn</label>

                    <p>
                        {profile.linkedin ? (
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {profile.linkedin}
                            </a>
                        ) : (
                            "-"
                        )}
                    </p>

                </div>

                <div className="detail-card">

                    <label>GitHub</label>

                    <p>
                        {profile.github ? (
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {profile.github}
                            </a>
                        ) : (
                            "-"
                        )}
                    </p>

                </div>

                <div className="detail-card full-width">

                    <label>Portfolio</label>

                    <p>
                        {profile.portfolio ? (
                            <a
                                href={profile.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {profile.portfolio}
                            </a>
                        ) : (
                            "-"
                        )}
                    </p>

                </div>

            </div>

            <div className="settings-actions">

                <button
                    className="primary-btn"
                    onClick={onEdit}
                >

                    <FaEdit />

                    Edit

                </button>

            </div>

        </section>

    );

}