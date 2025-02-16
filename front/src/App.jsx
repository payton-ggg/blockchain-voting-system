import "./App.css";
import AddCandidate from "./components/AddCandidate";
import CandidatesList from "./components/CandidatesList";
import Vote from "./components/Vote";
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const errorContext = createContext("");

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="App">
      <header>
        <h1>Система виборів</h1>
      </header>
      <errorContext.Provider
        value={{
          errorMessage,
          setErrorMessage,
          successMessage,
          setSuccessMessage,
        }}
      >
        <AddCandidate />
        <Vote />
        <CandidatesList />
      </errorContext.Provider>
    </div>
  );
}

export default App;
