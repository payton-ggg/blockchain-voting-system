import { useContext, useState } from "react";
import { addCandidate } from "../services/api";
import { errorContext } from "../App";

const AddCandidate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("ф");
  const { setErrorMessage, setSuccessMessage } = useContext(errorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCandidate(name, description);
      setSuccessMessage("Кандидат успішно доданий!");
      setName("");
      setDescription("");
    } catch (error) {
      setErrorMessage("Помилка під час додавання кандидата:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mt-6">Додати кандидата</h2>
      <input
        type="text"
        placeholder="Маринич Платон"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-[#7C7F65] border border-green-700 placeholder-gray-800 text-black text-sm rounded-lg block w-full p-2.5 mt-5"
        required
      />

      <button
        className="focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3"
        type="submit"
      >
        Додати
      </button>
    </form>
  );
};

export default AddCandidate;
