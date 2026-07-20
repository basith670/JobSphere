import { useState, useRef, useEffect } from "react";

import {
    FaSearch,
    FaUserCircle,
    FaUser,
    FaCog,
    FaLock,
    FaSignOutAlt,
    FaChevronDown,
    FaBars,
} from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";

import NotificationDropdown from "../common/NotificationDropdown";

import { useSearch } from "../../context/SearchContext";

export default function RecruiterNavbar({
    sidebarOpen,
    setSidebarOpen,
}) {

    const {
        searchTerm,
        setSearchTerm,
    } = useSearch();

    const navigate = useNavigate();

    const location = useLocation();

    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setShowMenu(false);
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

    let placeholder = "Search...";

    switch (location.pathname) {

        case "/recruiter/dashboard":
            placeholder = "Search dashboard...";
            break;

        case "/recruiter/jobs":
            placeholder = "Search jobs...";
            break;

        case "/recruiter/applicants":
            placeholder = "Search applicants...";
            break;

        case "/recruiter/companies":
            placeholder = "Search company...";
            break;

        case "/recruiter/analytics":
            placeholder = "Search analytics...";
            break;

        case "/recruiter/settings":
            placeholder = "Search settings...";
            break;

        default:
            placeholder = "Search...";
    }

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");

    };

    return (

        <header className="recruiter-navbar">

            <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <FaBars />
            </button>

            <div className="navbar-search">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    placeholder={placeholder}
                />

            </div>

            <div className="navbar-right">

                <NotificationDropdown />

                <div
                    className="recruiter-profile-dropdown"
                    ref={menuRef}
                >

                    <div
                        className="recruiter-navbar-profile"
                        onClick={() =>
                            setShowMenu(!showMenu)
                        }
                    >

                        <FaUserCircle className="recruiter-profile-icon" />

                        <div className="navbar-user-info">

                            <h4>Recruiter</h4>

                            <span>Hiring Team</span>

                        </div>

                        <FaChevronDown
                            className="recruiter-dropdown-arrow"
                        />

                    </div>

                    {showMenu && (

                        <div className="recruiter-profile-menu">

                            <button
                                onClick={() => {

                                    navigate("/recruiter/settings?tab=profile");

                                    setShowMenu(false);

                                }}
                            >

                                <FaUser />

                                My Profile

                            </button>

                            <button
                                onClick={() => {

                                    navigate("/recruiter/settings");

                                    setShowMenu(false);

                                }}
                            >

                                <FaCog />

                                Settings

                            </button>

                            <button
                                onClick={() => {

                                    navigate("/recruiter/settings?tab=password");

                                    setShowMenu(false);

                                }}
                            >

                                <FaLock />

                                Change Password

                            </button>

                            <hr />

                            <button
                                onClick={logout}
                                className="recruiter-logout-item"
                            >

                                <FaSignOutAlt />

                                Logout

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}