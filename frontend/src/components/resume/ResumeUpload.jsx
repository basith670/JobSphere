import { useEffect, useRef, useState } from "react";
import {
  FaFileAlt,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

import {
  createResume,
  updateResume,
} from "../../services/resumeService";

const initialForm = {
  title: "",
  full_name: "",
  email: "",
  phone: "",
  location: "",
  resume_file: null,
  is_default: false,
};

export default function ResumeUpload({
  editingResume,
  onResumeAdded,
  onResumeUpdated,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!editingResume) {
      setFormData(initialForm);
      return;
    }

    setFormData({
      title: editingResume.title || "",
      full_name: editingResume.full_name || "",
      email: editingResume.email || "",
      phone: editingResume.phone || "",
      location: editingResume.location || "",
      resume_file: null,
      is_default: editingResume.is_default || false,
    });
  }, [editingResume]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];

      if (!file) return;

      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        resume_file: file,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      resume_file: file,
    }));
  };

  const removeResume = () => {
    setFormData((prev) => ({
      ...prev,
      resume_file: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "resume_file" && !value && editingResume) {
          return;
        }

        data.append(key, value);
      });

      if (editingResume) {
        await updateResume(editingResume.id, data);

        toast.success("Resume updated successfully!");

        if (onResumeUpdated) {
          await onResumeUpdated();
        }
      } else {
        await createResume(data);

        toast.success("Resume uploaded successfully!");

        if (onResumeAdded) {
          await onResumeAdded();
        }
      }

      setFormData(initialForm);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);

      toast.error(
        editingResume
          ? "Unable to update resume."
          : "Unable to upload resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-card">
      <h2>{editingResume ? "Edit Resume" : "Upload Resume"}</h2>

      <form className="resume-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <FaFileAlt className="input-icon" />
          <input
            type="text"
            name="title"
            placeholder="Resume Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaPhoneAlt className="input-icon" />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt className="input-icon" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="resume-upload full">
          <div
            className={`upload-box ${dragging ? "dragging" : ""} ${
              formData.resume_file ? "uploaded" : ""
            }`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              hidden
              type="file"
              name="resume_file"
              accept=".pdf"
              required={!editingResume}
              onChange={handleChange}
            />

            {!formData.resume_file ? (
              <div className="upload-content">
                <div className="upload-icon">📄</div>

                <h4>Upload Resume</h4>

                <p>Drag & Drop your PDF here</p>

                <span>or click to browse</span>
              </div>
            ) : (
              <div className="upload-content">
                <div className="upload-success">
                  <div className="pdf-icon">📑</div>

                  <div className="file-info">
                    <strong>{formData.resume_file.name}</strong>

                    <small>
                      {(formData.resume_file.size / 1024).toFixed(1)} KB
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>

          {editingResume && !formData.resume_file && (
            <small className="upload-note">
              Leave empty to keep your existing resume.
            </small>
          )}

          {formData.resume_file && (
            <div className="upload-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => fileInputRef.current.click()}
              >
                Change Resume
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={removeResume}
              >
                Remove
              </button>
            </div>
          )}

          <label className="default-check">
            <input
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
            />

            <span>Set as Default Resume</span>
          </label>
        </div>

        <div className="resume-actions full">
          <button
            type="submit"
            className="resume-btn"
            disabled={loading}
          >
            {loading
              ? editingResume
                ? "Updating..."
                : "Uploading..."
              : editingResume
              ? "Update Resume"
              : "Upload Resume"}
          </button>
        </div>
      </form>
    </div>
  );
}