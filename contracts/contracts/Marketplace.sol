// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/INFT.sol";

contract Marketplace is Ownable, ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    struct Offer {
        address buyer;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => mapping(address => Offer)) public offers;
    uint256 private _listingCounter;

    event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTSold(uint256 indexed listingId, address indexed buyer, uint256 price);
    event ListingCancelled(uint256 indexed listingId);
    event OfferPlaced(uint256 indexed listingId, address indexed buyer, uint256 price);
    event OfferAccepted(uint256 indexed listingId, address indexed buyer, uint256 price);
    event OfferCancelled(uint256 indexed listingId, address indexed buyer);

    constructor() Ownable() {}

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not the owner");
        require(IERC721(nftContract).getApproved(tokenId) == address(this), "Not approved");
        require(price > 0, "Price must be greater than 0");

        _listingCounter++;
        listings[_listingCounter] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            isActive: true
        });

        emit NFTListed(_listingCounter, msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value == listing.price, "Incorrect price");

        listing.isActive = false;
        IERC721(listing.nftContract).transferFrom(listing.seller, msg.sender, listing.tokenId);
        
        (bool sent, ) = payable(listing.seller).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit NFTSold(listingId, msg.sender, listing.price);
    }

    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing not active");

        listing.isActive = false;
        emit ListingCancelled(listingId);
    }

    function makeOffer(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value > 0, "Price must be greater than 0");

        Offer storage existingOffer = offers[listingId][msg.sender];
        require(!existingOffer.isActive, "Offer already exists");

        offers[listingId][msg.sender] = Offer({
            buyer: msg.sender,
            price: msg.value,
            isActive: true
        });

        emit OfferPlaced(listingId, msg.sender, msg.value);
    }

    function acceptOffer(uint256 listingId, address buyer) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing not active");

        Offer storage offer = offers[listingId][buyer];
        require(offer.isActive, "Offer not active");

        listing.isActive = false;
        offer.isActive = false;

        IERC721(listing.nftContract).transferFrom(msg.sender, buyer, listing.tokenId);
        
        (bool sent, ) = payable(msg.sender).call{value: offer.price}("");
        require(sent, "Failed to send Ether");

        emit OfferAccepted(listingId, buyer, offer.price);
    }

    function cancelOffer(uint256 listingId) external nonReentrant {
        Offer storage offer = offers[listingId][msg.sender];
        require(offer.isActive, "Offer not active");

        offer.isActive = false;
        
        (bool sent, ) = payable(msg.sender).call{value: offer.price}("");
        require(sent, "Failed to send Ether");

        emit OfferCancelled(listingId, msg.sender);
    }
} 