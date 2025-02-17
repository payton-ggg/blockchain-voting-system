// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;

    // Массив валидных кодов
    string[] private validCodes;

    // Хранение использованных кодов
    mapping(string => bool) public usedCodes;

    constructor(string[] memory _validCodes) {
        validCodes = _validCodes;
    }

    function addCandidate(string memory name) public {
        candidates.push(Candidate(name, 0));
    }

    function vote(uint256 candidateId, string memory code) public {
        require(candidateId < candidates.length, "Invalid candidate ID");
        require(isValidCode(code), "Code is not valid");
        require(!usedCodes[code], "Code has already been used");

        usedCodes[code] = true;
        candidates[candidateId].voteCount++;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function isCodeUsed(string memory code) public view returns (bool) {
        return usedCodes[code];
    }

    function isValidCode(string memory code) public view returns (bool) {
        for (uint256 i = 0; i < validCodes.length; i++) {
            if (keccak256(abi.encodePacked(validCodes[i])) == keccak256(abi.encodePacked(code))) {
                return true;
            }
        }
        return false;
    }

    function getValidCodes() public view returns (string[] memory) {
        return validCodes;
    }
}
