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

// Отримати всіх кандидатів
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

// Голосування
app.post("/vote", async (req, res) => {
  const { candidateId, uniqueCode } = req.body;

  if (candidateId === undefined || uniqueCode === undefined) {
    return res
      .status(400)
      .json({ error: "Необхідно вказати ID кандидата та унікальний код" });
  }

  try {
    await votingContract.methods
      .vote(candidateId, uniqueCode)
      .send({ from: accounts[0] });

    res.status(200).json({ message: "Голос успішно зараховано" });
  } catch (err) {
    if (err.message.includes("Code already used")) {
      return res.status(400).json({ error: "Цей код вже використаний" });
    }
    if (err.message.includes("Invalid candidate ID")) {
      return res.status(400).json({ error: "Некоректний ID кандидата" });
    }
    console.error("Помилка під час голосування:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// Перевірка чи використаний код
app.get("/check-code/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const isUsed = await votingContract.methods.isCodeUsed(code).call();
    res.json({ code, isUsed });
  } catch (err) {
    console.error("Помилка під час перевірки коду:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.get("/valid-codes", async (req, res) => {
  try {
    const codes = await votingContract.methods.getValidCodes().call();
    res.json(codes);
  } catch (err) {
    console.error("Ошибка при получении валидных кодов:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
