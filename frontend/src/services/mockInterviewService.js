import api from "../api/api";

// Start Interview
export const startInterview = async (data) => {
  const response = await api.post(
    "/mock-interview/start/",
    data
  );

  return response.data;
};

// Submit One Answer
export const submitInterviewAnswer = async (data) => {
  const response = await api.post(
    "/mock-interview/submit/",
    data
  );

  return response.data;
};

// Evaluate Complete Interview
export const evaluateAnswer = async (data) => {
  const response = await api.post(
    "/mock-interview/evaluate/",
    data
  );

  return response.data;
};