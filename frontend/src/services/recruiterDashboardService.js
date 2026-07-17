import api from "../api/api";

export const getRecruiterDashboard = async () => {

    const response = await api.get(
        "/accounts/dashboard/"
    );

    return response.data;

};