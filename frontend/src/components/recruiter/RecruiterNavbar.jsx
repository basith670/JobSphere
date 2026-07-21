import { useState, useRef, useEffect } from "react";

import { recruiterGlobalSearch } from "../../services/recruiterSearchService";

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

export default function RecruiterNavbar({
    sidebarOpen,
    setSidebarOpen,
}) {

    const [search, setSearch] = useState("");

    const [results, setResults] = useState({
        recruiter_jobs: [],
        applicants: [],
        companies: [],
    });
    
    const [showResults, setShowResults] = useState(false);
    
    const searchRef = useRef(null);

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
    
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
    
        }
    
        document.addEventListener(
            "mousedown",
            handleClickOutside
        );
    
        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    
    }, []);

    useEffect(() => {

        const timer = setTimeout(async () => {
    
            if (!search.trim()) {
    
                setResults({
                    recruiter_jobs: [],
                    applicants: [],
                    companies: [],
                });
    
                setShowResults(false);
    
                return;
            }
    
            try {
    
                const data =
                    await recruiterGlobalSearch(search);
    
                setResults(data);
    
                setShowResults(true);
    
            } catch (error) {
    
                console.error(error);
    
            }
    
        }, 300);
    
        return () => clearTimeout(timer);
    
    }, [search]);

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

            <div
    className="navbar-search"
    ref={searchRef}
>

    <FaSearch className="search-icon" />

    <input
        type="text"
        value={search}
        placeholder="Search jobs, applicants, company..."
        onChange={(e) =>
            setSearch(e.target.value)
        }
        onFocus={() => {
            if (search.trim()) {
                setShowResults(true);
            }
        }}
    />

    {showResults && (
        <div className="search-dropdown">

            {results.recruiter_jobs.length > 0 && (
                <>
                    <h4>Jobs</h4>

                    {results.recruiter_jobs.map((job) => (
                        <div
                            key={job.id}
                            className="search-item"
                            onClick={() => {
                                navigate(`/recruiter/jobs/${job.id}`);
                                setSearch("");
                                setShowResults(false);
                            }}
                        >
                            <strong>{job.title}</strong>

                            <span>{job.location}</span>
                        </div>
                    ))}
                </>
            )}

            {results.applicants.length > 0 && (
                <>
                    <h4>Applicants</h4>

                    {results.applicants.map((applicant) => (
                        <div
                            key={applicant.id}
                            className="search-item"
                            onClick={() => {
                                navigate("/recruiter/applicants");
                                setSearch("");
                                setShowResults(false);
                            }}
                        >
                            <strong>{applicant.name}</strong>

                            <span>
                                {applicant.job}
                            </span>
                        </div>
                    ))}
                </>
            )}

            {results.companies.length > 0 && (
                <>
                    <h4>Company</h4>

                    {results.companies.map((company) => (
                        <div
                            key={company.id}
                            className="search-item"
                            onClick={() => {
                                navigate("/recruiter/companies");
                                setSearch("");
                                setShowResults(false);
                            }}
                        >
                            <strong>{company.name}</strong>

                            <span>
                                {company.industry}
                            </span>
                        </div>
                    ))}
                </>
            )}

            {results.recruiter_jobs.length === 0 &&
             results.applicants.length === 0 &&
             results.companies.length === 0 && (
                <div className="search-empty">
                    No results found
                </div>
            )}

        </div>
    )}

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