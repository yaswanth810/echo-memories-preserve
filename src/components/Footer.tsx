import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-foreground/70 py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-24">
        <div>
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-foreground">
            <span className="text-foreground font-bold">ECHO</span> Marketplace
          </Link>
          <p className="mt-3 text-sm text-foreground/70">
            Preserve Memories. Prove Impact. Protect Heritage.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-foreground transition-colors text-foreground/70">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-foreground transition-colors text-foreground/70">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-foreground transition-colors text-foreground/70">
              <Github size={20} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold text-foreground mb-4">NFT Types</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link to="/memories" className="hover:text-foreground">Soul-bound Memories</Link></li>
            <li><Link to="/proof-of-good" className="hover:text-foreground">Proof-of-Good NFTs</Link></li>
            <li><Link to="/heritage" className="hover:text-foreground">Heritage NFTs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold text-foreground mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#" className="hover:text-foreground">Documentation</a></li>
            <li><a href="#" className="hover:text-foreground">Blockchain Basics</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy Guide</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold text-foreground mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#" className="hover:text-foreground">About Us</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        <p className="text-foreground/70">© 2024 ECHO Marketplace. All rights reserved.</p>
        <p className="flex justify-center items-center mt-12 text-foreground/70">
          Built with <Heart size={14} className="mx-1 text-foreground" /> for the preservation of memories.
        </p>
      </div>
    </footer>
  );
}
