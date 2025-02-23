// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        string description;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    string[] private validCodes;
    mapping(string => bool) public usedCodes;
    string private adminCode;

    modifier onlyAdmin(string memory code) {
        require(keccak256(abi.encodePacked(code)) == keccak256(abi.encodePacked(adminCode)), "Неверный код администратора");
        _;
    }

    constructor(string memory _adminCode, string[] memory _validCodes) {
        adminCode = _adminCode;
        validCodes = _validCodes;
    }

    function addCandidate(string memory name, string memory description) public {
        candidates.push(Candidate(name, description, 0));
    }

    function vote(uint256 candidateId, string memory code) public {
        require(candidateId < candidates.length, "Invalid candidate ID");

        bool codeExists = false;
        for (uint256 i = 0; i < validCodes.length; i++) {
            if (keccak256(abi.encodePacked(validCodes[i])) == keccak256(abi.encodePacked(code))) {
                codeExists = true;
                break;
            }
        }
        require(codeExists, "Code does not exist");

        require(!usedCodes[code], "Code already used");

        usedCodes[code] = true;
        candidates[candidateId].voteCount++;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function isCodeUsed(string memory code) public view returns (bool) {
        return usedCodes[code];
    }

    function getValidCodes() public view returns (string[] memory) {
        return validCodes;
    }

    function checkAdminCode(string memory code) public view returns (bool) {
        return keccak256(abi.encodePacked(code)) == keccak256(abi.encodePacked(adminCode));
    }

    
}
