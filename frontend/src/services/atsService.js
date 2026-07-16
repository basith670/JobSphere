import api from "../api/api";

export const calculateATS = async (resumeId) => {

  const response = await api.post(
    `/ai-resume/${resumeId}/analyze/`
  );

  return {
    atsScore: response.data.ats_score,
  };

};