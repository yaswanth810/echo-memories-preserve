import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { NFTGrid } from '../components/nft/NFTGrid';
import { useBlockchain } from '../hooks/useBlockchain';
import { NFT } from '../types/nft';
import { useWallet } from '../hooks/useWallet';
import { PlusIcon } from '@radix-ui/react-icons';

export function HeritagePage() {
  const [heritageNFTs, setHeritageNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { blockchainService } = useBlockchain();
  const { address } = useWallet();

  useEffect(() => {
    const fetchHeritageNFTs = async () => {
      try {
        const nfts = await blockchainService.getNFTsByType('heritage', address);
        setHeritageNFTs(nfts);
      } catch (error) {
        console.error('Error fetching heritage NFTs:', error);
      } finally {
        setLoading(false);
      }
    };    

    fetchHeritageNFTs();
  }, [blockchainService, address]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Heritage NFTs</h1>
        <Button onClick={() => navigate('/create-nft?type=heritage')} className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Create Heritage NFT
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <NFTGrid nfts={heritageNFTs} />
      )}
    </div>
  );
} 