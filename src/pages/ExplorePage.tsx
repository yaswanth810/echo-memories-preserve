import { useState } from "react";
import { NFTCard } from "@/components/NFTCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: string;
  owner?: string;
  likes?: number;
  views?: number;
  type?: "memory" | "impact" | "heritage";
}

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: "1",
      title: "Community Garden",
      description: "A sustainable community garden initiative.",
      imageUrl: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00",
      type: "impact",
      likes: 24,
      views: 156,
      owner: "0x1234...5678"
    },
    {
      id: "2",
      title: "Ancient Temple",
      description: "Preserving cultural heritage through digital documentation.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      type: "heritage",
      likes: 56,
      views: 234,
      owner: "0x8765...4321"
    },
    {
      id: "3",
      title: "Family Reunion",
      description: "A special moment captured during our annual family reunion.",
      imageUrl: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00",
      type: "memory",
      likes: 42,
      views: 189,
      owner: "0x1234...5678"
    }
  ]);

  const filteredNFTs = nfts.filter(nft => 
    nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-echo-coffee dark:text-echo-cyber-neon">Explore NFTs</h1>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-echo-coffee/50 dark:text-echo-cyber-neon/50" size={16} />
            <Input
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-echo-dark-secondary border-echo-sepia/20 dark:border-echo-cyber-neon/20"
            />
          </div>
          
          <Button variant="outline" className="border-echo-clay dark:border-echo-cyber-neon text-echo-clay dark:text-echo-cyber-neon hover:bg-echo-clay/10 dark:hover:bg-echo-cyber-neon/10">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNFTs.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-echo-coffee/80 dark:text-echo-cyber-neon/80 mb-4">No NFTs found</h3>
          <p className="text-echo-coffee/60 dark:text-echo-cyber-neon/60">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
} 