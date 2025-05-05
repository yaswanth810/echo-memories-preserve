import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlockchain } from '../services/blockchain';
import { CreateNFTData } from '../types/nft';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'react-hot-toast';

export function CreateNFTPage() {
  const navigate = useNavigate();
  const blockchain = useBlockchain();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateNFTData>({
    name: '',
    description: '',
    mediaType: 'image',
    mediaUrl: '',
    type: 'heritage',
    culturalSignificance: '',
    historicalContext: '',
    preservationStatus: '',
    impact: '',
    verification: '',
    beneficiary: '',
    soulConnection: '',
    soulPurpose: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let txHash: string;
      switch (formData.type) {
        case 'heritage':
          txHash = await blockchain.mintHeritageNFT(formData);
          break;
        case 'proofOfGood':
          txHash = await blockchain.mintProofOfGoodNFT(formData);
          break;
        case 'soulbound':
          txHash = await blockchain.mintSoulboundNFT(formData);
          break;
        default:
          throw new Error('Invalid NFT type');
      }

      toast.success('NFT created successfully!');
      navigate('/nfts');
    } catch (error) {
      console.error('Error creating NFT:', error);
      toast.error('Failed to create NFT');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value as CreateNFTData['type'] }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New NFT</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">NFT Type</label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select NFT type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heritage">Heritage NFT</SelectItem>
                <SelectItem value="proofOfGood">Proof of Good NFT</SelectItem>
                <SelectItem value="soulbound">Soulbound NFT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Media Type</label>
            <Select
              value={formData.mediaType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, mediaType: value }))}
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

          <div>
            <label className="block text-sm font-medium mb-2">Media URL</label>
            <Input
              name="mediaUrl"
              value={formData.mediaUrl}
              onChange={handleChange}
              required
            />
          </div>

          {formData.type === 'heritage' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Cultural Significance</label>
                <Input
                  name="culturalSignificance"
                  value={formData.culturalSignificance}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Historical Context</label>
                <Input
                  name="historicalContext"
                  value={formData.historicalContext}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preservation Status</label>
                <Input
                  name="preservationStatus"
                  value={formData.preservationStatus}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {formData.type === 'proofOfGood' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Impact</label>
                <Input
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Verification</label>
                <Input
                  name="verification"
                  value={formData.verification}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Beneficiary Address</label>
                <Input
                  name="beneficiary"
                  value={formData.beneficiary}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {formData.type === 'soulbound' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Soul Connection</label>
                <Input
                  name="soulConnection"
                  value={formData.soulConnection}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Soul Purpose</label>
                <Input
                  name="soulPurpose"
                  value={formData.soulPurpose}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/nfts')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create NFT'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 