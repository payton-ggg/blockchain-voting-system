import { useContext, useState } from "react";
import { checkCode, vote } from "../services/api";
import { errorContext } from "../App";

const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [uniqueCode, setUniqueCode] = useState("");
  const { errorMessage, setErrorMessage, successMessage, setSuccessMessage } =
    useContext(errorContext);

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
          type="number"
          placeholder="Indetefication"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="flex gap-10 mt-3">
        <input
          type="number"
          placeholder="ID кандидата"
          value={selectedCandidate}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSelectedCandidate(e.target.value)}
        />
        <button
          onClick={handleVote}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
