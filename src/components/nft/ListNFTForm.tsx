import { useState } from 'react';
import { useBlockchain } from '../../services/blockchain';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ListNFTFormProps {
  nftId: number;
  onSuccess?: () => void;
}

export function ListNFTForm({ nftId, onSuccess }: ListNFTFormProps) {
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const blockchain = useBlockchain();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast({
        title: 'Invalid Price',
        description: 'Please enter a valid price greater than 0',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      await blockchain.listNFT(nftId, Number(price));
      toast({
        title: 'Success',
        description: 'NFT listed for sale successfully',
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error listing NFT:', error);
      toast({
        title: 'Error',
        description: 'Failed to list NFT for sale',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>List NFT for Sale</CardTitle>
        <CardDescription>
          Set a price for your NFT and list it on the marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (ETH)</Label>
            <Input
              id="price"
              type="number"
              step="0.0001"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in ETH"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Listing...' : 'List for Sale'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 