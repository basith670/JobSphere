import api from "../api/api";

// Get all notifications
export const getNotifications = async () => {
  const response = await api.get("/notifications/");
  return response.data.results || response.data;
};

// Get unread notification count
export const getUnreadNotificationCount = async () => {
  const response = await api.get(
    "/notifications/unread-count/"
  );

  return response.data.count;
};

// Mark one notification as read
export const markNotificationRead = async (id) => {
  const response = await api.patch(
    `/notifications/${id}/read/`
  );

  return response.data;
};

// Mark all notifications as read
export const markAllNotificationsRead = async () => {
  const response = await api.patch(
    "/notifications/read-all/"
  );

  return response.data;
};

// Delete notification
export const deleteNotification = async (id) => {
  await api.delete(`/notifications/${id}/`);
};