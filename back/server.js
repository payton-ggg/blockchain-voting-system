const express = require("express");
const Web3 = require("web3").default;
const cors = require("cors");
const rateLimit = require("express-rate-limit");
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

const voteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 3,
  message: "Слишком много запросов, попробуйте позже",
});

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
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.post("/candidates", async (req, res) => {
  const { name, description, adminCode } = req.body;

  if (!name || !description || !adminCode) {
    return res
      .status(400)
      .json({ error: "Имя, описание и код администратора обязательны" });
  }

  try {
    const isAdmin = await votingContract.methods
      .checkAdminCode(adminCode)
      .call();
    if (!isAdmin) {
      return res.status(403).json({ error: "Неверный код администратора" });
    }

    await votingContract.methods
      .addCandidate(name, description, adminCode)
      .send({ from: accounts[0], gas: 900000 });

    res.status(200).json({ message: "Кандидат добавлен" });
  } catch (err) {
    console.error("Ошибка при добавлении кандидата:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/vote", voteLimiter, async (req, res) => {
  const { candidateId, code } = req.body;

  if (candidateId === undefined || !code) {
    return res
      .status(400)
      .json({ error: "Необхідно вказати ID кандидата та код" });
  }

  try {
    await votingContract.methods
      .vote(candidateId, code)
      .send({ from: accounts[0] });
    res.status(200).json({ message: "Голос успішно зараховано" });
  } catch (err) {
    console.error("Помилка виконання контракту:", err);

    if (err.data) {
      const errorKeys = Object.keys(err.data);
      if (errorKeys.length > 0) {
        const revertReason = err.data[errorKeys[0]].reason;
        return res.status(400).json({ error: `Помилка: ${revertReason}` });
      }
    }

    res.status(500).json({ error: "Сталася помилка з вашим кодом" });
  }
});

app.get("/valid-codes", async (req, res) => {
  try {
    const validCodes = await votingContract.methods.getValidCodes().call();
    res.json(validCodes);
  } catch (err) {
    console.error("Помилка отримання кодів:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

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

app.get("/check-admin/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const isAdmin = await votingContract.methods.checkAdminCode(code).call();
    res.json({ isAdmin });
  } catch (err) {
    console.error("Ошибка при проверке кода администратора:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
