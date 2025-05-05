// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/INFT.sol";

contract HeritageNFT is ERC721, Ownable, INFT {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(uint256 => NFTData) private _nftData;

    constructor() ERC721("Heritage NFT", "HNT") Ownable() {}

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
    ) external override returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(msg.sender, newTokenId);
        
        _nftData[newTokenId] = NFTData({
            name: name,
            description: description,
            mediaType: mediaType,
            mediaUrl: mediaUrl,
            metadata: metadata,
            timestamp: block.timestamp,
            creator: msg.sender,
            culturalSignificance: culturalSignificance,
            historicalContext: historicalContext,
            preservationStatus: preservationStatus,
            impact: impact,
            verification: verification,
            beneficiary: beneficiary,
            soulConnection: soulConnection,
            soulPurpose: soulPurpose
        });
        
        return newTokenId;
    }

    function getNFT(uint256 tokenId) external view override returns (NFTData memory) {
        require(_exists(tokenId), "HeritageNFT: NFT does not exist");
        return _nftData[tokenId];
    }
} 