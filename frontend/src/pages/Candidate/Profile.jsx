import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
    uploadProfileImage,
} from "../../services/profileService";

import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/profile/PersonalInfo";
import CareerInfo from "../../components/profile/CareerInfo";
import SocialLinks from "../../components/profile/SocialLinks";

import "./Profile.css";

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [originalProfile, setOriginalProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setProfile(data);
            setOriginalProfile(data);

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

    const handleImageChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            const updated = await uploadProfileImage(file);

            setProfile(updated);

            setOriginalProfile(updated);

            toast.success("Profile photo updated successfully");

        } catch (err) {

            console.error(err);

            toast.error("Failed to upload profile photo");

        }

    };

    const handleSave = async () => {

        try {

            setSaving(true);

            const updated = await updateProfile(profile);

            setProfile(updated);

            setOriginalProfile(updated);

            toast.success("Profile updated successfully");

            return true;

        } catch (err) {

            console.error(err);

            toast.error("Failed to update profile");

            return false;

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

            <ProfileHeader
                profile={profile}
                onImageChange={handleImageChange}
            />

            <PersonalInfo
                profile={profile}
                handleChange={handleChange}
                handleSave={handleSave}
                originalProfile={originalProfile}
                setProfile={setProfile}
            />

            <CareerInfo
                profile={profile}
                handleChange={handleChange}
                handleSave={handleSave}
                originalProfile={originalProfile}
                setProfile={setProfile}
            />

            <SocialLinks
                profile={profile}
                handleChange={handleChange}
                handleSave={handleSave}
                originalProfile={originalProfile}
                setProfile={setProfile}
            />

        </div>

    );

}