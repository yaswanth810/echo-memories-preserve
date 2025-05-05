import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl text-white hover:text-gray-200">
            <span className="text-white font-bold">ECHO</span> Marketplace
          </Link>
          <p className="mt-3 text-sm text-gray-300">
            Preserve Memories. Prove Impact. Protect Heritage.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-white transition-colors text-gray-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors text-gray-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors text-gray-300">
              <Github size={20} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-white mb-4">NFT Types</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/memories" className="hover:text-white">Soul-bound Memories</Link></li>
            <li><Link to="/proof-of-good" className="hover:text-white">Proof-of-Good NFTs</Link></li>
            <li><Link to="/heritage" className="hover:text-white">Heritage NFTs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Documentation</a></li>
            <li><a href="#" className="hover:text-white">Blockchain Basics</a></li>
            <li><a href="#" className="hover:text-white">Privacy Guide</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        <p className="text-gray-300">© 2024 ECHO Marketplace. All rights reserved.</p>
        <p className="flex justify-center items-center mt-2 text-gray-300">
          Built with <Heart size={14} className="mx-1 text-white" /> for the preservation of memories.
        </p>
      </div>
    </footer>
  );
}
