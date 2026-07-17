import { FaEdit, FaUserCircle } from "react-icons/fa";

export default function PersonalView({ profile, onEdit }) {

    return (

        <section className="recruiter-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">
                    <FaUserCircle />
                </div>

                <div>

                    <h3>Personal Information</h3>

                    <p>
                        Manage your personal profile.
                    </p>

                </div>

            </div>

            {/* ================= Profile Header ================= */}

            <div className="company-logo-section">

                {

                    profile.profile_image ?

                    <img
                    src={
                        profile.profile_image
                            ? `${profile.profile_image}?t=${Date.now()}`
                            : ""
                    }
                    className="company-logo-preview"
                    alt="Profile"
                    />

                        :

                        <div className="company-logo-placeholder">

                            <FaUserCircle />

                        </div>

                }

                <div>

                    <h4>

                        {profile.first_name || profile.last_name
                            ? `${profile.first_name} ${profile.last_name}`
                            : "-"}

                    </h4>

                    <div className="verification-status">

                        {profile.headline || "Recruiter"}

                    </div>

                </div>

            </div>

            {/* ================= Details ================= */}

            <div className="profile-details-grid">

                <div className="detail-card">

                    <label>Phone</label>

                    <p>{profile.phone || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Location</label>

                    <p>{profile.location || "-"}</p>

                </div>

                <div className="detail-card full-width">

                    <label>Headline</label>

                    <p>{profile.headline || "-"}</p>

                </div>

                <div className="detail-card full-width">

                    <label>Bio</label>

                    <p>{profile.bio || "-"}</p>

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