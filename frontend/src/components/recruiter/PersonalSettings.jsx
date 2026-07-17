import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
} from "../../services/settingsService";

import PersonalView from "./PersonalView";
import PersonalForm from "./PersonalForm";

export default function PersonalSettings() {

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({

        first_name: "",
        last_name: "",
        phone: "",
        location: "",
        headline: "",
        bio: "",

        profile_image: "",
        imageFile: null,

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            // ================= DEBUG =================

            console.log("========== PROFILE API ==========");
            console.log(data);
            console.log("Profile Image:", data.profile_image);
            console.log("=================================");

            // =========================================

            setFormData({

                first_name: data.first_name || "",
                last_name: data.last_name || "",
                phone: data.phone || "",
                location: data.location || "",
                headline: data.headline || "",
                bio: data.bio || "",

                profile_image: data.profile_image || "",
                imageFile: null,

            });

        } catch (error) {

            console.error(error);

            toast.error("Failed to load profile.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({

            ...formData,

            profile_image: URL.createObjectURL(file),

            imageFile: file,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const data = new FormData();

            data.append("first_name", formData.first_name);
            data.append("last_name", formData.last_name);
            data.append("phone", formData.phone);
            data.append("location", formData.location);
            data.append("headline", formData.headline);
            data.append("bio", formData.bio);

            if (formData.imageFile) {

                data.append(
                    "profile_image",
                    formData.imageFile
                );

            }

            await updateProfile(data);

            toast.success(
                "Profile updated successfully!"
            );

            await loadProfile();

            setIsEditing(false);

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to update profile."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <section className="recruiter-card settings-card">

                Loading...

            </section>

        );

    }

    return isEditing ? (

        <PersonalForm

            formData={formData}

            handleChange={handleChange}

            handleImageChange={handleImageChange}

            handleSubmit={handleSubmit}

            onCancel={() => setIsEditing(false)}

            saving={saving}

        />

    ) : (

        <PersonalView

            profile={formData}

            onEdit={() => setIsEditing(true)}

        />

    );

}