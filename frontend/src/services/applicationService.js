import api from "../api/api";

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
  const response = await api.get("/applications/");
  return response.data;
};