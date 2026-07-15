export default function SocialLinks({
    profile,
    handleChange,
  }) {
    return (
      <div className="profile-card">
  
        <h2>Social Links</h2>
  
        <div className="profile-grid">
  
          <div className="form-group">
            <label>LinkedIn</label>
  
            <input
              type="url"
              name="linkedin"
              value={profile.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
  
          <div className="form-group">
            <label>GitHub</label>
  
            <input
              type="url"
              name="github"
              value={profile.github || ""}
              onChange={handleChange}
              placeholder="https://github.com/yourusername"
            />
          </div>
  
          <div className="form-group">
            <label>Portfolio</label>
  
            <input
              type="url"
              name="portfolio"
              value={profile.portfolio || ""}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
            />
          </div>
  
        </div>
  
      </div>
    );
  }