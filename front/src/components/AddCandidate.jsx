import { useState } from "react";
import { addCandidate } from "../services/api";

const AddCandidate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCandidate(name, description);
      alert("Кандидат успешно добавлен!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Ошибка при добавлении кандидата:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mt-6">Добавить кандидата</h2>
      <input
        type="text"
        placeholder="Джон Кеннеді"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5"
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
        required
      ></textarea>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
        type="submit"
      >
        Добавить
      </button>
    </form>
  );
};

export default AddCandidate;
