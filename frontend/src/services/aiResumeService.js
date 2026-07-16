import api from "../api/api";

export const analyzeResume = async (resumeId) => {
  const response = await api.post(
    `/ai-resume/${resumeId}/analyze/`
  );

  return response.data;
};

export const getAnalysisHistory = async () => {
  const response = await api.get(
    "/ai-resume/history/"
  );

  return response.data;
};

export const matchResume = async (
  resumeId,
  jobDescription
) => {
  const response = await api.post(
    `/ai-resume/${resumeId}/match/`,
    {
      job_description: jobDescription,
    }
  );

  return response.data;
};