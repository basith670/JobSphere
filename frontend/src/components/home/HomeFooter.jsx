import "./HomeFooter.css";
import { Link } from "react-router-dom";

import {
  BriefcaseBusiness,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function HomeFooter() {
  const year = new Date().getFullYear();

  return (
<footer className="home-footer">

<div className="container">

  <div className="home-footer-container">

        {/* Company */}

        <div className="home-footer-column">

          <div className="home-footer-logo">
            <BriefcaseBusiness size={28} />
            <span>JobSphere</span>
          </div>

          <p className="home-footer-description">
            AI-powered recruitment platform helping candidates
            find dream jobs and recruiters hire exceptional talent.
          </p>

          <div className="home-footer-social">

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter size={20} />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="home-footer-column">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/login">Login</Link>

        </div>

        {/* Platform */}

        <div className="home-footer-column">

          <h3>Platform</h3>

          <Link to="/register">Register</Link>
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/login">Candidate Portal</Link>

        </div>

        {/* Contact */}

        <div className="home-footer-column">

          <h3>Contact</h3>

          <div className="home-footer-contact">
            <Mail size={18} />
            support@jobsphere.ai
          </div>

          <div className="home-footer-contact">
            <Phone size={18} />
            +91 98765 43210
          </div>

          <div className="home-footer-contact">
            <MapPin size={18} />
            Bengaluru, India
          </div>

        </div>

        </div>

    <div className="home-footer-bottom">
        <p>
          © {year} JobSphere. All Rights Reserved.
        </p>
        </div>

      </div>

      </footer>
  );
}