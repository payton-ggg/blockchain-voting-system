function getRandom(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const adminCode = "ADMIN-SECRET-2025";

  const validCodes = [
    `CODE-${getRandom(1, 1000)}`,
    `CODE-${getRandom(1, 1000)}`,
    `CODE-${getRandom(1, 1000)}`,
  ];

  deployer.deploy(Voting, adminCode, validCodes);
};
