const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy HeritageNFT
  const HeritageNFT = await hre.ethers.getContractFactory("HeritageNFT");
  const heritageNFT = await HeritageNFT.deploy();
  await heritageNFT.waitForDeployment();
  console.log("HeritageNFT deployed to:", await heritageNFT.getAddress());

  // Deploy ProofOfGoodNFT
  const ProofOfGoodNFT = await hre.ethers.getContractFactory("ProofOfGoodNFT");
  const proofOfGoodNFT = await ProofOfGoodNFT.deploy();
  await proofOfGoodNFT.waitForDeployment();
  console.log("ProofOfGoodNFT deployed to:", await proofOfGoodNFT.getAddress());

  // Deploy SoulboundNFT
  const SoulboundNFT = await hre.ethers.getContractFactory("SoulboundNFT");
  const soulboundNFT = await SoulboundNFT.deploy();
  await soulboundNFT.waitForDeployment();
  console.log("SoulboundNFT deployed to:", await soulboundNFT.getAddress());

  // Deploy Marketplace
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();
  console.log("Marketplace deployed to:", await marketplace.getAddress());

  console.log("All contracts deployed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 