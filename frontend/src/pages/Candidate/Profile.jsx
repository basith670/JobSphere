import { useEffect, useState } from "react";

import { getProfile } from "../../services/profileService";

import PersonalInfo from "../../components/profile/PersonalInfo";
import ProfessionalInfo from "../../components/profile/ProfessionalInfo";
import CareerInfo from "../../components/profile/CareerInfo";
import SocialLinks from "../../components/profile/SocialLinks";

import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div className="profile-page">

      <h1>Candidate Profile</h1>

      <PersonalInfo profile={profile} />

      <ProfessionalInfo profile={profile} />

      <CareerInfo profile={profile} />

      <SocialLinks profile={profile} />

    </div>
  );
}