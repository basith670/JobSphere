import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {

        const accessToken = localStorage.getItem("access");

        if (!accessToken) {

            setUserProfile(null);
            setLoading(false);
            return;

        }

        try {

            const profile = await getProfile();

            setUserProfile(profile);

        } catch (err) {

            console.error("Failed to load user profile", err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        refreshUser();

    }, []);

    const clearUser = () => {

        setUserProfile(null);
    
    };
    
    return (
    
        <UserContext.Provider
            value={{
                userProfile,
                setUserProfile,
                refreshUser,
                clearUser,
                loading,
            }}
        >
    
            {children}
    
        </UserContext.Provider>
    
    );

}

export default function useUser() {

    return useContext(UserContext);

}