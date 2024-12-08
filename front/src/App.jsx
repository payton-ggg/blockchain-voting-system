import "./App.css";
import AddCandidate from "./components/AddCandidate";
import CandidatesList from "./components/CandidatesList";
import Vote from "./components/Vote";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Система голосования</h1>
      </header>
      <main>
        <AddCandidate />
        <Vote />
        <CandidatesList />
      </main>
    </div>
  );
}

export default App;
