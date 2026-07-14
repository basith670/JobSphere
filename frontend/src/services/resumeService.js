import api from "../api/api";

export const getResumes = async () => {
  const response = await api.get("/resumes/");

  // Return only the resume list from DRF pagination
  return response.data.results;
};

export const createResume = async (formData) => {
  const response = await api.post(
    "/resumes/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateResume = async (id, formData) => {
  const response = await api.put(
    `/resumes/${id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteResume = async (id) => {
  await api.delete(`/resumes/${id}/`);
};