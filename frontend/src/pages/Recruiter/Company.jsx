import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getMyCompany } from "../../services/companyService";

import CompanyProfileCard from "../../components/recruiter/CompanyProfileCard";
import CompanyEditForm from "../../components/recruiter/CompanyEditForm";

import "../../components/recruiter/Recruiter.css";

const Company = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      setLoading(true);

      const data = await getMyCompany();

      setCompany(data);
    } catch (error) {
      toast.error("Failed to load company profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="company-page">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="company-page">
      <div className="company-header">
        <h2>🏢 Company Profile</h2>
        <p>Manage your organization's information.</p>
      </div>

      {editMode ? (
        <CompanyEditForm
          company={company}
          onCancel={() => setEditMode(false)}
          onSuccess={() => {
            loadCompany();
            setEditMode(false);
          }}
        />
      ) : (
        <CompanyProfileCard
          company={company}
          onEdit={() => setEditMode(true)}
        />
      )}
    </div>
  );
};

export default Company;