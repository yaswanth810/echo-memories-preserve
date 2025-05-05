import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 shadow-lg">
      <div className="container text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in">
          Preserve Memories, Prove Impact, Protect Heritage
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 animate-slide-up">
          A blockchain-based platform for creating immutable records of your most precious moments, impactful actions, and cultural heritage.
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
