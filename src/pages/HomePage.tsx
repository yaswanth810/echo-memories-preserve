import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HeroSection } from '../components/HeroSection';
import { NFTTypeSection } from '../components/NFTTypeSection';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore NFT Types</h2>
          <p className="text-muted-foreground">
            Discover different types of NFTs that preserve memories and document impact
          </p>
        </div>
        
        <NFTTypeSection />
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/nfts">View All NFTs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 