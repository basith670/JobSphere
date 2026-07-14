import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";

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

  return (
    <div style={{ padding: "40px" }}>
      <h1>Candidate Profile</h1>

      <hr />

      <p>
        <strong>Username:</strong> {profile.username}
      </p>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>

      <p>
        <strong>Role:</strong> {profile.role}
      </p>

      <p>
        <strong>Profile Completion:</strong>{" "}
        {profile.profile_completion}%
      </p>

      <p>
        <strong>Preferred Role:</strong>{" "}
        {profile.preferred_role || "Not Added"}
      </p>

      <p>
        <strong>Preferred Location:</strong>{" "}
        {profile.preferred_location || "Not Added"}
      </p>

      <p>
        <strong>Expected Salary:</strong>{" "}
        {profile.expected_salary || "Not Added"}
      </p>

      <p>
        <strong>Experience:</strong>{" "}
        {profile.years_of_experience || "Not Added"}
      </p>
    </div>
  );
};

export default Profile;