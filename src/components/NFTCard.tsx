import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Eye, BookMarked, Award, Landmark, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  isPrivate?: boolean;
  isVerified?: boolean;
}

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const getIcon = () => {
    switch (nft.type) {
      case "memory": return <BookMarked size={16} />;
      case "impact": return <Award size={16} />;
      case "heritage": return <Landmark size={16} />;
      default: return <BookMarked size={16} />;
    }
  };
  
  const getTypeLabel = () => {
    switch (nft.type) {
      case "memory": return "Memory";
      case "impact": return "Impact";
      case "heritage": return "Heritage";
      default: return "NFT";
    }
  };
  
  const getTypeColor = () => {
    switch (nft.type) {
      case "memory": return "bg-blue-100 text-blue-800";
      case "impact": return "bg-green-100 text-green-800";
      case "heritage": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="group relative bg-input dark:bg-echo-dark-secondary rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
      <Link to={`/nfts/${nft.id}`}>
        <div className="relative aspect-square">
          <img
            src={nft.imageUrl}
            alt={nft.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={`${getTypeColor()} flex items-center gap-1 font-normal`}>
              {getIcon()}
              {getTypeLabel()}
            </Badge>
            {nft.isPrivate && (
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm flex items-center gap-1 font-normal">
                <Lock size={12} />
                Private
              </Badge>
            )}
            {nft.isVerified && (
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm flex items-center gap-1 font-normal border-green-500 text-green-700">
                <Award size={12} />
                Verified
              </Badge>
            )}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/nfts/${nft.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
            {nft.title}
          </h3>
        </Link>
        
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
          {nft.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-foreground/70">
              <Heart size={16} />
              <span className="text-sm text-foreground/70">{nft.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-echo-coffee/70 dark:text-echo-cyber-neon/70">
              <Eye size={16} />
              <span className="text-sm">{nft.views || 0}</span>
            </div>
          </div>

          {nft.price && (
            <div className="text-echo-rust dark:text-echo-cyber-neon font-medium">
              {nft.price} ETH
            </div>
          )}
        </div>

        {nft.owner && (
          <div className="mt-4 pt-4 border-t border-echo-sepia/20 dark:border-echo-cyber-neon/20">
            <p className="text-sm text-foreground/70">
              Owned by: {`${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}`}
            </p>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
