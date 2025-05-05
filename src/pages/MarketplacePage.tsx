import React, { useState, useEffect } from 'react';
import { useBlockchain } from '../hooks/useBlockchain';
import { ethers } from 'ethers';

const MarketplacePage: React.FC = () => {
  const { blockchainService } = useBlockchain();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!blockchainService) {
          setError('Blockchain service not initialized.');
          return;
        }

        const fetchedListings = await blockchainService.getMarketplaceListings();        

        setListings(fetchedListings);
      } catch (err) {
        setError('Failed to fetch marketplace listings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [blockchainService]);

 return (
    <div>
      <h1>NFT Marketplace</h1>
      {loading && <p>Loading listings...</p>}
      {error && <p>Error: {error}</p>}
      {listings.length > 0 && (
        <ul>
          {listings.map((listing, index) => (
            <li key={index}>
              {/* Display basic listing information */}
              <p>Token ID: {listing.tokenId?.toString()}</p>
              <p>Price: {listing.price ? ethers.formatEther(listing.price) : 'N/A'} ETH</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarketplacePage;