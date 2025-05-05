import { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { NFTCard } from '../components/nft/NFTCard';
import { NFT } from '../types/nft';
import { useBlockchain } from '../services/blockchain';
import { useToast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'react-hot-toast';
import { Search, Plus } from 'lucide-react';
import { NFTGrid } from '../components/nft/NFTGrid';
import { PlusIcon } from '@radix-ui/react-icons';
import { Tab } from '../components/ui/tabs';
import { useNavigate } from 'react-router-dom';

export function NFTPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected, account } = useWallet();
  const blockchain = useBlockchain();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('marketplace');

  const fetchNFTs = async () => {
    if (!isConnected || !account) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // First try to fetch marketplace NFTs
      let marketplaceNFTs: NFT[] = [];
      try {
        marketplaceNFTs = await blockchain.getNFTsForSale();
      } catch (error) {
        console.error('Error fetching marketplace NFTs:', error);
        toast({
          title: 'Warning',
          description: 'Failed to fetch marketplace NFTs. Some items may not be displayed.',
          variant: 'default',
        });
      }
      setNfts(marketplaceNFTs);

      // Then try to fetch owned NFTs
      try {
        const myNFTs = await blockchain.getNFTsByOwner(account);
        setOwnedNFTs(myNFTs);
      } catch (error) {
        console.error('Error fetching owned NFTs:', error);
        toast({
          title: 'Warning',
          description: 'Failed to fetch your NFTs. Please try again later.',
          variant: 'default',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [isConnected, account]);

  const handleCreateNFT = () => {
    navigate('/create-nft');
  };

  const handleViewNFT = (nft: NFT) => {
    navigate(`/nfts/${nft.id}`);
  };

  const handleShareNFT = (nft: NFT) => {
    const url = `${window.location.origin}/nfts/${nft.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Link Copied',
        description: 'NFT link has been copied to clipboard!',
      });
    });
  };

  const filteredNFTs = (activeTab === 'marketplace' ? nfts : ownedNFTs).filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || nft.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600 mb-4">Please connect your wallet to view and manage NFTs</p>
          <Button onClick={() => navigate('/connect')}>Connect Wallet</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">NFT Marketplace</h1>
        <Button onClick={handleCreateNFT} className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Create NFT
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="owned">My NFTs</TabsTrigger>
        </TabsList>

        <div className="flex gap-4 my-4">
          <div className="flex-1">
            <Input
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="soulbound">Soulbound</SelectItem>
              <SelectItem value="proof-of-good">Proof of Good</SelectItem>
              <SelectItem value="heritage">Heritage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="marketplace" className="mt-4">
          {isLoading ? (
            <div className="text-center py-8">Loading marketplace NFTs...</div>
          ) : filteredNFTs.length > 0 ? (
            <NFTGrid
              nfts={filteredNFTs}
              onView={handleViewNFT}
              onShare={handleShareNFT}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No NFTs available in the marketplace</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="owned" className="mt-4">
          {isLoading ? (
            <div className="text-center py-8">Loading your NFTs...</div>
          ) : filteredNFTs.length > 0 ? (
            <NFTGrid
              nfts={filteredNFTs}
              onView={handleViewNFT}
              onShare={handleShareNFT}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">You don't own any NFTs yet</p>
              <Button onClick={handleCreateNFT} className="mt-4">
                Create Your First NFT
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 