import { useState } from "react";
import { NFTCard } from "@/components/NFTCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function ProofOfGoodPage() {
  const [nfts, setNfts] = useState([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-echo-coffee">Proof of Good NFTs</h1>
        <Link to="/create-nft?type=proof-of-good">
          <Button className="bg-echo-rust hover:bg-echo-rust/90 text-white">
            <Plus size={16} className="mr-2" />
            Create Proof of Good NFT
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>

      {nfts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-echo-coffee/80 mb-4">No Proof of Good NFTs found</h3>
          <p className="text-echo-coffee/60">Create your first Proof of Good NFT to document your positive impact.</p>
        </div>
      )}
    </div>
  );
} 