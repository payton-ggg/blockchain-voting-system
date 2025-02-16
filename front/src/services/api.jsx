import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getCandidates = async () => {
  const response = await axios.get(`${BASE_URL}/candidates`);
  return response.data;
};

export const addCandidate = async (name) => {
  await axios.post(`${BASE_URL}/candidates`, { name });
};

export const vote = async (candidateId, uniqueCode) => {
  await axios.post(`${BASE_URL}/vote`, { candidateId, uniqueCode });
};

export const checkCode = async (code) => {
  const response = await axios.get(`${BASE_URL}/check-code/${code}`);
  return response.data;
};
