const express = require("express");
const Web3 = require("web3").default;
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const web3 = new Web3("http://127.0.0.1:7545");
const contractABI = require("./build/contracts/Voting.json").abi;
const contractAddress = process.env.CONTRACT_ADRESS;
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

let accounts = [];
(async () => {
  accounts = await web3.eth.getAccounts();
  if (!accounts.length) {
    console.error("Адреси для роботи з контрактом не знайдено в Ganache!");
    process.exit(1);
  }
})();

// Отримати кандидатів
app.get("/candidates", async (req, res) => {
  try {
    const candidates = await votingContract.methods.getCandidates().call();
    const formattedCandidates = candidates.map((candidate, index) => ({
      id: index,
      name: candidate.name,
      voteCount: parseInt(candidate.voteCount, 10),
    }));
    res.json(formattedCandidates);
  } catch (err) {
    console.error("Помилка під час отримання кандидатів:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// Додати кандидата
app.post("/candidates", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Ім'я обов'язкове" });
  }

  try {
    await votingContract.methods.addCandidate(name).send({ from: accounts[0] });
    res.status(200).json({ message: "Кандидат доданий" });
  } catch (err) {
    console.error("Помилка під час додавання кандидата:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// Голосування з кодом
app.post("/vote", async (req, res) => {
  const { candidateId, code } = req.body;
  if (candidateId === undefined || !code) {
    return res.status(400).json({ error: "ID кандидата та код обов'язкові" });
  }

  try {
    await votingContract.methods
      .vote(candidateId, code)
      .send({ from: accounts[0] });
    res.status(200).json({ message: "Голос зараховано" });
  } catch (err) {
    console.error("Помилка під час голосування:", err);
    res.status(500).json({ error: err.message });
  }
});

// Перевірка використання коду
app.get("/check-code/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const isUsed = await votingContract.methods.isCodeUsed(code).call();
    res.json({ isUsed });
  } catch (err) {
    console.error("Помилка під час перевірки коду:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// Отримати всі валідні коди (тільки для тесту)
app.get("/valid-codes", async (req, res) => {
  try {
    const validCodes = await votingContract.methods.getValidCodes().call();
    res.json(validCodes);
  } catch (err) {
    console.error("Помилка отримання кодів:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
