const express = require("express");
const Web3 = require("web3").default;
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const web3 = new Web3("http://127.0.0.1:7545");
const contractABI = require("./build/contracts/Voting.json").abi;
const contractAddress = "0xD4597e66Bdc98D93Cd977DDf19AC9411970BC352"; // Укажите адрес вашего развернутого контракта
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

let accounts = [];
(async () => {
  accounts = await web3.eth.getAccounts();
  if (!accounts.length) {
    console.error("Адреса для работы с контрактом не найдены в Ganache!");
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
    console.error("Ошибка при получении кандидатов:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/candidates", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Имя и описание обязательны" });
  }

  try {
    await votingContract.methods
      .addCandidate(name, description)
      .send({ from: accounts[0] });
    res.status(200).json({ message: "Кандидат успешно добавлен" });
  } catch (err) {
    console.error("Ошибка при добавлении кандидата:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/vote", async (req, res) => {
  const { candidateId } = req.body;
  if (candidateId === undefined || candidateId === null) {
    return res.status(400).json({ error: "Необходимо указать ID кандидата" });
  }

  try {
    await votingContract.methods.vote(candidateId).send({ from: accounts[0] });
    res.status(200).json({ message: "Голос успешно засчитан" });
  } catch (err) {
    if (err.message.includes("already voted")) {
      return res.status(400).json({ error: "Вы уже проголосовали" });
    }
    if (err.message.includes("Invalid candidate ID")) {
      return res.status(400).json({ error: "Некорректный ID кандидата" });
    }
    console.error("Ошибка при голосовании:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
