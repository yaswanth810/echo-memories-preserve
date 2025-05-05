import { useNavigate } from 'react-router-dom';
import { NFTCard } from './NFTCard';
import { NFT } from '../../types/nft';

interface NFTGridProps {
  nfts: NFT[];
}

export function NFTGrid({ nfts }: NFTGridProps) {
  const navigate = useNavigate();

  const handleViewNFT = (nft: NFT) => {
    navigate(`/nfts/${nft.id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <NFTCard
          key={nft.id}
          nft={nft}
          onView={() => handleViewNFT(nft)}
        />
      ))}
    </div>
  );
} 