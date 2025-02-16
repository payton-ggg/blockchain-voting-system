// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    mapping(uint256 => bool) public usedCodes; // Проверка, использован ли код

    function addCandidate(string memory name) public {
        candidates.push(Candidate(name, 0));
    }

    function vote(uint256 candidateId, uint256 uniqueCode) public {
        require(candidateId < candidates.length, "Invalid candidate ID");
        require(!usedCodes[uniqueCode], "Code already used");

        candidates[candidateId].voteCount++;
        usedCodes[uniqueCode] = true;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function isCodeUsed(uint256 uniqueCode) public view returns (bool) {
        return usedCodes[uniqueCode];
    }
}
