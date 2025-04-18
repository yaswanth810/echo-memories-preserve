
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-24 bg-gradient-to-b from-echo-sepia/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-echo-coffee mb-6 leading-tight animate-fade-in">
            Preserve Memories. Prove Impact. Protect Heritage.
          </h1>
          
          <p className="text-xl text-echo-coffee/80 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            ECHO Marketplace is a blockchain-based platform designed to help people preserve meaningful memories, 
            document positive impact, and safeguard cultural heritage through specialized NFTs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="bg-echo-rust hover:bg-echo-rust/90 text-white">
                Create Your First NFT
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-echo-clay text-echo-clay hover:bg-echo-clay/10">
                Explore the Marketplace
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-echo-sepia/20 shadow-sm">
              <h3 className="text-echo-rust font-medium mb-2">Soul bound Memories</h3>
              <p className="text-echo-coffee/80 text-sm">Personal, emotional NFTs that can never be sold or transferred</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-echo-sepia/20 shadow-sm">
              <h3 className="text-echo-rust font-medium mb-2">Proof-of-Good NFTs</h3>
              <p className="text-echo-coffee/80 text-sm">Immutable records of positive actions and verified real-world impact</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-echo-sepia/20 shadow-sm">
              <h3 className="text-echo-rust font-medium mb-2">Heritage NFTs</h3>
              <p className="text-echo-coffee/80 text-sm">Preservation of cultural artifacts, traditions, languages, and practices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
