import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { NFTPage } from './pages/NFTPage';
import { NFTDetailPage } from './pages/NFTDetailPage';
import { CreateNFTPage } from './pages/CreateNFTPage';
import { HeritagePage } from './pages/HeritagePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { ProofOfGoodPage } from './pages/ProofOfGoodPage';
import { ExplorePage } from './pages/ExplorePage';
import { WalletProvider } from './contexts/WalletContext';
import { ThemeToggle } from './components/ThemeToggle';
import { CreateMemory } from './pages/CreateMemory';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nfts" element={<NFTPage />} />
            <Route path="/nfts/:id" element={<NFTDetailPage />} />
            <Route path="/create" element={<CreateNFTPage />} />
            <Route path="/create/memory" element={<CreateMemory />} />
            <Route path="/create-nft" element={<CreateNFTPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/heritage" element={<HeritagePage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/proof-of-good" element={<ProofOfGoodPage />} />
          </Routes>
          <Toaster position="top-right" />
        </Layout>
      </Router>
    </WalletProvider>
  );
}

export default App;
