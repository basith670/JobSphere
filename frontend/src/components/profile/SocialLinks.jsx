import { useState } from "react";
import {
    FaEdit,
    FaSave,
    FaTimes,
    FaLinkedin,
    FaGithub,
    FaGlobe,
    FaExternalLinkAlt,
} from "react-icons/fa";

export default function SocialLinks({
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

                    <h2>Social Links</h2>

                    <p>
                        Add your professional online presence.
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

                            <span>LinkedIn</span>

                            {

                                profile.linkedin ? (

                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="profile-link"
                                    >

                                        <FaLinkedin />

                                        Visit LinkedIn

                                        <FaExternalLinkAlt size={12} />

                                    </a>

                                ) : (

                                    <h5>-</h5>

                                )

                            }

                        </div>

                        <div>

                            <span>GitHub</span>

                            {

                                profile.github ? (

                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="profile-link"
                                    >

                                        <FaGithub />

                                        Visit GitHub

                                        <FaExternalLinkAlt size={12} />

                                    </a>

                                ) : (

                                    <h5>-</h5>

                                )

                            }

                        </div>

                        <div style={{ gridColumn: "1 / -1" }}>

                            <span>Portfolio</span>

                            {

                                profile.portfolio ? (

                                    <a
                                        href={profile.portfolio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="profile-link"
                                    >

                                        <FaGlobe />

                                        Visit Portfolio

                                        <FaExternalLinkAlt size={12} />

                                    </a>

                                ) : (

                                    <h5>-</h5>

                                )

                            }

                        </div>

                    </div>

                ) : (

                    <div className="profile-grid">

                        <div className="form-group">

                            <label>LinkedIn</label>

                            <input
                                type="url"
                                name="linkedin"
                                value={profile.linkedin || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>GitHub</label>

                            <input
                                type="url"
                                name="github"
                                value={profile.github || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Portfolio</label>

                            <input
                                type="url"
                                name="portfolio"
                                value={profile.portfolio || ""}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                )

            }

        </section>

    );

}