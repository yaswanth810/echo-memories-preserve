import { ReactNode } from 'react';
import { WalletConnectButton } from '../WalletConnectButton';
import { ThemeToggle } from '../ThemeToggle'; // Add this import

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ECHO Marketplace</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle /> {/* Add ThemeToggle */}
            <WalletConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ECHO Marketplace. All rights reserved.
        </div>
      </footer>
    </div>
  );
}