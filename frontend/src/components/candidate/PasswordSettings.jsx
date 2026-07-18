import { useState } from "react";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import { changePassword } from "../../services/settingsService";

export default function PasswordSettings() {

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({

        current_password: "",
        new_password: "",
        confirm_password: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.current_password ||
            !formData.new_password ||
            !formData.confirm_password
        ) {

            toast.error("Please fill all fields.");

            return;

        }

        if (formData.new_password !== formData.confirm_password) {

            toast.error("Passwords do not match.");

            return;

        }

        if (formData.new_password.length < 8) {

            toast.error("Password must be at least 8 characters.");

            return;

        }

        setSaving(true);

        try {

            await changePassword({

                current_password: formData.current_password,
                new_password: formData.new_password,

            });

            toast.success("Password updated successfully!");

            setFormData({

                current_password: "",
                new_password: "",
                confirm_password: "",

            });

        } catch (error) {

            const message =
                error.response?.data?.current_password?.[0] ||
                error.response?.data?.new_password?.[0] ||
                error.response?.data?.detail ||
                "Unable to update password.";

            toast.error(message);

        } finally {

            setSaving(false);

        }

    };

    return (

        <section className="candidate-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">

                    <FaLock />

                </div>

                <div>

                    <h3>Change Password</h3>

                    <p>
                        Keep your account secure by updating your password.
                    </p>

                </div>

            </div>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                <div className="settings-grid">

                    <div className="form-group">

                        <label>Current Password</label>

                        <input
                            type="password"
                            name="current_password"
                            value={formData.current_password}
                            onChange={handleChange}
                            placeholder="Enter current password"
                        />

                    </div>

                    <div className="form-group">

                        <label>New Password</label>

                        <input
                            type="password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                        />

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                        />

                    </div>

                </div>

                <div className="settings-actions">

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={saving}
                    >

                        {saving
                            ? "Updating..."
                            : "Update Password"}

                    </button>

                </div>

            </form>

        </section>

    );

}