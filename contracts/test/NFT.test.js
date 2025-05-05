const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Contracts", function () {
  let heritageNFT;
  let proofOfGoodNFT;
  let soulboundNFT;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const HeritageNFT = await ethers.getContractFactory("HeritageNFT");
    heritageNFT = await HeritageNFT.deploy();

    const ProofOfGoodNFT = await ethers.getContractFactory("ProofOfGoodNFT");
    proofOfGoodNFT = await ProofOfGoodNFT.deploy();

    const SoulboundNFT = await ethers.getContractFactory("SoulboundNFT");
    soulboundNFT = await SoulboundNFT.deploy();
  });

  describe("HeritageNFT", function () {
    it("Should create a new NFT", async function () {
      const tx = await heritageNFT.createNFT(
        "Test Heritage",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "{}",
        "Cultural Significance",
        "Historical Context",
        "Preserved",
        "High Impact",
        "Verified",
        addr1.address,
        "",
        ""
      );
      await tx.wait();

      const nftData = await heritageNFT.getNFT(1);
      expect(nftData.name).to.equal("Test Heritage");
      expect(nftData.description).to.equal("Test Description");
      expect(nftData.creator).to.equal(owner.address);
    });
  });

  describe("ProofOfGoodNFT", function () {
    it("Should create a new NFT", async function () {
      const tx = await proofOfGoodNFT.createNFT(
        "Test Proof",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "{}",
        "",
        "",
        "",
        "High Impact",
        "Verified",
        addr1.address,
        "",
        ""
      );
      await tx.wait();

      const nftData = await proofOfGoodNFT.getNFT(1);
      expect(nftData.name).to.equal("Test Proof");
      expect(nftData.description).to.equal("Test Description");
      expect(nftData.creator).to.equal(owner.address);
    });
  });

  describe("SoulboundNFT", function () {
    it("Should create a new NFT", async function () {
      const tx = await soulboundNFT.createNFT(
        "Test Soulbound",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "{}",
        "",
        "",
        "",
        "",
        "",
        addr1.address,
        "Strong Connection",
        "Important Purpose"
      );
      await tx.wait();

      const nftData = await soulboundNFT.getNFT(1);
      expect(nftData.name).to.equal("Test Soulbound");
      expect(nftData.soulConnection).to.equal("Strong Connection");
      expect(nftData.soulPurpose).to.equal("Important Purpose");
    });

    it("Should not allow transfers", async function () {
      const tx = await soulboundNFT.createNFT(
        "Test Soulbound",
        "Test Description",
        "image",
        "https://example.com/image.jpg",
        "{}",
        "",
        "",
        "",
        "",
        "",
        addr1.address,
        "Strong Connection",
        "Important Purpose"
      );
      await tx.wait();

      await expect(
        soulboundNFT.transferFrom(owner.address, addr1.address, 1)
      ).to.be.revertedWith("SoulboundNFT: token transfer not allowed");
    });
  });
}); 