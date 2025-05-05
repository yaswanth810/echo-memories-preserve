import { expect } from "chai";
import { ethers } from "hardhat";
import { Marketplace, SoulboundNFT, ProofOfGoodNFT, HeritageNFT } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Marketplace", function () {
  let marketplace: Marketplace;
  let soulboundNFT: SoulboundNFT;
  let proofOfGoodNFT: ProofOfGoodNFT;
  let heritageNFT: HeritageNFT;
  let owner: SignerWithAddress;
  let seller: SignerWithAddress;
  let buyer: SignerWithAddress;
  let other: SignerWithAddress;

  beforeEach(async function () {
    [owner, seller, buyer, other] = await ethers.getSigners();

    // Deploy NFT contracts
    const SoulboundNFT = await ethers.getContractFactory("SoulboundNFT");
    soulboundNFT = await SoulboundNFT.deploy();
    await soulboundNFT.waitForDeployment();

    const ProofOfGoodNFT = await ethers.getContractFactory("ProofOfGoodNFT");
    proofOfGoodNFT = await ProofOfGoodNFT.deploy();
    await proofOfGoodNFT.waitForDeployment();

    const HeritageNFT = await ethers.getContractFactory("HeritageNFT");
    heritageNFT = await HeritageNFT.deploy();
    await heritageNFT.waitForDeployment();

    // Deploy Marketplace
    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.waitForDeployment();

    // Set up marketplace fees
    await marketplace.setListingFee(await soulboundNFT.getAddress(), 250); // 2.5%
    await marketplace.setListingFee(await proofOfGoodNFT.getAddress(), 250);
    await marketplace.setListingFee(await heritageNFT.getAddress(), 250);
  });

  describe("Listing NFTs", function () {
    it("Should allow listing NFTs for sale", async function () {
      // Create an NFT
      await heritageNFT.connect(seller).createNFT(
        "Test NFT",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "Cultural",
        "Test Heritage",
        "Test Location",
        "Modern"
      );

      // Approve marketplace
      await heritageNFT.connect(seller).approve(await marketplace.getAddress(), 0);

      // List NFT
      await marketplace.connect(seller).listNFT(
        await heritageNFT.getAddress(),
        0,
        ethers.parseEther("1.0")
      );

      const listing = await marketplace.getListing(await heritageNFT.getAddress(), 0);
      expect(listing.active).to.be.true;
      expect(listing.price).to.equal(ethers.parseEther("1.0"));
    });

    it("Should not allow listing soulbound NFTs", async function () {
      // Create a soulbound NFT
      await soulboundNFT.connect(seller).createNFT(
        "Test Soulbound",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "Personal",
        "Test Soul",
        "Test Connection",
        "Test Purpose"
      );

      // Try to list NFT
      await expect(
        marketplace.connect(seller).listNFT(
          await soulboundNFT.getAddress(),
          0,
          ethers.parseEther("1.0")
        )
      ).to.be.revertedWith("SoulboundNFT: tokens cannot be approved for transfer");
    });
  });

  describe("Auctions", function () {
    it("Should allow listing NFTs for auction", async function () {
      // Create an NFT
      await heritageNFT.connect(seller).createNFT(
        "Test NFT",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "Cultural",
        "Test Heritage",
        "Test Location",
        "Modern"
      );

      // Approve marketplace
      await heritageNFT.connect(seller).approve(await marketplace.getAddress(), 0);

      // List NFT for auction
      await marketplace.connect(seller).listNFTForAuction(
        await heritageNFT.getAddress(),
        0,
        ethers.parseEther("1.0"),
        86400 // 1 day
      );

      const listing = await marketplace.getListing(await heritageNFT.getAddress(), 0);
      expect(listing.active).to.be.true;
      expect(listing.price).to.equal(ethers.parseEther("1.0"));
    });

    it("Should allow placing bids on auctions", async function () {
      // Create and list NFT for auction
      await heritageNFT.connect(seller).createNFT(
        "Test NFT",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "Cultural",
        "Test Heritage",
        "Test Location",
        "Modern"
      );
      await heritageNFT.connect(seller).approve(await marketplace.getAddress(), 0);
      await marketplace.connect(seller).listNFTForAuction(
        await heritageNFT.getAddress(),
        0,
        ethers.parseEther("1.0"),
        86400
      );

      // Place bid
      await marketplace.connect(buyer).placeBid(
        await heritageNFT.getAddress(),
        0,
        { value: ethers.parseEther("1.5") }
      );

      const listing = await marketplace.getListing(await heritageNFT.getAddress(), 0);
      expect(listing.highestBid).to.equal(ethers.parseEther("1.5"));
      expect(listing.highestBidder).to.equal(buyer.address);
    });

    it("Should not allow bids lower than current highest bid", async function () {
      // Create and list NFT for auction
      await heritageNFT.connect(seller).createNFT(
        "Test NFT",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "Cultural",
        "Test Heritage",
        "Test Location",
        "Modern"
      );
      await heritageNFT.connect(seller).approve(await marketplace.getAddress(), 0);
      await marketplace.connect(seller).listNFTForAuction(
        await heritageNFT.getAddress(),
        0,
        ethers.parseEther("1.0"),
        86400
      );

      // Place first bid
      await marketplace.connect(buyer).placeBid(
        await heritageNFT.getAddress(),
        0,
        { value: ethers.parseEther("1.5") }
      );

      // Try to place lower bid
      await expect(
        marketplace.connect(other).placeBid(
          await heritageNFT.getAddress(),
          0,
          { value: ethers.parseEther("1.2") }
        )
      ).to.be.revertedWith("Bid too low");
    });
  });

  describe("Offers", function () {
    it("Should allow making offers on NFTs", async function () {
      // Create an NFT
      await heritageNFT.connect(seller).createNFT(
        "Test NFT",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "Cultural",
        "Test Heritage",
        "Test Location",
        "Modern"
      );

      // Make offer
      await marketplace.connect(buyer).makeOffer(
        await heritageNFT.getAddress(),
        0,
        86400, // 1 day
        { value: ethers.parseEther("1.0") }
      );

      const offers = await marketplace.getOffers(await heritageNFT.getAddress(), 0);
      expect(offers.length).to.equal(1);
      expect(offers[0].offerer).to.equal(buyer.address);
      expect(offers[0].amount).to.equal(ethers.parseEther("1.0"));
    });

    it("Should allow accepting offers", async function () {
      // Create an NFT
      await heritageNFT.connect(seller).createNFT(
        "Test NFT",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "Cultural",
        "Test Heritage",
        "Test Location",
        "Modern"
      );

      // Approve marketplace
      await heritageNFT.connect(seller).approve(await marketplace.getAddress(), 0);

      // Make offer
      await marketplace.connect(buyer).makeOffer(
        await heritageNFT.getAddress(),
        0,
        86400,
        { value: ethers.parseEther("1.0") }
      );

      // Accept offer
      await marketplace.connect(seller).acceptOffer(
        await heritageNFT.getAddress(),
        0,
        0
      );

      // Check NFT ownership
      expect(await heritageNFT.ownerOf(0)).to.equal(buyer.address);
    });
  });
}); 