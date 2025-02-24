import { NavLink } from "react-router";
import "./App.css";
import { createContext, useState } from "react";
import { getValidCodes } from "./services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const errorContext = createContext("");

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const codes = getValidCodes()
  
  console.log(codes)

  return (
    <div className="App">
      <header>
        <h1 className="pacifico-regular">Система виборів</h1>
      </header>
      <errorContext.Provider
        value={{
          errorMessage,
          setErrorMessage,
          successMessage,
          setSuccessMessage,
        }}
      >
        <div className="max-w-[600px] text-center mt-5">
          Наша система блокчейн-голосування розроблена для забезпечення
          максимальної прозорості, достовірності та захисту даних під час
          проведення голосувань. Вона базується на сучасній технології блокчейн,
          яка гарантує, що всі дані про голоси зберігаються у незмінному
          вигляді, а будь-яка спроба підробки чи втручання одразу стає помітною.
          <br />
          <br />
          Кожен голос записується в блок, який пов&apos;язаний із попереднім
          блоком, утворюючи ланцюг. Цей ланцюг неможливо змінити без згоди всіх
          учасників системи, що виключає можливість фальсифікацій або
          корупційних схем.
          <br />
          <br />
          <b>Основні переваги системи:</b>
          <ul className="leading-6 mb-2">
            <li>
              <b>Прозорість</b>: Всі голоси відкрито зберігаються у блокчейні, і
              будь-який користувач може перевірити їхню цілісність.
            </li>
            <li>
              <b>Безпека</b>: Дані про голосування не можуть бути змінені або
              видалені після їх внесення в блокчейн.
            </li>
            <li>
              <b>Зручність</b>: Голосування можна здійснювати онлайн,
              використовуючи простий інтерфейс на веб-сайті.
            </li>
            <li>
              <b>Анонімність</b>: Система зберігає конфіденційність виборця,
              забезпечуючи при цьому перевірку правильності голосування.
            </li>
            <li>
              <b>Достовірність</b>: Використовується унікальний код для
              голосування, який видається кожному учаснику. Це унеможливлює
              повторне голосування однією особою.
            </li>
          </ul>
        </div>
        <div>
          <NavLink to="/how-to-use">Як працює система?</NavLink>
        </div>
        <div className="text-xl mt-5">
          <NavLink to="/voting">Проголосувати</NavLink>
          <br />
          <NavLink to="/list-of-candidates">
            Попередні результати та ID кандидатів
          </NavLink>
          <br />
          <NavLink to="/add-candidates">Додати кандидата</NavLink>
          <br />
        </div>
      </errorContext.Provider>
    </div>
  );
}

export default App;
