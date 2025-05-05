// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface INFT {
    struct NFTData {
        string name;
        string description;
        string mediaType;
        string mediaUrl;
        string metadata;
        uint256 timestamp;
        address creator;
        string culturalSignificance;
        string historicalContext;
        string preservationStatus;
        string impact;
        string verification;
        address beneficiary;
        string soulConnection;
        string soulPurpose;
    }

    function createNFT(
        string memory name,
        string memory description,
        string memory mediaType,
        string memory mediaUrl,
        string memory metadata,
        string memory culturalSignificance,
        string memory historicalContext,
        string memory preservationStatus,
        string memory impact,
        string memory verification,
        address beneficiary,
        string memory soulConnection,
        string memory soulPurpose
    ) external returns (uint256);

    function getNFT(uint256 tokenId) external view returns (NFTData memory);
} 