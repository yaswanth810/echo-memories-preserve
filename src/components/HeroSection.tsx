import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-400 to-blue-600 py-20 shadow-lg">
      <div className="container text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          Discover the power of preserving your memories
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Our platform provides you with the tools you need to preserve your most precious moments
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/create/memory">
            <Button className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 animate-bounce">
              Get Started
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-700 px-6 py-3">
              Explore NFTs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

