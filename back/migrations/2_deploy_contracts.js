const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const validCodes = [
    "CODE-1234",
    "CODE-5678",
    "CODE-1111",
    "CODE-TEST1",
    "CODE-TEST2",
  ];

  deployer.deploy(Voting, validCodes);
};
