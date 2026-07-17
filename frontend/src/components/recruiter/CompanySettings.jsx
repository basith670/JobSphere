import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getCompany,
    updateCompany,
} from "../../services/settingsService";

import CompanyView from "./CompanyView";
import CompanyForm from "./CompanyForm";

export default function CompanySettings() {

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({

        company_name: "",
        logo: null,
        website: "",
        email: "",
        phone: "",
        location: "",
        industry: "",
        company_size: "",
        founded_year: "",
        description: "",
        linkedin: "",
        twitter: "",
        facebook: "",
        is_verified: false,

    });

    useEffect(() => {

        loadCompany();

    }, []);

    const loadCompany = async () => {

        try {

            const data = await getCompany();

            setFormData({

                company_name: data.company_name || "",
                logo: data.logo || null,
                website: data.website || "",
                email: data.email || "",
                phone: data.phone || "",
                location: data.location || "",
                industry: data.industry || "",
                company_size: data.company_size || "",
                founded_year: data.founded_year || "",
                description: data.description || "",
                linkedin: data.linkedin || "",
                twitter: data.twitter || "",
                facebook: data.facebook || "",
                is_verified: data.is_verified,

            });

        } catch (error) {

            console.error(error);

            toast.error("Failed to load company.");

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

    const handleLogoChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({

            ...formData,

            logo: file,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const payload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {

                // Upload logo only if user selected a new file
                if (key === "logo") {

                    if (value instanceof File) {

                        payload.append("logo", value);

                    }

                }

                // Skip read-only field
                else if (key !== "is_verified") {

                    payload.append(key, value ?? "");

                }

            });

            const updatedCompany = await updateCompany(payload);

            setFormData({

                company_name: updatedCompany.company_name || "",
                logo: updatedCompany.logo || null,
                website: updatedCompany.website || "",
                email: updatedCompany.email || "",
                phone: updatedCompany.phone || "",
                location: updatedCompany.location || "",
                industry: updatedCompany.industry || "",
                company_size: updatedCompany.company_size || "",
                founded_year: updatedCompany.founded_year || "",
                description: updatedCompany.description || "",
                linkedin: updatedCompany.linkedin || "",
                twitter: updatedCompany.twitter || "",
                facebook: updatedCompany.facebook || "",
                is_verified: updatedCompany.is_verified,

            });

            toast.success("Company updated successfully!");

            setIsEditing(false);

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                "Unable to update company.";

            toast.error(message);

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <section className="recruiter-card settings-card">

                Loading company...

            </section>

        );

    }

    return isEditing ? (

        <CompanyForm
            formData={formData}
            handleChange={handleChange}
            handleLogoChange={handleLogoChange}
            handleSubmit={handleSubmit}
            onCancel={() => setIsEditing(false)}
            saving={saving}
        />

    ) : (

        <CompanyView
            company={formData}
            onEdit={() => setIsEditing(true)}
        />

    );

}