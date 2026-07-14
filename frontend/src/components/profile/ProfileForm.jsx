import { useState } from "react";
import toast from "react-hot-toast";

import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

import { updateProfile } from "../../services/profileService";

const ProfileForm = ({ profile, onProfileUpdated }) => {
  const [formData, setFormData] = useState(profile);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const updated = await updateProfile(formData);

      onProfileUpdated(updated);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mt-4">

      <h2>Edit Profile</h2>

      <div className="grid-2">

        <Input
          label="Phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />

        <Input
          label="Location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
        />

        <Input
          label="Preferred Role"
          name="preferred_role"
          value={formData.preferred_role || ""}
          onChange={handleChange}
        />

        <Input
          label="Preferred Location"
          name="preferred_location"
          value={formData.preferred_location || ""}
          onChange={handleChange}
        />

        <Input
          label="Expected Salary"
          name="expected_salary"
          value={formData.expected_salary || ""}
          onChange={handleChange}
        />

        <Input
          label="Years of Experience"
          name="years_of_experience"
          value={formData.years_of_experience || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mt-3">

        <Textarea
          label="Bio"
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mt-3">

        <Textarea
          label="Skills"
          name="skills"
          value={formData.skills || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mt-3">

        <Textarea
          label="Education"
          name="education"
          value={formData.education || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mt-3">

        <Button
          type="submit"
          variant="primary"
        >
          {loading ? "Saving..." : "Save Profile"}
        </Button>

      </div>

    </form>
  );
};

export default ProfileForm;