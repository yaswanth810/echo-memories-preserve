import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from '../hooks/useToast';
import { blockchainService } from "../services/blockchain";

interface WalletContextType {
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    // Listen for account changes
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        setAddress(null);
        setProvider(null);
        setSigner(null);
        blockchainService.setProvider(null, null);
      } else {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAddress(accounts[0]);
        setProvider(provider);
        setSigner(signer);
        blockchainService.setProvider(provider, signer);
      }
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask to use this application");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      
      setAddress(accounts[0]);
      setProvider(provider);
      setSigner(signer);
      blockchainService.setProvider(provider, signer);

      toast({
        title: 'Success',
        description: 'Wallet connected successfully',
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setProvider(null);
    setSigner(null);
    blockchainService.setProvider(null, null);
    toast({
      title: 'Success',
      description: 'Wallet disconnected',
    });
  };

  return (
    <WalletContext.Provider value={{ address, connectWallet, disconnectWallet, provider, signer }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}