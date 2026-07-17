import { useEffect, useRef, useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";

import {
    getNotifications,
    markNotificationRead,
    deleteNotification,
} from "../../services/notificationService";

export default function NotificationDropdown() {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        loadNotifications();
    }, []);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

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

    const loadNotifications = async () => {

        try {

            const data = await getNotifications();

            setNotifications(data);

        }

        catch (err) {

            console.error(err);

        }

    };

    const toggleDropdown = async () => {

        const next = !open;

        setOpen(next);

        if (next) {

            const unreadNotifications = notifications.filter(
                notification => !notification.is_read
            );

            await Promise.all(

                unreadNotifications.map(notification =>
                    markNotificationRead(notification.id)
                )

            );

            loadNotifications();

        }

    };

    const handleDelete = async (id) => {

        try {

            await deleteNotification(id);

            loadNotifications();

        }

        catch (err) {

            console.error(err);

        }

    };

    const unread = notifications.filter(
        notification => !notification.is_read
    ).length;

    return (

        <div
            className="notification-wrapper"
            ref={dropdownRef}
        >

            <button
                className="notification-btn"
                onClick={toggleDropdown}
            >

                <FaBell />

                {

                    unread > 0 && (

                        <span className="notification-count">

                            {unread}

                        </span>

                    )

                }

            </button>

            {

                open && (

                    <div className="notification-dropdown">

                        <h3>

                            Notifications

                        </h3>

                        {

                            notifications.length === 0 ? (

                                <p className="notification-empty">

                                    No notifications

                                </p>

                            ) : (

                                notifications.map(item => (

                                    <div
                                        key={item.id}
                                        className={`notification-item ${item.is_read ? "" : "unread"}`}
                                    >

                                        <div className="notification-header">

                                            <h4>

                                                {item.title}

                                            </h4>

                                            <button

                                                className="notification-delete"

                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    handleDelete(item.id);

                                                }}

                                            >

                                                <FaTimes />

                                            </button>

                                        </div>

                                        <p>

                                            {item.message}

                                        </p>

                                        {

                                            item.created_at && (

                                                <small className="notification-time">

                                                    {

                                                        new Date(
                                                            item.created_at
                                                        ).toLocaleString()

                                                    }

                                                </small>

                                            )

                                        }

                                    </div>

                                ))

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}