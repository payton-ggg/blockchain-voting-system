const { default: getRandom } = require("../getRandom");

const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const adminCode = "ADMIN-SECRET-2025";

  const validCodes = [`CODE-${getRandom(1, 1000)}` * 5];

  deployer.deploy(Voting, adminCode, validCodes);
};
