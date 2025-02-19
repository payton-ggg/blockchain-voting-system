import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="add-candidates" element={<></>} />
        <Route path="list-of-candidates" element={<></>} />
        <Route path="voting" element={<></>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
