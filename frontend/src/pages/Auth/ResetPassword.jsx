import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import PasswordInput from "../../components/auth/PasswordInput";

import api from "../../api/api";

export default function ResetPassword() {

  const { uid, token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirm_password) {

      const message = "Passwords do not match.";

      setError(message);

      toast.error(message);

      return;

    }

    try {

      setLoading(true);

      const response = await api.post(
        "/accounts/reset-password/",
        {
          uid,
          token,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }
      );

      toast.success(response.data.message);

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (err) {

      console.error(err);

      const message =
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Unable to reset password.";

      setError(message);

      toast.error(message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout
      title="Reset Password"
      subtitle="Choose a new password for your account."
    >

      <AuthCard>

        <Link
          to="/login"
          className="auth-home-link"
        >
          <ArrowLeft size={18}/>
          Back to Login
        </Link>

        <form onSubmit={handleSubmit}>

          <div>

            <label>New Password</label>

            <PasswordInput
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>Confirm Password</label>

            <PasswordInput
              name="confirm_password"
              placeholder="Confirm new password"
              value={formData.confirm_password}
              onChange={handleChange}
            />

          </div>

          {error && (

            <div
              style={{
                background:"#FEF2F2",
                color:"#DC2626",
                padding:"12px",
                borderRadius:"10px",
                border:"1px solid #FECACA",
                fontSize:"14px",
              }}
            >
              {error}
            </div>

          )}

          <button
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Updating Password..."
              : "Reset Password"}
          </button>

        </form>

      </AuthCard>

    </AuthLayout>

  );

}