import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import NFTTypeSection from "@/components/NFTTypeSection";
import NFTCard from "@/components/NFTCard";
import { Button } from "@/components/ui/button";
import { BookMarked, Award, Landmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Sample featured NFTs data
  const featuredNFTs = [
    {
      type: "memory" as const,
      title: "Summer in Amalfi, 1998",
      description: "A collection of treasured family memories from our trip to the Amalfi Coast.",
      imageSrc: "https://images.unsplash.com/photo-1473091541738-6eb2e754ff70",
      creator: "Maria Rossi",
      tags: ["Family", "Travel", "Italy"],
      isPrivate: true
    },
    {
      type: "impact" as const,
      title: "Ocean Cleanup Initiative",
      description: "Documentation of our beach cleanup efforts that removed 500kg of plastic.",
      imageSrc: "https://images.unsplash.com/photo-1618277610180-4675adfb30ab",
      creator: "Ocean Guardians",
      tags: ["Environment", "Community", "SDG14"],
      isVerified: true
    },
    {
      type: "heritage" as const,
      title: "Traditional Weaving Techniques",
      description: "Preservation of ancient weaving methods from indigenous communities.",
      imageSrc: "https://images.unsplash.com/photo-1459183885421-5cc683b8dbba",
      creator: "Heritage Collective",
      tags: ["Crafts", "Indigenous", "Tradition"]
    }
  ];

  return (
    <Layout>
      <HeroSection />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NFTTypeSection
            title="Soul Bound Memories"
            description="Create immutable records of your most precious memories that can never be sold or transferred. Perfect for preserving family stories, personal milestones, and emotional moments that deserve to be remembered forever."
            icon={<BookMarked size={24} className="text-white" />}
            imageSrc="https://images.unsplash.com/photo-1456318019777-ccdc4d5b2396"
            buttonLink="/create-nft?type=soulbound"
            buttonText="Create a Memory"
            tags={["Family History", "Personal Milestones", "Private Sharing", "Immutable"]}
            color="bg-blue-500"
            reverse={false}
          />
          <NFTTypeSection
            title="Proof-of-Good NFTs"
            description="Document and verify positive actions and real-world impact. Whether it's environmental work, community service, or acts of kindness, create an immutable record of the good you've contributed to the world."
            icon={<Award size={24} className="text-white" />}
            imageSrc="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
            buttonLink="/create-nft?type=proofOfGood"
            buttonText="Document Impact"
            tags={["Social Impact", "Verification", "SDGs", "Community Work"]}
            color="bg-green-500"
            reverse={true}
          />
          <NFTTypeSection
            title="Heritage NFTs"
            description="Preserve cultural artifacts, traditions, languages, and practices. Create NFTs that safeguard the richness of human heritage for future generations."
            icon={<Landmark size={24} className="text-white" />}
            imageSrc="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
            buttonLink="/create-nft?type=heritage"
            buttonText="Preserve Heritage"
            tags={["Culture", "Tradition", "Language", "Artifacts"]}
            color="bg-yellow-500"
            reverse={false}
          />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-echo-coffee mb-2">Featured Creations</h2>
              <p className="text-echo-coffee/70">Discover meaningful memories, impactful actions, and cultural heritage</p>
            </div>
            <Link to="/explore">
              <Button variant="link" className="text-echo-rust flex items-center gap-1">
                View all
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNFTs.map((nft, index) => (
              <NFTCard
                key={index}
                {...nft}
                onClick={() => console.log(`Viewing ${nft.title}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-echo-sepia/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-echo-coffee mb-4">Ready to Preserve What Matters?</h2>
            <p className="text-echo-coffee/80 mb-8">
              Start creating your own digital legacy today. No technical expertise required.
            </p>
            <Link to="/create">
              <Button size="lg" className="bg-echo-rust hover:bg-echo-rust/90 text-white">
                Start Creating
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
