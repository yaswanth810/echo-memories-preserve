
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookMarked, Award, Landmark, Wallet } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 border-b border-echo-sepia/20 bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold text-xl text-echo-coffee">
          <span className="text-echo-rust font-bold">ECHO</span> Marketplace
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/memories" className="flex items-center gap-1 text-echo-coffee hover:text-echo-rust transition-colors">
              <BookMarked size={18} />
              <span>Memories</span>
            </Link>
            <Link to="/proof-of-good" className="flex items-center gap-1 text-echo-coffee hover:text-echo-rust transition-colors">
              <Award size={18} />
              <span>Impact</span>
            </Link>
            <Link to="/heritage" className="flex items-center gap-1 text-echo-coffee hover:text-echo-rust transition-colors">
              <Landmark size={18} />
              <span>Heritage</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-echo-clay text-echo-clay hover:bg-echo-clay/10">
              Connect Wallet
              <Wallet size={16} className="ml-2" />
            </Button>
            <Button className="bg-echo-rust hover:bg-echo-rust/90 text-white">Sign In</Button>
          </div>
        </div>
        
        <button 
          className="md:hidden text-echo-coffee"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 flex flex-col gap-4 border-b border-echo-sepia/20">
          <Link to="/memories" className="flex items-center gap-2 py-2 text-echo-coffee hover:text-echo-rust transition-colors">
            <BookMarked size={18} />
            <span>Memories</span>
          </Link>
          <Link to="/proof-of-good" className="flex items-center gap-2 py-2 text-echo-coffee hover:text-echo-rust transition-colors">
            <Award size={18} />
            <span>Impact</span>
          </Link>
          <Link to="/heritage" className="flex items-center gap-2 py-2 text-echo-coffee hover:text-echo-rust transition-colors">
            <Landmark size={18} />
            <span>Heritage</span>
          </Link>
          <div className="flex flex-col gap-3 pt-4 border-t border-echo-sepia/20">
            <Button variant="outline" className="border-echo-clay text-echo-clay hover:bg-echo-clay/10 justify-between">
              Connect Wallet
              <Wallet size={16} />
            </Button>
            <Button className="bg-echo-rust hover:bg-echo-rust/90 text-white">Sign In</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
