import { useEffect, useState } from "react";
import { checkCode, getCandidates, vote } from "../services/api";
import { NavLink } from "react-router";

const Vote = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        setErrorMessage("Помилка під час завантаження кандидатів:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (id) => {
    if (!uniqueCode) {
      setErrorMessage("Виберіть кандидата і введіть код");
      return;
    }

    const isUsed = await checkCode(uniqueCode);
    console.log(isUsed);
    if (isUsed) {
      setErrorMessage("Цей код вже використано!");
      return;
    }

    try {
      await vote(id, uniqueCode);
      setUniqueCode("");
      setErrorMessage("");
      setSuccessMessage("Голос успішно зараховано!");
    } catch (error) {
      setErrorMessage(`Помилка: ${error.response?.data?.error}`);
    }
  };

  return (
    <>
      <h2 className="pacifico-regular text-5xl  ">Голосування</h2>
      <div className="flex gap-10 mt-6">
        <input
          type="text"
          placeholder="Ідентифікаційний код"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(e.target.value)}
          className="bg-[#7C7F65] border border-green-700 placeholder-gray-800 text-black text-sm rounded-lg block w-full p-2.5 mb-3"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className="border-collapse border border-[#bea8aa] p-1">
              Ім&apos;я
            </th>
            <th className="border-collapse border border-[#bea8aa] p-1">
              Інформація про кандидата
            </th>
            <th className="border-collapse border border-[#bea8aa] p-1">
              Підтвердити вибір
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr className="text-base mt-3" key={candidate.id}>
              <th className="border-collapse border border-[#bea8aa] p-1">
                {candidate.name}
              </th>
              <th className="border-collapse border border-[#bea8aa] p-1">
                <NavLink to="/list-of-candidates">
                  {candidate.description.slice(
                    0,
                    candidate.description.length / 2
                  )}
                  ...
                </NavLink>
              </th>
              <th className="border-collapse border border-[#bea8aa] p-1">
                <button onClick={() => handleVote(candidate.id)}>Обрати</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleVote}
        className="hover:bg-[#BEA8AA] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3"
      >
        Голосувати
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <NavLink className="ml-5" to="/">
        Повернутись
      </NavLink>
    </>
  );
};

export default Vote;
