import { FaUserCircle, FaCamera } from "react-icons/fa";

export default function PersonalForm({
    formData,
    handleChange,
    handleImageChange,
    handleSubmit,
    onCancel,
    saving,
}) {

    return (

        <section className="recruiter-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">
                    <FaUserCircle />
                </div>

                <div>
                    <h3>Edit Personal Information</h3>
                    <p>Update your personal details.</p>
                </div>

            </div>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                {/* ================= Profile Picture ================= */}

                                <div className="profile-photo-wrapper">

                    {formData.profile_image ? (

                        <img
                            src={formData.profile_image}
                            alt="Profile"
                            className="profile-photo"
                        />

                    ) : (

                        <div className="profile-photo-placeholder">

                            <FaUserCircle />

                        </div>

                    )}

                    <h3>
                        {formData.first_name} {formData.last_name}
                    </h3>

                    <label className="upload-photo-btn">

                        <FaCamera />

                        Change Photo

                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                    </label>

                </div>

                {/* ================= Personal Fields ================= */}

                <div className="settings-grid">

                    <div className="form-group">

                        <label>First Name</label>

                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                        />

                    </div>

                    <div className="form-group">

                        <label>Last Name</label>

                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />

                    </div>

                    <div className="form-group">

                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                        />

                    </div>

                    <div className="form-group">

                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Headline</label>

                    <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleChange}
                        placeholder="Senior Python Developer"
                    />

                </div>

                <div className="form-group">

                    <label>Bio</label>

                    <textarea
                        rows="5"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                    />

                </div>

                <div className="settings-actions">

                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </form>

        </section>

    );

}