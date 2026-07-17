import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PersonalSettings from "../../components/recruiter/PersonalSettings";
import ProfessionalSettings from "../../components/recruiter/ProfessionalSettings";
import CompanySettings from "../../components/recruiter/CompanySettings";
import PasswordSettings from "../../components/recruiter/PasswordSettings";
import NotificationSettings from "../../components/recruiter/NotificationSettings";

export default function Settings() {

    const location = useLocation();

    useEffect(() => {

        const params = new URLSearchParams(location.search);

        const tab = params.get("tab");

        if (tab === "profile") {

            document
                .getElementById("personal-settings")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

        }

        if (tab === "password") {

            document
                .getElementById("password-settings")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

        }

    }, [location.search]);

    return (

        <div className="recruiter-page">

            <section className="recruiter-card analytics-header">

                <h2>Settings</h2>

                <p>
                    Manage your personal profile, professional information,
                    company details and account security.
                </p>

            </section>

            <div id="personal-settings">
                <PersonalSettings />
            </div>

            <div id="professional-settings">
                <ProfessionalSettings />
            </div>

            <div id="company-settings">
                <CompanySettings />
            </div>

            <div id="password-settings">
                <PasswordSettings />
            </div>

            <div id="notification-settings">
                <NotificationSettings />
            </div>

        </div>

    );

}