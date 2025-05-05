// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    // Mapping from NFT contract address to token ID to Listing
    mapping(address => mapping(uint256 => Listing)) public listings;
    
    // Listing fee in wei
    uint256 public listingFee = 0.001 ether;
    
    // Events
    event NFTListed(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    
    event NFTSold(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        uint256 price
    );
    
    event NFTUnlisted(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller
    );

    constructor() Ownable(msg.sender) {}

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external payable nonReentrant {
        require(msg.value == listingFee, "Must pay listing fee");
        require(price > 0, "Price must be greater than 0");
        
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(nft.getApproved(tokenId) == address(this) || 
                nft.isApprovedForAll(msg.sender, address(this)), 
                "Marketplace not approved");
        
        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            price: price,
            active: true
        });
        
        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    function buyNFT(
        address nftContract,
        uint256 tokenId
    ) external payable nonReentrant {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.active, "NFT not listed");
        require(msg.value == listing.price, "Incorrect price");
        
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == listing.seller, "Seller no longer owns NFT");
        
        // Transfer NFT to buyer
        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);
        
        // Transfer payment to seller
        (bool success, ) = listing.seller.call{value: msg.value}("");
        require(success, "Transfer failed");
        
        // Delete listing
        delete listings[nftContract][tokenId];
        
        emit NFTSold(nftContract, tokenId, listing.seller, msg.sender, listing.price);
    }

    function unlistNFT(
        address nftContract,
        uint256 tokenId
    ) external nonReentrant {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.active, "NFT not listed");
        require(listing.seller == msg.sender, "Not the seller");
        
        delete listings[nftContract][tokenId];
        
        emit NFTUnlisted(nftContract, tokenId, msg.sender);
    }

    function updateListingPrice(
        address nftContract,
        uint256 tokenId,
        uint256 newPrice
    ) external nonReentrant {
        require(newPrice > 0, "Price must be greater than 0");
        
        Listing storage listing = listings[nftContract][tokenId];
        require(listing.active, "NFT not listed");
        require(listing.seller == msg.sender, "Not the seller");
        
        listing.price = newPrice;
        
        emit NFTListed(nftContract, tokenId, msg.sender, newPrice);
    }

    function getListing(
        address nftContract,
        uint256 tokenId
    ) external view returns (Listing memory) {
        return listings[nftContract][tokenId];
    }

    function setListingFee(uint256 _listingFee) external onlyOwner {
        listingFee = _listingFee;
    }

    function withdrawFees() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
} 