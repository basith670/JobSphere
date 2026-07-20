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

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const data = await loginUser(formData);

      login(data.user);

      await refreshUser();

      toast.success(
        `Welcome back, ${data.user.username}!`
      );

      setTimeout(() => {

        if (data.user.role === "recruiter") {

          navigate("/recruiter/dashboard");

        } else {

          navigate("/dashboard");

        }

      }, 1000);

    } catch (err) {

      console.error(err);

      if (!err.response) {

        toast.error(
          "Unable to connect to the server."
        );

      } else {

        toast.error(
          "Invalid username or password."
        );

      }

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

        <Link
          to="/"
          className="auth-home-link"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <form onSubmit={handleSubmit}>

          <div>

            <label>
              Username
            </label>

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

            <label>
              Password
            </label>

            <PasswordInput
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="forgot-password">

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

          </div>

          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Signing In..."
              : "Login"}

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