import { useState } from "react";
import { vote } from "../services/api";

const Vote = () => {
  const [candidateId, setCandidateId] = useState("");

  const handleVote = async () => {
    try {
      await vote(candidateId);
      alert("Голос принят!");
      setCandidateId("");
    } catch (error) {
      console.error("Ошибка при голосовании:", error);
    }
  };

  return (
    <div>
      <h2 className="mt-7">Голосование</h2>
      <input
        type="number"
        placeholder="ID кандидата"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
      />
      <button onClick={handleVote}>Голосовать</button>
    </div>
  );
};

export default Vote;
