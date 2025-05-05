import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useBlockchain } from "../hooks/useBlockchain";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BaseNFTCreationForm } from "../components/nft/BaseNFTCreationForm";

export function CreateMemory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { blockchainService, isConnected, connectWallet } = useBlockchain();

  const handleSubmit = async (formData: any) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a memory NFT.",
        variant: "destructive",
      });
      try {
        await connectWallet();
        toast({
          title: "Wallet Connected",
          description: "You can now create a memory NFT.",
        });
      } catch (error) {
        console.error("Error connecting wallet:", error);
        return;
      }
    }

    try {
      const nft = await blockchainService.mintNFT({
        ...formData,
        type: "memory",
      });

      toast({
        title: "Memory NFT Created!",
        description: "Your memory has been successfully minted as an NFT.",
      });

      navigate(`/nfts/${nft.id}`);
    } catch (error) {
      console.error("Error creating memory NFT:", error);
      toast({
        title: "Error",
        description: "Failed to create memory NFT. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Memory NFT</CardTitle>
        </CardHeader>
        <CardContent>
          <BaseNFTCreationForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}