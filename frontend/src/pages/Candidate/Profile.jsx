import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getProfile, updateProfile } from "../../services/profileService";

import PersonalInfo from "../../components/profile/PersonalInfo";
import CareerInfo from "../../components/profile/CareerInfo";
import SocialLinks from "../../components/profile/SocialLinks";
import ProfileActions from "../../components/profile/ProfileActions";

import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] =useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updated = await updateProfile(profile);

      setProfile(updated);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);

      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div className="profile-page">

      <div className="page-header">
        <h1>My Profile</h1>

        <p>
          Manage your personal and professional information.
        </p>
      </div>

      <PersonalInfo
        profile={profile}
        handleChange={handleChange}
      />

      <CareerInfo
        profile={profile}
        handleChange={handleChange}
      />

      <SocialLinks
        profile={profile}
        handleChange={handleChange}
      />

      <ProfileActions
        saving={saving}
        onSave={handleSave}
      />

    </div>
  );
}