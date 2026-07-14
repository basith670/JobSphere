import api from "../api/api";

export const matchResume = async (resumeId, jobDescription) => {
  const response = await api.post(
    `/ai-resume/${resumeId}/match/`,
    {
      job_description: jobDescription,
    }
  );

  return response.data;
};