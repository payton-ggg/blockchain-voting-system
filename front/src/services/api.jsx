import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getCandidates = async () => {
  const response = await axios.get(`${BASE_URL}/candidates`);
  return response.data;
};

export const addCandidate = async (name, description, adminCode) => {
  await axios.post(`${BASE_URL}/candidates`, { name, description, adminCode });
};

export const vote = async (candidateId, code) => {
  await axios.post(`${BASE_URL}/vote`, { candidateId, code });
};

export const checkCode = async (code) => {
  const response = await axios.get(`${BASE_URL}/check-code/${code}`);
  return response.data.isUsed;
};

export const getValidCodes = async () => {
  const response = await axios.get(`${BASE_URL}/valid-codes`);
  return response.data;
};

export const checkAdminCode = async (code) => {
  const response = await axios.get(`${BASE_URL}/check-admin/${code}`);
  return response.data.isAdmin;
};
