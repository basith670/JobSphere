import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function PersonalInfo({
    profile,
    handleChange,
    handleSave,
    originalProfile,
    setProfile,
}) {

    const [editing, setEditing] = useState(false);

    const handleCancel = () => {

        setProfile({ ...originalProfile });

        setEditing(false);

    };

    return (

        <section className="profile-card">

            <div className="profile-card-header">

                <div>

                    <h2>Personal Information</h2>

                    <p>
                        Basic information about your account.
                    </p>

                </div>

                {

                    !editing ? (

                        <button
                            type="button"
                            className="edit-btn"
                            onClick={() => setEditing(true)}
                        >

                            <FaEdit />

                            Edit

                        </button>

                    ) : (

                        <div className="profile-action-buttons">

                            <button
                                type="button"
                                className="save-btn"
                                onClick={async () => {

                                    const success = await handleSave();

                                    if (success) {

                                        setEditing(false);

                                    }

                                }}
                            >

                                <FaSave />

                                Save

                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={handleCancel}
                            >

                                <FaTimes />

                                Cancel

                            </button>

                        </div>

                    )

                }

            </div>

            {

                !editing ? (

                    <div className="profile-view-grid">

                        <div>

                            <span>First Name</span>

                            <h5>{profile.first_name || "-"}</h5>

                        </div>

                        <div>

                            <span>Last Name</span>

                            <h5>{profile.last_name || "-"}</h5>

                        </div>

                        <div>

                            <span>Email</span>

                            <h5>{profile.email}</h5>

                        </div>

                        <div>

                            <span>Phone</span>

                            <h5>{profile.phone || "-"}</h5>

                        </div>

                        <div>

                            <span>Location</span>

                            <h5>{profile.location || "-"}</h5>

                        </div>

                    </div>

                ) : (

                    <div className="profile-grid">

                        <div className="form-group">

                            <label>First Name</label>

                            <input
                                type="text"
                                name="first_name"
                                value={profile.first_name || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                type="text"
                                name="last_name"
                                value={profile.last_name || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                value={profile.email}
                                disabled
                            />

                        </div>

                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={profile.phone || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={profile.location || ""}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                )

            }

        </section>

    );

}