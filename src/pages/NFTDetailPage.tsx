import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blockchainService } from '../services/blockchain';
import { NFT, Listing, Offer } from '../types/nft';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'react-hot-toast';
import { Share2, DollarSign, Clock, Users } from 'lucide-react';

export function NFTDetailPage({ contractAddress, abi, tokenId }: { contractAddress: string; abi: any; tokenId: string }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNFT, getListing, getOffers, listNFTForSale, listNFTForAuction, placeBid, makeOffer, acceptOffer, buyNFT, unlistNFT } = blockchainService;
  const [nft, setNFT] = useState<NFT | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListing, setIsListing] = useState(false);
  const [isBidding, setIsBidding] = useState(false);
  const [isMakingOffer, setIsMakingOffer] = useState(false);
  const [price, setPrice] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerDuration, setOfferDuration] = useState('7'); // Default 7 days
  const [activeTab, setActiveTab] = useState('details');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const nftData = await blockchainService.getNFT(contractAddress, abi, tokenId);
      setNFT(nftData);
      
      const listingData = await getListing(id);
      setListing(listingData);
      
      const offersData = await getOffers(id);
      setOffers(offersData);
    } catch (err) {
      console.error("Error fetching NFT:", err);
      setError("Failed to fetch NFT data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contractAddress, abi, tokenId]);

  const handleShare = () => {
    if (!nft) return;
    const shareUrl = `${window.location.origin}/nft/${nft.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
  };

  const handleListForSale = async () => {
    if (!nft || !price) return;
    try {
      setIsListing(true);
      await listNFTForSale(nft.id, price);
      const updatedListing = await getListing(nft.id);
      setListing(updatedListing);
      toast.success('NFT listed for sale!');
    } catch (error) {
      console.error('Error listing NFT:', error);
      toast.error('Failed to list NFT for sale');
    } finally {
      setIsListing(false);
    }
  };

  const handleListForAuction = async () => {
    if (!nft || !price) return;
    try {
      setIsListing(true);
      await listNFTForAuction(nft.id, price, 7 * 24 * 60 * 60); // 7 days
      const updatedListing = await getListing(nft.id);
      setListing(updatedListing);
      toast.success('NFT listed for auction!');
    } catch (error) {
      console.error('Error listing NFT for auction:', error);
      toast.error('Failed to list NFT for auction');
    } finally {
      setIsListing(false);
    }
  };

  const handlePlaceBid = async () => {
    if (!nft || !bidAmount) return;
    try {
      setIsBidding(true);
      await placeBid(nft.id, bidAmount);
      const updatedListing = await getListing(nft.id);
      setListing(updatedListing);
      toast.success('Bid placed successfully!');
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error('Failed to place bid');
    } finally {
      setIsBidding(false);
    }
  };

  const handleMakeOffer = async () => {
    if (!nft || !offerAmount || !offerDuration) return;
    try {
      setIsMakingOffer(true);
      await makeOffer(nft.id, offerAmount, parseInt(offerDuration) * 24 * 60 * 60);
      const updatedOffers = await getOffers(nft.id);
      setOffers(updatedOffers);
      toast.success('Offer made successfully!');
    } catch (error) {
      console.error('Error making offer:', error);
      toast.error('Failed to make offer');
    } finally {
      setIsMakingOffer(false);
    }
  };

  const handleAcceptOffer = async (offerIndex: number) => {
    if (!nft) return;
    try {
      await acceptOffer(nft.id, offerIndex);
      const updatedOffers = await getOffers(nft.id);
      setOffers(updatedOffers);
      toast.success('Offer accepted!');
    } catch (error) {
      console.error('Error accepting offer:', error);
      toast.error('Failed to accept offer');
    }
  };

  const handleBuy = async () => {
    if (!nft || !listing?.price) return;
    try {
      await buyNFT(nft.id, listing.price);
      const updatedListing = await getListing(nft.id);
      setListing(updatedListing);
      toast.success('NFT purchased successfully!');
    } catch (error) {
      console.error('Error buying NFT:', error);
      toast.error('Failed to buy NFT');
    }
  };

  const handleUnlist = async () => {
    if (!nft) return;
    try {
      await unlistNFT(nft.id);
      setListing(null);
      toast.success('NFT unlisted successfully!');
    } catch (error) {
      console.error('Error unlisting NFT:', error);
      toast.error('Failed to unlist NFT');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!nft) {
    return (
      <div className="text-center">
        <h2>NFT not found</h2>
        <Button onClick={() => navigate('/')}>Back to Marketplace</Button>
      </div>
    );
  }

  const isOwner = nft.owner === window.ethereum?.selectedAddress;
  const isAuction = listing?.isAuction;
  const auctionEnded = listing?.auctionEndTime && listing.auctionEndTime < Date.now() / 1000;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={nft.mediaUrl}
            alt={nft.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{nft.title}</h1>
            <Button variant="ghost" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">{nft.type}</Badge>
            {listing?.active && (
              <Badge variant={isAuction ? "warning" : "success"}>
                {isAuction ? "Auction" : "For Sale"}
              </Badge>
            )}
          </div>

          <p className="text-gray-600 mb-4">{nft.description}</p>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Created by</p>
            <p className="font-medium">{nft.creator}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">Current Owner</p>
            <p className="font-medium">{nft.owner}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <Tab value="details">Details</Tab>
            <Tab value="offers">Offers</Tab>
          </Tabs>

          {activeTab === 'details' && (
            <div className="mt-4">
              {listing?.active ? (
                <Card className="p-4">
                  {isAuction ? (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Bid</p>
                          <p className="text-xl font-bold">{listing.highestBid || listing.price} ETH</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ends In</p>
                          <p className="text-xl font-bold">
                            {auctionEnded ? 'Ended' : `${Math.floor((listing.auctionEndTime! - Date.now() / 1000) / 3600)}h`}
                          </p>
                        </div>
                      </div>
                      {!auctionEnded && !isOwner && (
                        <div className="space-y-4">
                          <Input
                            type="number"
                            placeholder="Bid Amount (ETH)"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                          <Button
                            onClick={handlePlaceBid}
                            disabled={isBidding}
                            className="w-full"
                          >
                            {isBidding ? 'Placing Bid...' : 'Place Bid'}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-xl font-bold">{listing.price} ETH</p>
                        </div>
                      </div>
                      {!isOwner && (
                        <Button onClick={handleBuy} className="w-full">
                          Buy Now
                        </Button>
                      )}
                    </>
                  )}
                  {isOwner && (
                    <Button
                      variant="destructive"
                      onClick={handleUnlist}
                      className="w-full mt-4"
                    >
                      Unlist NFT
                    </Button>
                  )}
                </Card>
              ) : isOwner ? (
                <Card className="p-4">
                  <Tabs defaultValue="sale">
                    <Tab value="sale">Fixed Price</Tab>
                    <Tab value="auction">Auction</Tab>
                  </Tabs>
                  <div className="mt-4 space-y-4">
                    <Input
                      type="number"
                      placeholder="Price (ETH)"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Button
                      onClick={handleListForSale}
                      disabled={isListing}
                      className="w-full"
                    >
                      {isListing ? 'Listing...' : 'List for Sale'}
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-4">
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Offer Amount (ETH)"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Duration (days)"
                      value={offerDuration}
                      onChange={(e) => setOfferDuration(e.target.value)}
                    />
                    <Button
                      onClick={handleMakeOffer}
                      disabled={isMakingOffer}
                      className="w-full"
                    >
                      {isMakingOffer ? 'Making Offer...' : 'Make Offer'}
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="mt-4">
              {offers.length > 0 ? (
                <div className="space-y-4">
                  {offers.map((offer, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{offer.amount} ETH</p>
                          <p className="text-sm text-gray-500">
                            From: {offer.offerer}
                          </p>
                          <p className="text-sm text-gray-500">
                            Expires: {new Date(offer.expirationTime * 1000).toLocaleDateString()}
                          </p>
                        </div>
                        {isOwner && offer.active && (
                          <Button
                            onClick={() => handleAcceptOffer(index)}
                            variant="outline"
                          >
                            Accept
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No offers yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}