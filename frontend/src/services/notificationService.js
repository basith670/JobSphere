import api from "../api/api";

export const getNotifications = async () => {

    const response = await api.get(
        "/notifications/"
    );

    return response.data.results || [];

};

export const markNotificationRead = async (id) => {

    const response = await api.patch(
        `/notifications/${id}/`,
        {
            is_read: true,
        }
    );

    return response.data;

};

export const deleteNotification = async (id) => {

    await api.delete(
        `/notifications/${id}/`
    );

};