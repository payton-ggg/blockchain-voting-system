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
        console.error("Помилка під час завантаження кандидатів:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="mt-7">
      <h2>Список кандидатів</h2>
      <>
        {candidates.map((candidate, index) => (
          <div className="flex flex-col text-lg mt-3" key={index}>
            <strong>{candidate.name}</strong>
            <p>{candidate.description}</p>
            <strong>ID: {candidate.id}</strong>
            <p>Голоса: {candidate.voteCount}</p>
          </div>
        ))}
      </>
    </div>
  );
};

export default CandidatesList;
