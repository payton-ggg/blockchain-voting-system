import { useEffect, useState } from "react";
import { getCandidates } from "../services/api";
import { NavLink } from "react-router";
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
      <h2 className="pacifico-regular text-5xl">Список кандидатів</h2>
      <table className="border-collapse border border-[#bea8aa] mt-5 mb-2">
        <thead className="border-collapse border border-[#bea8aa] bg-[#bbb59f]">
          <tr>
            <th className="border-collapse border border-[#bea8aa] p-1">
              Ім`я кандидата
            </th>
            <th className="border-collapse border border-[#bea8aa] p-1">
              Опис кандидата
            </th>
            <th className="border-collapse border border-[#bea8aa] p-1">
              ID кандидата
            </th>
            <th className="border-collapse border border-[#bea8aa] p-1">
              Кількість голосів
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr className="text-base font-normal mt-3" key={index}>
              <th className="border-collapse border font-medium border-[#bea8aa] p-1">
                {candidate.name}
              </th>
              <th className="border-collapse border font-medium border-[#bea8aa] p-1">
                {candidate.description}
              </th>
              <th className="border-collapse border  border-[#bea8aa] p-1">
                {candidate.id}
              </th>
              <th className="border-collapse border  border-[#bea8aa] p-1">
                {candidate.voteCount}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <NavLink to="/">Повернутись</NavLink>
    </div>
  );
};

export default CandidatesList;
