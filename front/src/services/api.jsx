import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getCandidates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/candidates`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении кандидатов:", error);
    throw error;
  }
};

export const addCandidate = async (name, description) => {
  try {
    await axios.post(`${BASE_URL}/candidates`, { name, description });
  } catch (error) {
    console.error("Ошибка при добавлении кандидата:", error);
    throw error;
  }
};

export const vote = async (candidateId) => {
  try {
    await axios.post(`${BASE_URL}/vote`, { candidateId });
  } catch (error) {
    console.error("Ошибка при голосовании:", error);
    throw error;
  }
};
