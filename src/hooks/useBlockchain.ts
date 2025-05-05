import { useContext } from 'react';
import { BlockchainService } from '../services/blockchain';
import { WalletContext } from '../contexts/WalletContext';

export function useBlockchain() {
  const { address, provider, signer } = useContext(WalletContext);
  const blockchainService = new BlockchainService();

  if (provider && signer) {
    blockchainService.setProvider(provider, address);
  }

  blockchainService.mintNFT = async (nftData: { title: string; description: string; image: File | null; type: string }) => {
    console.log("Minting NFT with data:", nftData);
    // Simulate NFT minting
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "123", ...nftData });
      }, 1000);
    });
  };

  return {
    blockchainService,
    isConnected: !!address,
    account: address
  };
}