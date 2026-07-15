export default function CareerInfo({
    profile,
    handleChange,
  }) {
    return (
      <div className="profile-card">
  
        <h2>Professional Information</h2>
  
        <div className="profile-grid">
  
          <div className="form-group">
            <label>Professional Headline</label>
  
            <input
              type="text"
              name="headline"
              value={profile.headline || ""}
              onChange={handleChange}
              placeholder="Python Full Stack Developer"
            />
          </div>
  
          <div className="form-group">
            <label>Preferred Role</label>
  
            <input
              type="text"
              name="preferred_role"
              value={profile.preferred_role || ""}
              onChange={handleChange}
              placeholder="Backend Developer"
            />
          </div>
  
          <div className="form-group">
            <label>Preferred Location</label>
  
            <input
              type="text"
              name="preferred_location"
              value={profile.preferred_location || ""}
              onChange={handleChange}
              placeholder="Bangalore"
            />
          </div>
  
          <div className="form-group">
            <label>Years of Experience</label>
  
            <input
              type="number"
              name="years_of_experience"
              value={profile.years_of_experience || 0}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Expected Salary</label>
  
            <input
              type="number"
              name="expected_salary"
              value={profile.expected_salary || ""}
              onChange={handleChange}
              placeholder="1200000"
            />
          </div>
  
          <div className="form-group">
            <label>Education</label>
  
            <input
              type="text"
              name="education"
              value={profile.education || ""}
              onChange={handleChange}
              placeholder="B.Tech Computer Engineering"
            />
          </div>
  
        </div>
  
        <div
          className="form-group"
          style={{ marginTop: "25px" }}
        >
          <label>Skills</label>
  
          <textarea
            rows="4"
            name="skills"
            value={profile.skills || ""}
            onChange={handleChange}
            placeholder="Python, Django, React, PostgreSQL..."
          />
        </div>
  
        <div
          className="form-group"
          style={{ marginTop: "25px" }}
        >
          <label>Experience</label>
  
          <textarea
            rows="5"
            name="experience"
            value={profile.experience || ""}
            onChange={handleChange}
            placeholder="Describe your work experience..."
          />
        </div>
  
        <div
          className="form-group"
          style={{ marginTop: "25px" }}
        >
          <label>Bio</label>
  
          <textarea
            rows="4"
            name="bio"
            value={profile.bio || ""}
            onChange={handleChange}
            placeholder="Tell recruiters about yourself..."
          />
        </div>
  
      </div>
    );
  }