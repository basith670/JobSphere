export default function PersonalInfo({
    profile,
    handleChange,
  }) {
    return (
      <div className="profile-card">
  
        <h2>Personal Information</h2>
  
        <div className="profile-grid">
  
          <div className="form-group">
            <label>First Name</label>
  
            <input
              type="text"
              name="first_name"
              value={profile.first_name || ""}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Last Name</label>
  
            <input
              type="text"
              name="last_name"
              value={profile.last_name || ""}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Email</label>
  
            <input
              type="email"
              value={profile.email}
              disabled
            />
          </div>
  
          <div className="form-group">
            <label>Phone</label>
  
            <input
              type="text"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Location</label>
  
            <input
              type="text"
              name="location"
              value={profile.location || ""}
              onChange={handleChange}
            />
          </div>
  
        </div>
  
      </div>
    );
  }