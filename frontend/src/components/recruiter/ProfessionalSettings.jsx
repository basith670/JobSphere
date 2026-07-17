import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
} from "../../services/settingsService";

import ProfessionalView from "./ProfessionalView";
import ProfessionalForm from "./ProfessionalForm";

export default function ProfessionalSettings() {

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({

        preferred_role: "",
        preferred_location: "",
        years_of_experience: "",
        expected_salary: "",
        skills: "",
        experience: "",
        education: "",
        linkedin: "",
        github: "",
        portfolio: "",

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setFormData({

                preferred_role: data.preferred_role || "",
                preferred_location: data.preferred_location || "",
                years_of_experience: data.years_of_experience || "",
                expected_salary: data.expected_salary || "",
                skills: data.skills || "",
                experience: data.experience || "",
                education: data.education || "",
                linkedin: data.linkedin || "",
                github: data.github || "",
                portfolio: data.portfolio || "",

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            await updateProfile(formData);

            toast.success("Professional information updated!");

            setIsEditing(false);

        } catch (error) {

            console.error(error);

            toast.error("Unable to update profile.");

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <section className="recruiter-card settings-card">

                <h4>Loading...</h4>

            </section>

        );

    }

    return isEditing ? (

        <ProfessionalForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onCancel={() => setIsEditing(false)}
            saving={saving}
        />

    ) : (

        <ProfessionalView
            profile={formData}
            onEdit={() => setIsEditing(true)}
        />

    );

}