
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-echo-sepia/10 border-t border-echo-sepia/20 py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-semibold text-xl text-echo-coffee">
              <span className="text-echo-rust font-bold">ECHO</span> Marketplace
            </Link>
            <p className="mt-3 text-echo-coffee/80 text-sm">
              Preserve Memories. Prove Impact. Protect Heritage.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-echo-coffee hover:text-echo-rust transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-echo-coffee hover:text-echo-rust transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-echo-coffee hover:text-echo-rust transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-echo-coffee mb-4">NFT Types</h3>
            <ul className="space-y-2 text-echo-coffee/80 text-sm">
              <li><Link to="/memories" className="hover:text-echo-rust transition-colors">Soul bound Memories</Link></li>
              <li><Link to="/proof-of-good" className="hover:text-echo-rust transition-colors">Proof-of-Good NFTs</Link></li>
              <li><Link to="/heritage" className="hover:text-echo-rust transition-colors">Heritage NFTs</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-echo-coffee mb-4">Resources</h3>
            <ul className="space-y-2 text-echo-coffee/80 text-sm">
              <li><a href="#" className="hover:text-echo-rust transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-echo-rust transition-colors">Blockchain Basics</a></li>
              <li><a href="#" className="hover:text-echo-rust transition-colors">Privacy Guide</a></li>
              <li><a href="#" className="hover:text-echo-rust transition-colors">Heritage Guidelines</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-echo-coffee mb-4">Company</h3>
            <ul className="space-y-2 text-echo-coffee/80 text-sm">
              <li><a href="#" className="hover:text-echo-rust transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-echo-rust transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-echo-rust transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-echo-rust transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-echo-sepia/20 mt-8 pt-6 text-center text-echo-coffee/70 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 ECHO Marketplace. All rights reserved.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Built with <Heart size={14} className="mx-1 text-echo-rust" /> for the preservation of memories
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
