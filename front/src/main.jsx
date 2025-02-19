import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AddCandidate from "./components/AddCandidate";
import CandidatesList from "./components/CandidatesList";
import Vote from "./components/Vote";
import { BrowserRouter, Routes, Route } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="add-candidates" element={<AddCandidate />} />
        <Route path="list-of-candidates" element={<CandidatesList />} />
        <Route path="voting" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
