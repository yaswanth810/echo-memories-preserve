import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookMarked, Award, Landmark, Wallet, LogOut, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useWallet } from "@/hooks/useWallet";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/memories", label: "Memories", icon: BookMarked },
    { to: "/proof-of-good", label: "Impact", icon: Award },
    { to: "/heritage", label: "Heritage", icon: Landmark },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-4 shadow-lg">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-200 hover:text-gray-100 transition-colors">
          ECHO MARKETPLACEx
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 ${
                location.pathname === to ? "bg-gray-700 text-white" : "text-gray-300"
              } transition-colors`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          {address ? (
            <Button
              onClick={handleDisconnectWallet}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
            >
              <LogOut size={18} className="mr-2" />
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={handleConnectWallet}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
            >
              <Wallet size={18} className="mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>
        <Button className="md:hidden bg-gray-700 hover:bg-gray-600 transition-colors">
          <Menu size={20} />
        </Button>
      </div>
    </nav>
  );
}
