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
      <h2>Добавить кандидата</h2>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddCandidate;
