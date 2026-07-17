import { FaBuilding } from "react-icons/fa";

export default function CompanyForm({
    formData,
    handleChange,
    handleLogoChange,
    handleSubmit,
    onCancel,
    saving,
}) {

    return (

        <section className="recruiter-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">
                    <FaBuilding />
                </div>

                <div>
                    <h3>Edit Company Information</h3>
                    <p>Update your company profile.</p>
                </div>

            </div>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                {/* Logo */}

                <div className="company-logo-upload">

                    {

                        formData.logo ?

                            <img
                                src={
                                    typeof formData.logo === "string"
                                        ? formData.logo
                                        : URL.createObjectURL(formData.logo)
                                }
                                alt="Company Logo"
                                className="company-logo-preview"
                            />

                            :

                            <div className="company-logo-placeholder">

                                {formData.company_name?.charAt(0) || "C"}

                            </div>

                    }

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                    />

                </div>

                <div className="settings-grid">

                    <div className="form-group">

                        <label>Company Name</label>

                        <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Website</label>

                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Industry</label>

                        <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Company Size</label>

                        <input
                            type="text"
                            name="company_size"
                            value={formData.company_size}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Founded Year</label>

                        <input
                            type="number"
                            name="founded_year"
                            value={formData.founded_year}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        rows="5"
                        name="description"
                        value={formData.description}
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

                        <label>Twitter</label>

                        <input
                            type="url"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Facebook</label>

                    <input
                        type="url"
                        name="facebook"
                        value={formData.facebook}
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