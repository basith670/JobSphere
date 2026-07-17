import {
    FaBuilding,
    FaEdit,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";

export default function CompanyView({ company, onEdit }) {

    return (

        <section className="recruiter-card settings-card">

            <div className="settings-section-header">

                <div className="settings-icon">
                    <FaBuilding />
                </div>

                <div>

                    <h3>Company Information</h3>

                    <p>
                        Manage your company profile.
                    </p>

                </div>

            </div>

            <div className="company-logo-section">

                {

                    company.logo ?

                        <img
                            src={company.logo}
                            alt="Company Logo"
                            className="company-logo-preview"
                        />

                        :

                        <div className="company-logo-placeholder">

                            {company.company_name?.charAt(0) || "C"}

                        </div>

                }

                <div>

                    <h4>

                        {company.company_name || "-"}

                    </h4>

                    <div className="verification-status">

                        {

                            company.is_verified ?

                                <>

                                    <FaCheckCircle />

                                    Verified Company

                                </>

                                :

                                <>

                                    <FaClock />

                                    Verification Pending

                                </>

                        }

                    </div>

                </div>

            </div>

            <div className="profile-details-grid">

                <div className="detail-card">

                    <label>Website</label>

                    <p>{company.website || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Email</label>

                    <p>{company.email || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Phone</label>

                    <p>{company.phone || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Location</label>

                    <p>{company.location || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Industry</label>

                    <p>{company.industry || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Company Size</label>

                    <p>{company.company_size || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Founded</label>

                    <p>{company.founded_year || "-"}</p>

                </div>

                <div className="detail-card full-width">

                    <label>Description</label>

                    <p>{company.description || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>LinkedIn</label>

                    <p>{company.linkedin || "-"}</p>

                </div>

                <div className="detail-card">

                    <label>Twitter</label>

                    <p>{company.twitter || "-"}</p>

                </div>

                <div className="detail-card full-width">

                    <label>Facebook</label>

                    <p>{company.facebook || "-"}</p>

                </div>

            </div>

            <div className="settings-actions">

                <button
                    className="primary-btn"
                    onClick={onEdit}
                >

                    <FaEdit />

                    Edit

                </button>

            </div>

        </section>

    );

}