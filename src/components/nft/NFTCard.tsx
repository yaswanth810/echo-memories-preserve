import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { NFT } from '../../types/nft';
import { Eye, Share2, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import { useBlockchain } from '../../services/blockchain';
import { useToast } from '../ui/use-toast';

interface NFTCardProps {
  nft: NFT;
  onView: (nft: NFT) => void;
  onShare?: (nft: NFT) => void;
}

export function NFTCard({ nft, onView, onShare }: NFTCardProps) {
  const { isConnected, account } = useWallet();
  const blockchain = useBlockchain();
  const { toast } = useToast();

  const getMediaPreview = () => {
    return <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover rounded-t-lg" />;
  };

  const getTypeBadge = () => {
    switch (nft.type) {
      case 'soulbound':
        return <Badge variant="secondary">Soulbound Memory</Badge>;
      case 'proofOfGood':
        return <Badge variant="success">Proof of Good</Badge>;
      case 'heritage':
        return <Badge variant="default">Heritage</Badge>;
      default:
        return null;
    }
  };

  const getSpecificData = () => {
    switch (nft.type) {
      case 'heritage':
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Cultural Significance:</span> {nft.culturalSignificance}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Historical Context:</span> {nft.historicalContext}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Status:</span> {nft.preservationStatus}
            </p>
          </div>
        );
      case 'proofOfGood':
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Impact:</span> {nft.impact}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Verification:</span> {nft.verification}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Beneficiary:</span> {nft.beneficiary}
            </p>
          </div>
        );
      case 'soulbound':
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Soul Connection:</span> {nft.soulConnection}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Soul Purpose:</span> {nft.soulPurpose}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleBuy = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to buy NFTs',
        variant: 'destructive',
      });
      return;
    }

    try {
      await blockchain.buyNFT(nft.id, nft.price);
      toast({
        title: 'Success',
        description: 'NFT purchased successfully!',
      });
    } catch (error) {
      console.error('Error buying NFT:', error);
      toast({
        title: 'Error',
        description: 'Failed to buy NFT. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      {getMediaPreview()}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{nft.name}</CardTitle>
          {getTypeBadge()}
        </div>
        <CardDescription className="line-clamp-2">{nft.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {getSpecificData()}
        {nft.price && (
          <div className="mt-4">
            <p className="text-lg font-semibold">{nft.price} ETH</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onView(nft)}>
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        {nft.price && nft.owner !== account && (
          <Button onClick={handleBuy}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy
          </Button>
        )}
        {onShare && (
          <Button variant="outline" onClick={() => onShare(nft)}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 