import api from "../api/api";

export const getProfile = async () => {
  const response = await api.get("/accounts/me/");
  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await api.put(
    "/accounts/me/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};