export type NFTType = 'heritage' | 'proofOfGood' | 'soulbound';
export type MediaType = 'image' | 'video' | 'audio' | 'text';

export interface BaseNFT {
  id: string;
  name: string;
  description: string;
  mediaType: string;
  mediaUrl: string;
  metadata: string;
  owner: string;
  creator: string;
  type: NFTType;
}

export interface HeritageNFT extends BaseNFT {
  type: 'heritage';
  culturalSignificance: string;
  historicalContext: string;
  preservationStatus: string;
}

export interface ProofOfGoodNFT extends BaseNFT {
  type: 'proofOfGood';
  impact: string;
  verification: string;
  beneficiary: string;
}

export interface SoulboundNFT extends BaseNFT {
  type: 'soulbound';
  soulConnection: string;
  soulPurpose: string;
}

export type NFT = HeritageNFT | ProofOfGoodNFT | SoulboundNFT;

export interface CreateNFTData {
  name: string;
  description: string;
  mediaType: string;
  mediaUrl: string;
  type: NFTType;
  // Heritage specific
  culturalSignificance?: string;
  historicalContext?: string;
  preservationStatus?: string;
  // ProofOfGood specific
  impact?: string;
  verification?: string;
  beneficiary?: string;
  // Soulbound specific
  soulConnection?: string;
  soulPurpose?: string;
}

export interface Listing {
  seller: string;
  price: string;
  active: boolean;
  isAuction: boolean;
  auctionEndTime?: number;
  highestBid?: string;
  highestBidder?: string;
}

export interface Offer {
  offerer: string;
  amount: string;
  expirationTime: number;
  active: boolean;
} 