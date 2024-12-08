// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;

    function addCandidate(string memory name) public {
        candidates.push(Candidate(name, 0));
    }

    function vote(uint256 candidateId) public {
        require(candidateId < candidates.length, "Invalid candidate ID");
        candidates[candidateId].voteCount++;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
