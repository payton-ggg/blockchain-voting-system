import { useState } from "react";
import { vote } from "../services/api";

const Vote = () => {
  const [candidateId, setCandidateId] = useState("");

  const handleVote = async () => {
    try {
      await vote(candidateId);
      alert("Голос прийнято!");
      setCandidateId("");
    } catch (error) {
      console.error("Помилка під час голосування:", error);
    }
  };

  return (
    <>
      <h2 className="mt-7">Голосування</h2>
      <div className="flex gap-10 mt-3">
        <input
          type="number"
          placeholder="ID кандидата"
          value={candidateId}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setCandidateId(e.target.value)}
        />
        <button
          onClick={handleVote}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Голосувати
        </button>
      </div>
    </>
  );
};

export default Vote;
