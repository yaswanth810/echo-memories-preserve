
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookMarked, Award, Landmark, Lock, Eye } from "lucide-react";

interface NFTCardProps {
  type: "memory" | "impact" | "heritage";
  title: string;
  description: string;
  imageSrc: string;
  creator?: string;
  tags?: string[];
  isPrivate?: boolean;
  isVerified?: boolean;
  onClick?: () => void;
}

const NFTCard = ({
  type,
  title,
  description,
  imageSrc,
  creator,
  tags = [],
  isPrivate = false,
  isVerified = false,
  onClick
}: NFTCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "memory": return <BookMarked size={16} />;
      case "impact": return <Award size={16} />;
      case "heritage": return <Landmark size={16} />;
      default: return <BookMarked size={16} />;
    }
  };
  
  const getTypeLabel = () => {
    switch (type) {
      case "memory": return "Memory";
      case "impact": return "Impact";
      case "heritage": return "Heritage";
      default: return "NFT";
    }
  };
  
  const getTypeColor = () => {
    switch (type) {
      case "memory": return "bg-blue-100 text-blue-800";
      case "impact": return "bg-green-100 text-green-800";
      case "heritage": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white border-echo-sepia/20 animate-fade-in-up">
      <div className="relative h-48 overflow-hidden bg-echo-sepia/10">
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${getTypeColor()} flex items-center gap-1 font-normal`}>
            {getIcon()}
            {getTypeLabel()}
          </Badge>
          {isPrivate && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm flex items-center gap-1 font-normal">
              <Lock size={12} />
              Private
            </Badge>
          )}
          {isVerified && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm flex items-center gap-1 font-normal border-green-500 text-green-700">
              <Award size={12} />
              Verified
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-echo-coffee text-xl line-clamp-1">{title}</CardTitle>
        {creator && (
          <CardDescription className="text-echo-coffee/70">
            Created by {creator}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-echo-coffee/80 line-clamp-2 text-sm h-10">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-echo-sand/50 text-echo-coffee hover:bg-echo-sand text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-echo-sepia/10 pt-3">
        <Button 
          onClick={onClick} 
          variant="outline" 
          className="w-full border-echo-clay text-echo-clay hover:bg-echo-clay/10 flex items-center gap-2"
        >
          <Eye size={16} />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NFTCard;
