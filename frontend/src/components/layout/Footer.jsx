import "./Footer.css";

import {
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <BriefcaseBusiness size={22} />
            <span>JobSphere</span>
          </div>

          <p>
            AI-powered recruitment platform connecting talented professionals
            with leading companies through intelligent hiring solutions.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Platform</h4>

            <a href="#">Jobs</a>
            <a href="#">Companies</a>
            <a href="#">Candidates</a>
            <a href="#">Recruiters</a>
          </div>

          <div>
            <h4>Resources</h4>

            <a href="#">Resume Builder</a>
            <a href="#">Interview Prep</a>
            <a href="#">Career Advice</a>
            <a href="#">Help Center</a>
          </div>

          <div>
            <h4>Connect</h4>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={16} />
              <span>LinkedIn</span>
            </a>

            <a href="mailto:contact@jobsphere.com">
              <Mail size={16} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 JobSphere. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;