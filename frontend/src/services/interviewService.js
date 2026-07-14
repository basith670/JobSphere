import api from "../api/api";

export const generateInterviewQuestions = async (data) => {
  const response = await api.post(
    "/interview/generate/",
    data
  );

  return response.data;
};