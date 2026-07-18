import "./../../pages/Auth/Auth.css";

export default function AuthLayout({
  children,
  title,
  subtitle,
}) {
  return (
    <div className="auth-page">

      {/* Background */}
      <div className="auth-bg">
        <div className="blur blur-one"></div>
        <div className="blur blur-two"></div>
      </div>

      {/* Logo */}
      <div className="auth-logo">

        <div className="logo-icon">
          JS
        </div>

        <div>
          <h2>JobSphere</h2>
          <span>AI Recruitment Platform</span>
        </div>

      </div>

      {/* Center Content */}
      <div className="auth-center">

        <div className="auth-container">

          <h1>{title}</h1>

          <p>{subtitle}</p>

          {children}

        </div>

      </div>

      {/* Footer */}
      <div className="auth-footer-text">
        Trusted by <strong>25,000+</strong> job seekers worldwide
      </div>

    </div>
  );
}