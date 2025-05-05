import { useState } from 'react';
import { useBlockchain } from '../../services/blockchain';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { formatEther } from 'ethers';

interface BuyNFTFormProps {
  nftId: number;
  price: number;
  onSuccess?: () => void;
}

export function BuyNFTForm({ nftId, price, onSuccess }: BuyNFTFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const blockchain = useBlockchain();

  const handleBuy = async () => {
    try {
      setIsLoading(true);
      await blockchain.buyNFT(nftId, price);
      toast({
        title: 'Success',
        description: 'NFT purchased successfully',
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error buying NFT:', error);
      toast({
        title: 'Error',
        description: 'Failed to purchase NFT',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy NFT</CardTitle>
        <CardDescription>
          Purchase this NFT for {formatEther(price)} ETH
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleBuy} disabled={isLoading} className="w-full">
          {isLoading ? 'Purchasing...' : 'Buy Now'}
        </Button>
      </CardContent>
    </Card>
  );
} 