import api from "../api/api";

/*
Generate AI Cover Letter
POST /cover-letter/generate/
*/
export const generateCoverLetter = async (data) => {
  const response = await api.post(
    "/cover-letter/generate/",
    data
  );

  return response.data;
};