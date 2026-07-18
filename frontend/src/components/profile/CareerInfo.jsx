import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function CareerInfo({
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

                    <h2>Professional Information</h2>

                    <p>
                        Showcase your professional background to recruiters.
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

                            <span>Professional Headline</span>

                            <h5>{profile.headline || "-"}</h5>

                        </div>

                        <div>

                            <span>Preferred Role</span>

                            <h5>{profile.preferred_role || "-"}</h5>

                        </div>

                        <div>

                            <span>Preferred Location</span>

                            <h5>{profile.preferred_location || "-"}</h5>

                        </div>

                        <div>

                            <span>Years of Experience</span>

                            <h5>{profile.years_of_experience || 0} Years</h5>

                        </div>

                        <div>

                            <span>Expected Salary</span>

                            <h5>

                                {

                                    profile.expected_salary
                                        ? `₹${Number(profile.expected_salary).toLocaleString()}`
                                        : "-"

                                }

                            </h5>

                        </div>

                        <div>

                            <span>Education</span>

                            <h5>{profile.education || "-"}</h5>

                        </div>

                        <div style={{ gridColumn: "1 / -1" }}>

                            <span>Skills</span>

                            <h5>{profile.skills || "-"}</h5>

                        </div>

                        <div style={{ gridColumn: "1 / -1" }}>

                            <span>Experience</span>

                            <h5>{profile.experience || "-"}</h5>

                        </div>

                        <div style={{ gridColumn: "1 / -1" }}>

                            <span>Bio</span>

                            <h5>{profile.bio || "-"}</h5>

                        </div>

                    </div>

                ) : (

                    <>

                        <div className="profile-grid">

                            <div className="form-group">

                                <label>Professional Headline</label>

                                <input
                                    type="text"
                                    name="headline"
                                    value={profile.headline || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Preferred Role</label>

                                <input
                                    type="text"
                                    name="preferred_role"
                                    value={profile.preferred_role || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Preferred Location</label>

                                <input
                                    type="text"
                                    name="preferred_location"
                                    value={profile.preferred_location || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Years of Experience</label>

                                <input
                                    type="number"
                                    name="years_of_experience"
                                    value={profile.years_of_experience || 0}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Expected Salary</label>

                                <input
                                    type="number"
                                    name="expected_salary"
                                    value={profile.expected_salary || ""}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Education</label>

                                <input
                                    type="text"
                                    name="education"
                                    value={profile.education || ""}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div
                            className="form-group"
                            style={{ marginTop: 25 }}
                        >

                            <label>Skills</label>

                            <textarea
                                rows="4"
                                name="skills"
                                value={profile.skills || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div
                            className="form-group"
                            style={{ marginTop: 25 }}
                        >

                            <label>Experience</label>

                            <textarea
                                rows="5"
                                name="experience"
                                value={profile.experience || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div
                            className="form-group"
                            style={{ marginTop: 25 }}
                        >

                            <label>Bio</label>

                            <textarea
                                rows="4"
                                name="bio"
                                value={profile.bio || ""}
                                onChange={handleChange}
                            />

                        </div>

                    </>

                )

            }

        </section>

    );

}