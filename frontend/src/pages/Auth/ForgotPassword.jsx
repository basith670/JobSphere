import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";

import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      await forgotPassword(email);
  
      setSent(true);
  
      toast.success("Password reset link sent.");
    } catch (error) {
      console.error(error);
  
      toast.error("Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email address and we'll send you a password reset link."
    >
      <AuthCard>

        <Link
          to="/login"
          className="auth-home-link"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

        {!sent ? (
          <form onSubmit={handleSubmit}>

            <div>

              <label>Email Address</label>

              <div className="auth-input-icon">

                <Mail size={18} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            <button
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

          </form>
        ) : (
          <div className="auth-success">

            <Mail size={48} />

            <h3>Check Your Email</h3>

            <p>
              If an account exists with this email,
              we've sent a password reset link.
            </p>

            <Link
              to="/login"
              className="auth-btn auth-link-btn"
            >
              Back to Login
            </Link>

          </div>
        )}

      </AuthCard>
    </AuthLayout>
  );
}