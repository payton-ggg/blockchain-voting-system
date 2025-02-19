import { useState } from "react";
import { addCandidate } from "../services/api";

const AddCandidate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    <>
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

        <textarea
          type="text"
          placeholder="Опис кандидата"
          value={description}
          className="bg-[#7C7F65] border border-green-700 placeholder-gray-800 text-black text-sm rounded-lg block w-full p-2.5 mt-3"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3"
          type="submit"
        >
          Додати
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </>
  );
};

export default AddCandidate;
