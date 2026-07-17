import api from "../api/api";

/* ==========================================
   Profile
========================================== */

export const getProfile = async () => {

    const response = await api.get("/profile/");

    return response.data;

};

export const updateProfile = async (formData) => {

    const response = await api.put(

        "/profile/",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

};

/* ==========================================
   Company
========================================== */

export const getCompany = async () => {

    const response = await api.get("/companies/me/");

    return response.data;

};

export const updateCompany = async (formData) => {

    const response = await api.patch(

        "/companies/me/",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

};

/* ==========================================
   Password
========================================== */

export const changePassword = async (data) => {

    const response = await api.post(

        "/accounts/change-password/",

        data

    );

    return response.data;

};