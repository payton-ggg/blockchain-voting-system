import { useEffect, useState } from "react";
import { getCandidates } from "../services/api";

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Ошибка при загрузке кандидатов:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <h2>Список кандидатов</h2>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            <p>
              <strong>{candidate.name}</strong>: {candidate.id}
            </p>
            <p>Голоса: {candidate.voteCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;
