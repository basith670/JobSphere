import PasswordSettings from "../../components/candidate/PasswordSettings";
import NotificationSettings from "../../components/candidate/NotificationSettings";

export default function Settings() {

    return (

        <div className="profile-page">

            <div className="page-header">

                <h1>
                    Settings
                </h1>

                <p>
                    Manage your account security and notification preferences.
                </p>

            </div>

            <PasswordSettings />

            <NotificationSettings />

        </div>

    );

}