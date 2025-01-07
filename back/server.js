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

app.get("/candidates", async (req, res) => {
  try {
    const candidates = await votingContract.methods.getCandidates().call();
    const formattedCandidates = candidates.map((candidate, index) => ({
      id: index,
      name: candidate.name,
      description: candidate.description,
      voteCount: parseInt(candidate.voteCount, 10),
    }));
    res.json(formattedCandidates);
  } catch (err) {
    console.error("Помилка під час отримання кандидатів:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/candidates", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Ім'я та опис обов'язкові" });
  }

  try {
    await votingContract.methods
      .addCandidate(name, description)
      .send({ from: accounts[0] });
    res.status(200).json({ message: "" });
  } catch (err) {
    console.error("Помилка під час додавання кандидата:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.post("/vote", async (req, res) => {
  const { candidateId } = req.body;
  if (candidateId === undefined || candidateId === null) {
    return res.status(400).json({ error: "Необхідно вказати ID кандидата" });
  }

  try {
    await votingContract.methods.vote(candidateId).send({ from: accounts[0] });
    res.status(200).json({ message: "Голос успішно зараховано" });
  } catch (err) {
    if (err.message.includes("already voted")) {
      return res.status(400).json({ error: "Ви вже проголосували" });
    }
    if (err.message.includes("Invalid candidate ID")) {
      return res.status(400).json({ error: "Некоректний ID кандидата" });
    }
    console.error("Помилка під час голосування:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер розгорнуто на http://localhost:${PORT}`);
});
