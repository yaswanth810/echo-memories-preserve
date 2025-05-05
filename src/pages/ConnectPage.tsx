import { useWallet } from '../contexts/WalletContext';
import { Button } from '../components/ui/button';
import { Wallet } from 'lucide-react';

export function ConnectPage() {
  const { connectWallet, isConnected } = useWallet();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-8">
          Connect your wallet to start creating and managing your NFTs.
        </p>
        <Button 
          onClick={connectWallet}
          disabled={isConnected}
          className="w-full"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </Button>
      </div>
    </div>
  );
} 