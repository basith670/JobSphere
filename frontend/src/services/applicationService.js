import api from "../api/api";

/* ======================================
   JOB SEEKER
====================================== */

export const applyJob = async (formData) => {

    const response = await api.post(
        "/applications/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};

export const getMyApplications = async () => {

    const response = await api.get(
        "/applications/"
    );

    return response.data.results;

};


/* ======================================
   RECRUITER
====================================== */

export const getRecruiterApplications = async () => {

    const response = await api.get(
        "/applications/recruiter/"
    );

    return response.data.results;

};

export const getApplication = async (id) => {

    const response = await api.get(
        `/applications/${id}/`
    );

    return response.data;

};

export const updateApplication = async (id, data) => {
    const response = await api.patch(
      `/applications/${id}/`,
      data
    );
  
    return response.data;
  };

