import { useState } from "react";
import { checkCode, vote } from "../services/api";

const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [uniqueCode, setUniqueCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleVote = async () => {
    if (!selectedCandidate || !uniqueCode) {
      setErrorMessage("Виберіть кандидата і введіть код");
      return;
    }

    const isUsed = await checkCode(uniqueCode);
    if (isUsed) {
      setErrorMessage("Цей код вже використано!");
      return;
    }

    try {
      await vote(selectedCandidate, uniqueCode);
      setErrorMessage("");
      setSuccessMessage("Голос успішно зараховано!");
    } catch (error) {
      setErrorMessage(`Помилка: ${error.response?.data?.error}`);
    }
  };

  return (
    <>
      <h2 className="mt-7">Голосування</h2>
      <div className="flex gap-10 mt-3">
        <input
          type="text"
          placeholder="Ідентифікаційний код"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(e.target.value)}
          className="bg-[#7C7F65] border border-green-700 placeholder-gray-800 text-black text-sm rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="flex gap-10 mt-3">
        <input
          type="number"
          placeholder="ID кандидата"
          value={selectedCandidate}
          className="bg-[#7C7F65] border border-green-700 placeholder-gray-800 text-black text-sm rounded-lg block w-full p-2.5"
          onChange={(e) => setSelectedCandidate(e.target.value)}
        />

        <button
          onClick={handleVote}
          className="hover:bg-[#BEA8AA] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Голосувати
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </>
  );
};

export default Vote;
