import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
} from "../../services/settingsService";

export default function NotificationSettings() {

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({

        email_new_applicant: true,
        email_job_expiry: true,
        email_weekly_report: true,
        email_marketing: false,

    });

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const data = await getProfile();

            setFormData({

                email_new_applicant:
                    data.email_new_applicant,

                email_job_expiry:
                    data.email_job_expiry,

                email_weekly_report:
                    data.email_weekly_report,

                email_marketing:
                    data.email_marketing,

            });

        } catch {

            toast.error(
                "Unable to load notification settings."
            );

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.checked,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            await updateProfile(formData);

            toast.success(
                "Notification settings updated."
            );

        } catch {

            toast.error(
                "Unable to save settings."
            );

        } finally {

            setSaving(false);

        }

    };

    return (

        <section className="candidate-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">

                    <FaBell />

                </div>

                <div>

                    <h3>Email Notifications</h3>

                    <p>
                        Choose which emails you'd like to receive.
                    </p>

                </div>

            </div>

            <form onSubmit={handleSubmit}>

                <div className="notification-settings">

                    {/* Application Updates */}

                    <div className="notification-row">

                        <div>

                            <h5>Application Updates</h5>

                            <p>
                                Receive updates whenever your application status changes.
                            </p>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                name="email_new_applicant"
                                checked={formData.email_new_applicant}
                                onChange={handleChange}
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    {/* Interview Invitations */}

                    <div className="notification-row">

                        <div>

                            <h5>Interview Invitations</h5>

                            <p>
                                Get notified when a recruiter schedules an interview.
                            </p>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                name="email_job_expiry"
                                checked={formData.email_job_expiry}
                                onChange={handleChange}
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    {/* Job Recommendations */}

                    <div className="notification-row">

                        <div>

                            <h5>Recommended Jobs</h5>

                            <p>
                                Receive personalized job recommendations based on your profile.
                            </p>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                name="email_weekly_report"
                                checked={formData.email_weekly_report}
                                onChange={handleChange}
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    {/* Marketing */}

                    <div className="notification-row">

                        <div>

                            <h5>Marketing Emails</h5>

                            <p>
                                Receive product updates, tips and feature announcements.
                            </p>

                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                name="email_marketing"
                                checked={formData.email_marketing}
                                onChange={handleChange}
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                </div>

                <div className="settings-actions">

                    <button
                        className="primary-btn"
                        disabled={saving}
                    >

                        {
                            saving
                                ? "Saving..."
                                : "Save Changes"
                        }

                    </button>

                </div>

            </form>

        </section>

    );

}