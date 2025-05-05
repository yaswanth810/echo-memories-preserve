import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { useBlockchain } from '../../services/blockchain';
import { NFTType } from '../../types/nft';
import { useWallet } from '../../contexts/WalletContext';
import { useToast } from '../ui/use-toast';

export function CreateNFTForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected, connectWallet } = useWallet();
  const blockchain = useBlockchain();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'soulbound' as NFTType,
    mediaType: 'image' as 'image' | 'video' | 'audio',
    mediaUrl: '',
    impact: {
      description: '',
      verifiedBy: []
    },
    cultural: {
      description: '',
      validators: []
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const tokenId = await blockchain.mintNFT({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        mediaType: formData.mediaType,
        mediaUrl: formData.mediaUrl,
        impact: formData.type === 'proof-of-good' ? formData.impact : undefined,
        cultural: formData.type === 'heritage' ? formData.cultural : undefined
      });

      toast({
        title: 'Success',
        description: `NFT created successfully with ID: ${tokenId}`,
      });

      navigate('/nfts');
    } catch (error) {
      console.error('Error creating NFT:', error);
      toast({
        title: 'Error',
        description: 'Failed to create NFT. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {!isConnected && (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-md">
          <p className="text-yellow-700">Please connect your wallet to create an NFT</p>
          <Button 
            onClick={connectWallet} 
            className="mt-2"
            variant="outline"
          >
            Connect Wallet
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter NFT title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter NFT description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">NFT Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleSelectChange('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select NFT type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soulbound">Soulbound Memory</SelectItem>
            <SelectItem value="proof-of-good">Proof of Good</SelectItem>
            <SelectItem value="heritage">Heritage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mediaType">Media Type</Label>
        <Select
          value={formData.mediaType}
          onValueChange={(value) => handleSelectChange('mediaType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select media type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mediaUrl">Media URL</Label>
        <Input
          id="mediaUrl"
          name="mediaUrl"
          value={formData.mediaUrl}
          onChange={handleChange}
          required
          placeholder="Enter media URL"
        />
      </div>

      {formData.type === 'proof-of-good' && (
        <div className="space-y-2">
          <Label htmlFor="impact">Impact Description</Label>
          <Textarea
            id="impact"
            name="impact.description"
            value={formData.impact.description}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              impact: { ...prev.impact, description: e.target.value }
            }))}
            required
            placeholder="Describe the impact of this initiative"
          />
        </div>
      )}

      {formData.type === 'heritage' && (
        <div className="space-y-2">
          <Label htmlFor="cultural">Cultural Significance</Label>
          <Textarea
            id="cultural"
            name="cultural.description"
            value={formData.cultural.description}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              cultural: { ...prev.cultural, description: e.target.value }
            }))}
            required
            placeholder="Describe the cultural significance"
          />
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/nfts')}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !isConnected}
        >
          {isSubmitting ? 'Creating...' : 'Create NFT'}
        </Button>
      </div>
    </form>
  );
} 