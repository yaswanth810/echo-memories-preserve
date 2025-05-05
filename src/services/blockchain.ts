import { ethers, Contract } from 'ethers';
import { NFT, Offer, Listing, CreateNFTData } from '../types/nft';
import { useWallet } from '../hooks/useWallet';
import { CONTRACT_ADDRESSES } from '../config/contracts';
import { BigNumber } from 'ethers';

// Contract ABIs
const HERITAGE_ABI = [
  'function createNFT(string name, string description, string mediaType, string mediaUrl, string metadata, string culturalSignificance, string historicalContext, string preservationStatus) external returns (uint256)',
  'function getNFT(uint256 tokenId) external view returns (tuple(string name, string description, string mediaType, string mediaUrl, string metadata, uint256 timestamp, address creator, string culturalSignificance, string historicalContext, string preservationStatus))',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)'
];

const PROOF_OF_GOOD_ABI = [
  'function createNFT(string name, string description, string mediaType, string mediaUrl, string metadata, string impact, string verification, address beneficiary) external returns (uint256)',
  'function getNFT(uint256 tokenId) external view returns (tuple(string name, string description, string mediaType, string mediaUrl, string metadata, uint256 timestamp, address creator, string impact, string verification, address beneficiary))',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)'
];

const SOULBOUND_ABI = [
  'function createNFT(string name, string description, string mediaType, string mediaUrl, string metadata, string soulConnection, string soulPurpose) external returns (uint256)',
  'function getNFT(uint256 tokenId) external view returns (tuple(string name, string description, string mediaType, string mediaUrl, string metadata, uint256 timestamp, address creator, string soulConnection, string soulPurpose))',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)'
];

const MARKETPLACE_ABI = [
  'function listNFT(address nftContract, uint256 tokenId, uint256 price) external',
  'function buyNFT(uint256 listingId) external payable',
  'function cancelListing(uint256 listingId) external',
  'function makeOffer(uint256 listingId, uint256 amount, uint256 duration) external payable',
  'function acceptOffer(uint256 listingId, address buyer) external',
  'function cancelOffer(uint256 listingId) external',
  'function getListing(uint256 listingId) external view returns (tuple(address seller, uint256 price, bool active, bool isAuction, uint256 auctionEndTime, uint256 highestBid, address highestBidder))',
  'function getOffers(uint256 listingId) external view returns (tuple(address offerer, uint256 amount, uint256 expirationTime, bool active)[])',
  'function getListings() external view returns (uint256[])',
  'function getListingsBySeller(address seller) external view returns (uint256[])'
];

export class BlockchainService {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private marketplaceContract: ethers.Contract | null = null;
  private marketplaceAddress = CONTRACT_ADDRESSES.marketplace;

