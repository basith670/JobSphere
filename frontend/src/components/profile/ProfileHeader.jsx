import { FaCamera } from "react-icons/fa";

export default function ProfileHeader({
    profile,
    onImageChange,
}) {

    return (

        <section className="profile-header-card">

            <div className="profile-header-avatar">

                <img
                    src={
                        profile.profile_image_url ||
                        "/default-avatar.png"
                    }
                    alt="Profile"
                />

                <label
                    htmlFor="profileImage"
                    className="change-photo-btn"
                >

                    <FaCamera />

                    Change Photo

                </label>

                <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={onImageChange}
                />

            </div>

            <div className="profile-header-info">

                <h2>

                    {profile.first_name} {profile.last_name}

                </h2>

                <p>

                    {profile.headline || "No headline added"}

                </p>

                <span>

                    📍 {profile.location || "Location not specified"}

                </span>

                <div className="profile-progress">

                    <div className="progress-header">

                        <span>Profile Completion</span>

                        <strong>

                            {profile.profile_completion || 0}%

                        </strong>

                    </div>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${profile.profile_completion || 0}%`,
                            }}
                        />

                    </div>

                </div>

            </div>

        </section>

    );

}