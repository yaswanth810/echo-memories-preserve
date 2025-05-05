import { useState } from 'react';
import { NFTCard } from '@/components/NFTCard';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: string;
  owner?: string;
  likes?: number;
  views?: number;
}

export function MemoriesPage() {
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: '1',
      title: 'Family Reunion 2023',
      description: 'A special moment captured during our annual family reunion.',
      imageUrl: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00',
      likes: 42,
      views: 189,
      owner: '0x1234...5678',
    },
    {
      id: '2',
      title: 'Graduation Day',
      description: 'Celebrating the achievement of completing my education journey.',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
      likes: 36,
      views: 145,
      owner: '0x8765...4321',
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-foreground mb-12">
          Soulbound Memories
        </h1>
        <Link to="/create-nft?type=soulbound">
          <Button className="bg-accent text-white hover:bg-accent/80">
            <Plus size={16} className="mr-2" />
            Create Memory NFT
          </Button>
        </Link> 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div> 

      {nfts.length === 0 && (
        <div className="py-24 text-center"> 
          <p className="text-echo-coffee/60 dark:text-echo-cyber-neon/60">
            Create your first Soulbound Memory NFT to preserve your personal
            memories.
          </p> 
        </div>
      )}
    </div>
  );
} 