import { FaBriefcase } from "react-icons/fa";

export default function ProfessionalForm({
    formData,
    handleChange,
    handleSubmit,
    onCancel,
    saving,
}) {

    return (

        <section className="recruiter-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">
                    <FaBriefcase />
                </div>

                <div>
                    <h3>Edit Professional Information</h3>
                    <p>Update your professional profile and career preferences.</p>
                </div>

            </div>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                <div className="settings-grid">

                    <div className="form-group">

                        <label>Preferred Role</label>

                        <input
                            type="text"
                            name="preferred_role"
                            value={formData.preferred_role}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Preferred Location</label>

                        <input
                            type="text"
                            name="preferred_location"
                            value={formData.preferred_location}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Years of Experience</label>

                        <input
                            type="number"
                            name="years_of_experience"
                            value={formData.years_of_experience}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Expected Salary</label>

                        <input
                            type="text"
                            name="expected_salary"
                            value={formData.expected_salary}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Skills</label>

                    <textarea
                        rows="4"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Experience</label>

                    <textarea
                        rows="4"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Education</label>

                    <textarea
                        rows="4"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                    />

                </div>

                <div className="settings-grid">

                    <div className="form-group">

                        <label>LinkedIn</label>

                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>GitHub</label>

                        <input
                            type="url"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Portfolio</label>

                    <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
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