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
      <>
        {candidates.map((candidate, index) => (
          <div key={index}>
            <p>
              <strong>{candidate.name}</strong>: {candidate.id}
            </p>
            <p>Голоса: {candidate.voteCount}</p>
          </div>
        ))}
      </>
    </div>
  );
};

export default CandidatesList;
