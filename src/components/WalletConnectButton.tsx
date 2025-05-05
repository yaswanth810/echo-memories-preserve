import { Button } from './ui/button';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, LogOut } from 'lucide-react';
import { truncateAddress } from '../lib/utils';

export function WalletConnectButton() {
  const { account, isConnected, connect, disconnect } = useWallet();

  return (
    <Button
      variant="outline"
      onClick={isConnected ? disconnect : connect}
      className="flex items-center gap-2"
    >
      {isConnected ? (
        <>
          <Wallet className="h-4 w-4" />
          <span>{truncateAddress(account || '')}</span>
          <LogOut className="h-4 w-4" />
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </>
      )}
    </Button>
  );
} 