  constructor() {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = this.provider.getSigner();
      } catch (error) {
        console.error("Error initializing Web3Provider:", error);
      }      
    } else {
      console.error("Ethereum provider not found. Please install MetaMask.");
    }
  }

  setProvider(provider: ethers.providers.Web3Provider | null, signer: ethers.Signer | null) {
    this.provider = provider;
    this.signer = signer;
  }

  getContract(address: string, abi: any) {
    if (!this.signer) {
      throw new Error("Signer is not initialized. Please connect your wallet.");
    }
    return new ethers.Contract(address, abi, this.signer);
  }

  getContractProvider(address: string, abi: any) {
    if (!this.provider) {
      throw new Error("Provider is not initialized. Please install MetaMask.");
    }
    return new ethers.Contract(address, abi, this.provider);
  }

  private async getSigner(): Promise<ethers.JsonRpcSigner> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }
    return await this.provider.getSigner();
  }

  private async getMarketplaceContract(): Promise<ethers.Contract> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    if (!this.marketplaceContract) {
      this.marketplaceContract = new ethers.Contract(
        this.marketplaceAddress,
        MARKETPLACE_ABI,
        this.provider
      );
    }

    return this.marketplaceContract;
  }

  async mintHeritageNFT(data: CreateNFTData): Promise<string> {
    try {
      if (!this.provider || !this.signer) {
        throw new Error('Wallet not connected');
      }

      const contract = await this.getContract(CONTRACT_ADDRESSES.heritage, HERITAGE_ABI);
      const metadata = JSON.stringify({
        type: data.type,
        culturalSignificance: data.culturalSignificance,
        historicalContext: data.historicalContext,
        preservationStatus: data.preservationStatus
      });

      const tx = await contract.createNFT(
        data.name,
        data.description,
        data.mediaType,
        data.mediaUrl,
        metadata,
        data.culturalSignificance || '',
        data.historicalContext || '',
        data.preservationStatus || '',
      );

      const receipt = await tx.wait();
      return receipt.hash;
    } catch (error) {
      console.error('Error minting Heritage NFT:', error);
      throw error;
    }
  }

  async mintProofOfGoodNFT(data: CreateNFTData): Promise<string> {
    try {
      if (!this.provider || !this.signer) {
        throw new Error('Wallet not connected');
      }

      const contract = await this.getContract(CONTRACT_ADDRESSES.proofOfGood, PROOF_OF_GOOD_ABI);
      const metadata = JSON.stringify({
        type: data.type,
        impact: data.impact,
        verification: data.verification,
        beneficiary: data.beneficiary
      });

      const tx = await contract.createNFT(
        data.name,
        data.description,
        data.mediaType,
        data.mediaUrl,
        metadata,
        '',
        '',
        '',
        data.impact || '',
        data.verification || '',
        data.beneficiary || ethers.ZeroAddress,
        '',
        ''
      );

      const receipt = await tx.wait();
      return receipt.hash;
    } catch (error) {
      console.error('Error minting Proof of Good NFT:', error);
      throw error;
    }
  }

  async mintSoulboundNFT(data: CreateNFTData): Promise<string> {
    try {
      if (!this.provider || !this.signer) {
        throw new Error('Wallet not connected');
      }

      const contract = await this.getContract(CONTRACT_ADDRESSES.soulbound, SOULBOUND_ABI);
      const metadata = JSON.stringify({
        type: data.type,
        soulConnection: data.soulConnection,
        soulPurpose: data.soulPurpose
      });

      const tx = await contract.createNFT(
        data.name,
        data.description,
        data.mediaType,
        data.mediaUrl,
        metadata,
        '',
        '',
        '',
        '',
        '',
        ethers.ZeroAddress,
        data.soulConnection || '',
        data.soulPurpose || ''
      );

      const receipt = await tx.wait();
      return receipt.hash;
    } catch (error) {
      console.error('Error minting Soulbound NFT:', error);
      throw error;
    }
  }

  async getNFT(tokenId: string, type: 'heritage' | 'proofOfGood' | 'soulbound'): Promise<NFT> {
    try {
      const contract = await this.getContract(CONTRACT_ADDRESSES[type], type === 'heritage' ? HERITAGE_ABI : type === 'proofOfGood' ? PROOF_OF_GOOD_ABI : SOULBOUND_ABI);
      const [owner, nftData] = await Promise.all([
        contract.ownerOf(tokenId),
        contract.getNFT(tokenId)
      ]);

      const metadata = JSON.parse(nftData.metadata);

      return {
        id: tokenId,
        name: nftData.name,
        description: nftData.description,
        mediaType: nftData.mediaType,
        mediaUrl: nftData.mediaUrl,
        metadata: nftData.metadata,
        owner: owner,
        creator: nftData.creator,
        type: type,
        ...(type === 'heritage' && {
          culturalSignificance: nftData.culturalSignificance,
          historicalContext: nftData.historicalContext,
          preservationStatus: nftData.preservationStatus
        }),
        ...(type === 'proofOfGood' && {
          impact: nftData.impact,
          verification: nftData.verification,
          beneficiary: nftData.beneficiary
        }),
        ...(type === 'soulbound' && {
          soulConnection: nftData.soulConnection,
          soulPurpose: nftData.soulPurpose
        })
      };
    } catch (error) {
      console.error('Error getting NFT:', error);
      throw error;
    }
  }

  async connectWallet(): Promise<string[]> {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask or another Web3 wallet');
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await provider.listAccounts();
    this.setProvider(provider, await provider.getSigner());
    return accounts;
  }

  async getAccounts(): Promise<string[]> {
      if (!this.provider) {
        return [];
      }
    return await this.provider.listAccounts();
  }

  async listNFT(nftContract: string, tokenId: string, price: string): Promise<void> {
    try {
      const contract = await this.getMarketplaceContract();
      const signer = this.signer;
      const contractWithSigner = contract.connect(signer) as ethers.Contract;

      const tx = await contractWithSigner.listNFT(
        nftContract,
        tokenId,
        ethers.parseEther(price)
      );
      await tx.wait();
    } catch (error) {
      console.error('Error listing NFT:', error);
      throw error;
    }
  }

  async buyNFT(listingId: string, price: string): Promise<void> {
    try {
      const contract = await this.getMarketplaceContract();
      const signer = this.signer;
      const contractWithSigner = contract.connect(signer) as ethers.Contract;

      const tx = await contractWithSigner.buyNFT(listingId, {
        value: ethers.parseEther(price)
      });
      await tx.wait();
    } catch (error) {
      console.error('Error buying NFT:', error);
      throw error;
    }
  }

  async cancelListing(listingId: string): Promise<void> {
    try {
      const contract = await this.getMarketplaceContract();
      const signer = this.signer;
      const contractWithSigner = contract.connect(signer) as ethers.Contract;

      const tx = await contractWithSigner.cancelListing(listingId);
      await tx.wait();
    } catch (error) {
      console.error('Error canceling listing:', error);
      throw error;
    }
  }

  async makeOffer(listingId: string, price: string): Promise<void> {
    try {
      const contract = await this.getMarketplaceContract();
      const signer = this.signer;
      const contractWithSigner = contract.connect(signer) as ethers.Contract;

      const tx = await contractWithSigner.makeOffer(listingId, ethers.parseEther(price), 86400, { //duration 24hs

        value: ethers.parseEther(price),
      });
      await tx.wait();
    } catch (error) {
      console.error('Error making offer:', error);
      throw error;
    }
  }

  async acceptOffer(listingId: string, buyer: string): Promise<void> {
    try {
      const contract = await this.getMarketplaceContract();
      const signer = this.signer;
      const contractWithSigner = contract.connect(signer) as ethers.Contract;

      const tx = await contractWithSigner.acceptOffer(listingId, buyer);
      await tx.wait();
    } catch (error) {
      console.error('Error accepting offer:', error);
      throw error;
    }
  }

  async cancelOffer(listingId: string): Promise<void> {
    try {
      const contract = await this.getMarketplaceContract();
      const signer = this.signer;
      const contractWithSigner = contract.connect(signer) as ethers.Contract;

      const tx = await contractWithSigner.cancelOffer(listingId);
      await tx.wait();
    } catch (error) {
      console.error('Error canceling offer:', error);
      throw error;
    }
  }

  async getMarketplaceListings(): Promise<Listing[]> {
    try {
      const marketplaceContract = await this.getMarketplaceContract();
      const listingIds: BigNumber[] = await marketplaceContract.getListings();
      const listingsPromises = listingIds.map(async (listingId) => {
        const listing = await marketplaceContract.getListing(listingId);
        return {
          listingId: listingId.toString(),
          seller: listing.seller,
          price: ethers.formatEther(listing.price),
          active: listing.active,
          isAuction: listing.isAuction,
          auctionEndTime: listing.auctionEndTime.toString(),
          highestBid: ethers.formatEther(listing.highestBid),
          highestBidder: listing.highestBidder,
        };
      });
      const listings = await Promise.all(listingsPromises);
      return listings;
    } catch (error) {
      console.error('Error getting marketplace listings:', error);
      throw error;
    }
  }

  async getListing(listingId: string): Promise<Listing> {
    try {
      const marketplaceContract = await this.getMarketplaceContract();
      const listing = await marketplaceContract.getListing(listingId);
      return {
        listingId: listingId,
        seller: listing.seller,
        price: ethers.formatEther(listing.price),
      }
    } catch (error) {
      throw new Error('Error getting listing:');
    }
  }

  async getNFTsByOwner(owner: string): Promise<NFT[]> {
    if (!owner) return [];    const nfts: NFT[] = [];
    const types: ('heritage' | 'proofOfGood' | 'soulbound')[] = ['heritage', 'proofOfGood', 'soulbound'];

    for (const type of types) {
      const contract = await this.getContractProvider(CONTRACT_ADDRESSES[type], type === 'heritage' ? HERITAGE_ABI : type === 'proofOfGood' ? PROOF_OF_GOOD_ABI : SOULBOUND_ABI);
      const balance = await contract.balanceOf(owner);

      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(owner, i);
        const nft = await this.getNFT(tokenId.toString(), type);
        nfts.push(nft);
      }
    }

    return nfts;
  }

  async getNFTsByType(type: 'heritage' | 'proofOfGood' | 'soulbound', address:string): Promise<NFT[]> {
    if (!address) return [];    
    const allNFTs = await this.getNFTsByOwner(address);
    return allNFTs.filter(nft => nft.type === type);
  }
}

// Export a singleton instance
export const blockchainService = new BlockchainService();

// Also export the hook for React components
export const useBlockchain = () => {
  const { provider, account } = useWallet();
  
  // Update the service instance when wallet changes
  if (provider && account) {
    blockchainService.setProvider(provider, account);
  }

  return blockchainService;
};