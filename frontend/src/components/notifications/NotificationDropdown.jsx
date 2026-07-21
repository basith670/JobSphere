import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notificationService";

import "./NotificationDropdown.css";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const notificationRef = useRef(null);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);

      const unread = await getUnreadNotificationCount();
      setCount(unread);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsRead();
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="notification-wrapper"
      ref={notificationRef}
    >
      <button
        className="notification-btn"
        onClick={() => setOpen(!open)}
      >
        <FaBell />

        {count > 0 && (
          <span className="notification-badge">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifications</h4>

            {notifications.length > 0 && (
              <button
                className="mark-all-btn"
                onClick={handleReadAll}
              >
                Mark all
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="notification-empty">
              No notifications
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${
                  notification.is_read
                    ? "read"
                    : "unread"
                }`}
                onClick={() =>
                  handleRead(notification.id)
                }
              >
                <strong>
                  {notification.title}
                </strong>

                <p>{notification.message}</p>

                <small>
                  {new Date(
                    notification.created_at
                  ).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}