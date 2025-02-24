import { useState } from "react";
import { addCandidate, checkAdminCode } from "../services/api";
import { NavLink } from "react-router";

const AddCandidate = () => {
  const [name, setName] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkAdmin = checkAdminCode(adminCode);
      console.log(checkAdmin);

      await addCandidate(name, description, adminCode);
      setSuccessMessage("Кандидат успішно доданий!");
      setAdminCode("");
      setName("");
      setDescription("");
      setAdminCode("");
    } catch (error) {
      setErrorMessage("Помилка під час додавання кандидата:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="pacifico-regular text-5xl">Додати кандидата</h2>
        <input
          type="text"
          placeholder="Код адміністратора"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          className="bg-[#7C7F65] border border-green-700 placeholder-gray-800 text-black text-sm rounded-lg block w-full p-2.5 mt-6"
          required
        />

        <input
          type="text"
          placeholder="Ім'я кандидата"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#7C7F65] border border-green-700 placeholder-gray-800 text-black text-sm rounded-lg block w-full p-2.5 mt-3"
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
      <NavLink to="/" className="mt-5">
        Повернутись
      </NavLink>
    </>
  );
};

export default AddCandidate;
