import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import useUser from "../../context/UserContext";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import PasswordInput from "../../components/auth/PasswordInput";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { refreshUser } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);

      login(data.user);
      await refreshUser();

      toast.success(`Welcome back, ${data.user.username}!`);

      setTimeout(() => {
        if (data.user.role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      console.error(err);

      let message = "Invalid username or password.";

      if (err.response && err.response.data) {
        if (err.response.data.detail) {
          message = err.response.data.detail;
        } else if (err.response.data.non_field_errors) {
          message = Array.isArray(err.response.data.non_field_errors)
            ? err.response.data.non_field_errors[0]
            : err.response.data.non_field_errors;
        } else {
          const firstKey = Object.keys(err.response.data)[0];
          const firstError = err.response.data[firstKey];

          message = Array.isArray(firstError)
            ? firstError[0]
            : firstError;
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
      title="Welcome Back 👋"
      subtitle="Sign in to continue your JobSphere journey."
    >
      <AuthCard>

        <Link to="/" className="auth-home-link">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>

            <PasswordInput
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
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
                marginTop: "16px",
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
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </div>

      </AuthCard>
    </AuthLayout>
  );
};

export default Login;