import { useEffect, useState } from "react";

import { getProfile } from "../../services/profileService";

import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileProgress from "../../components/profile/ProfileProgress";

import "../../components/profile/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  if (!profile) {
    return <h2>Unable to load profile.</h2>;
  }

  return (
    <div className="container profile-page">

      <h1 className="profile-title">
        Candidate Profile
      </h1>

      <ProfileAvatar profile={profile} />

      <ProfileProgress
        percentage={profile.profile_completion}
      />

        <div className="card">

        <h2>Personal Information</h2>

        <div className="profile-grid">

          <div className="profile-item">
            <span className="profile-label">Username</span>
            <span className="profile-value">
              {profile.username}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">
              {profile.email}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Role</span>
            <span className="profile-value">
              {profile.role}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Headline</span>
            <span className="profile-value">
              {profile.headline || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Phone</span>
            <span className="profile-value">
              {profile.phone || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Location</span>
            <span className="profile-value">
              {profile.location || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Preferred Role</span>
            <span className="profile-value">
              {profile.preferred_role || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Preferred Location</span>
            <span className="profile-value">
              {profile.preferred_location || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Expected Salary</span>
            <span className="profile-value">
              {profile.expected_salary || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Years of Experience</span>
            <span className="profile-value">
              {profile.years_of_experience || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Skills</span>
            <span className="profile-value">
              {profile.skills || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Education</span>
            <span className="profile-value">
              {profile.education || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Portfolio</span>
            <span className="profile-value">
              {profile.portfolio || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">LinkedIn</span>
            <span className="profile-value">
              {profile.linkedin || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">GitHub</span>
            <span className="profile-value">
              {profile.github || "Not Added"}
            </span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Bio</span>
            <span className="profile-value">
              {profile.bio || "Not Added"}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;