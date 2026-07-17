import { useState } from "react";
import { toast } from "react-toastify";

import {
  FaBuilding,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIndustry,
  FaUsers,
  FaCalendarAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaCamera,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import { updateMyCompany } from "../../services/companyService";

const CompanyEditForm = ({
  company,
  onCancel,
  onSuccess,
}) => {
  const [formData, setFormData] = useState(company);

  const [logoPreview, setLogoPreview] = useState(
    company.logo || ""
  );

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      logo: file,
    });

    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {

        const value = formData[key];
      
        if (
          value === null ||
          value === undefined ||
          value === ""
        ) {
          return;
        }
      
        // Existing logo URL should not be re-uploaded
        if (key === "logo" && typeof value === "string") {
          return;
        }
      
        data.append(key, value);
      
      });

      await updateMyCompany(data);

      toast.success("Company updated successfully.");

      onSuccess();
    } catch {
      toast.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      className="company-form"
      onSubmit={handleSubmit}
    >

      <div className="logo-card">

        <div className="logo-wrapper">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Company"
            />
          ) : (
            <FaBuilding className="default-logo" />
          )}
        </div>

        <label className="upload-btn">
          <FaCamera />
          Upload Logo

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleLogoChange}
          />
        </label>

      </div>

      <div className="company-grid">

        <div className="form-group">
          <label>
            <FaBuilding /> Company Name
          </label>

          <input
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaIndustry /> Industry
          </label>

          <input
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaGlobe /> Website
          </label>

          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaUsers /> Company Size
          </label>

          <input
            name="company_size"
            value={formData.company_size}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaEnvelope /> Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaPhone /> Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaMapMarkerAlt /> Location
          </label>

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaCalendarAlt /> Founded Year
          </label>

          <input
            type="number"
            name="founded_year"
            value={formData.founded_year || ""}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="form-group">

        <label>About Company</label>

        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

      </div>

      <div className="company-grid">

        <div className="form-group">
          <label>
            <FaLinkedin /> LinkedIn
          </label>

          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaTwitter /> Twitter
          </label>

          <input
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FaFacebook /> Facebook
          </label>

          <input
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="company-action-buttons">

        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          <FaTimes />
          Cancel
        </button>

        <button
          className="save-btn"
          disabled={saving}
        >
          <FaSave />

          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </form>
  );
};

export default CompanyEditForm;