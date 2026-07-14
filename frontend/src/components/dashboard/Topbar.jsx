import {
    FaBell,
    FaSearch,
  } from "react-icons/fa";
  
  import useAuth from "../../hooks/useAuth";
  
  import "./Topbar.css";
  
  export default function Topbar() {
    const { user } = useAuth();
  
    return (
      <header className="topbar">
  
        <div>
  
          <h2>
            Welcome Back,
            {" "}
            {user?.first_name || user?.username} 👋
          </h2>
  
          <p>
            Ready to move one step closer to your next opportunity?
          </p>
  
        </div>
  
        <div className="topbar-actions">
  
          <div className="search-box">
  
            <FaSearch />
  
            <input
              type="text"
              placeholder="Search..."
            />
  
          </div>
  
          <button className="notification-btn">
  
            <FaBell />
  
            <span className="notification-badge">
              3
            </span>
  
          </button>
  
          <div className="topbar-profile">
  
            <div className="topbar-avatar">
              {user?.first_name?.charAt(0) ||
                user?.username?.charAt(0) ||
                "U"}
            </div>
  
            <div>
  
              <strong>
                {user?.first_name || user?.username}
              </strong>
  
              <p>
                Job Seeker
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      </header>
    );
  }