import "./ProfileSection.css";

export default function PersonalInfo({ profile }) {
  return (
    <div className="profile-card">

      <h2>Personal Information</h2>

      <div className="profile-grid">

        <div className="profile-field">
          <label>First Name</label>
          <input
            value={profile?.first_name || ""}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Last Name</label>
          <input
            value={profile?.last_name || ""}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Username</label>
          <input
            value={profile?.username || ""}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input
            value={profile?.email || ""}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Phone</label>
          <input
            value={profile?.phone || ""}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Location</label>
          <input
            value={profile?.location || ""}
            readOnly
          />
        </div>

      </div>

    </div>
  );
}