import api from "../api/api";

// ======================================
// Get Profile
// ======================================

export const getProfile = async () => {

    const response = await api.get("/profile/");

    return response.data;

};

// ======================================
// Update Profile Details
// ======================================

export const updateProfile = async (data) => {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {

        // Ignore null/undefined values
        if (
            data[key] === null ||
            data[key] === undefined
        ) {
            return;
        }

        // Skip frontend-only fields
        if (
            key === "profile_image" ||
            key === "profile_image_url" ||
            key === "profile_completion"
        ) {
            return;
        }

        console.log(`${key}:`, data[key]);

        formData.append(key, data[key]);

    });

    try {

        const response = await api.put(
            "/profile/",
            formData
        );

        return response.data;

    } catch (error) {

        console.log("========== DJANGO VALIDATION ERROR ==========");
        console.log(error.response?.data);
        console.log("============================================");

        throw error;

    }

};

// ======================================
// Upload Profile Image
// ======================================

export const uploadProfileImage = async (file) => {

    const formData = new FormData();

    formData.append("profile_image", file);

    try {

        const response = await api.put(
            "/profile/",
            formData
        );

        return response.data;

    } catch (error) {

        console.log("========== IMAGE UPLOAD ERROR ==========");
        console.log(error.response?.data);
        console.log("========================================");

        throw error;

    }

};