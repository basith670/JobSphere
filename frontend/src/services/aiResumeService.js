import api from "../api/api";

// Analyze Resume
export const analyzeResume = async (resumeId) => {
  const response = await api.post(
    `/ai-resume/${resumeId}/analyze/`
  );

  return response.data;
};

// Analysis History
export const getAnalysisHistory = async () => {
  const response = await api.get(
    "/ai-resume/history/"
  );

  return response.data;
};