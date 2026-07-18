import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import PasswordInput from "../../components/auth/PasswordInput";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { registerUser } from "../../services/authService";

import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {

      const message = "Passwords do not match.";

      setError(message);
      toast.error(message);

      return;
    }

    try {

      setLoading(true);

      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword,
        role: formData.role,
      });

      toast.success("🎉 Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {

      console.error(err);

      let message = "Registration failed. Please try again.";

      if (
        err.response &&
        err.response.data &&
        typeof err.response.data === "object"
      ) {

        const firstKey = Object.keys(err.response.data)[0];

        const firstError = err.response.data[firstKey];

        if (Array.isArray(firstError)) {
          message = firstError[0];
        } else {
          message = firstError;
        }

      }

      setError(message);

      toast.error(message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout
      title="Create Account"
      subtitle="Join thousands of candidates and recruiters."
    >

      <AuthCard>

        <form onSubmit={handleSubmit}>

          <div>

            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          <div>

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div>

            <label>Password</label>

            <PasswordInput
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Confirm Password</label>

            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Account Type</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="jobseeker">
                Job Seeker
              </option>

              <option value="recruiter">
                Recruiter
              </option>

            </select>

          </div>

          {error && (

            <div
              style={{
                background: "#FEF2F2",
                color: "#DC2626",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #FECACA",
                fontSize: "14px",
              }}
            >
              {error}
            </div>

          )}

          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        <div className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </AuthCard>

    </AuthLayout>

  );

}