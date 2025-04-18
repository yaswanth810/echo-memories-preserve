
import { useState } from "react";
import Layout from "@/components/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  BookMarked, 
  UploadCloud, 
  Lock, 
  Globe, 
  Plus,
  CheckCircle2, 
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateMemory = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPrivate, setIsPrivate] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate NFT creation
    setTimeout(() => {
      navigate("/memories");
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-echo-coffee flex items-center justify-center gap-2 mb-2">
            <BookMarked className="text-echo-rust" />
            Create a Soul bound Memory
          </h1>
          <p className="text-echo-coffee/70 max-w-2xl mx-auto">
            Preserve your most meaningful memories as unique digital assets that can never be sold or transferred.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                      ${currentStep >= step 
                        ? 'bg-echo-rust border-echo-rust text-white' 
                        : 'bg-white border-echo-clay/30 text-echo-clay/50'}`}
                  >
                    {currentStep > step ? <CheckCircle2 size={20} /> : step}
                  </div>
                  <div className="text-sm mt-2 text-echo-coffee font-medium">
                    {step === 1 ? "Details" : step === 2 ? "Media" : "Privacy"}
                  </div>
                </div>
              ))}
              
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-echo-sepia/20 -z-10"></div>
              <div 
                className="absolute top-5 left-0 h-0.5 bg-echo-rust -z-10 transition-all duration-300" 
                style={{ width: `${(currentStep - 1) * 50}%` }}
              ></div>
            </div>
          </div>
          
          <Card className="border-echo-sepia/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Memory Title</Label>
                      <Input 
                        id="title" 
                        placeholder="e.g., Family Trip to Italy, 2022" 
                        className="border-echo-sepia/30 focus-visible:ring-echo-clay"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe this memory and why it's significant to you..." 
                        className="min-h-32 border-echo-sepia/30 focus-visible:ring-echo-clay"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Memory Category</Label>
                      <Select>
                        <SelectTrigger className="border-echo-sepia/30 focus:ring-echo-clay">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="achievement">Achievement</SelectItem>
                          <SelectItem value="celebration">Celebration</SelectItem>
                          <SelectItem value="legacy">Legacy</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (optional)</Label>
                      <Input 
                        id="tags" 
                        placeholder="e.g., family, italy, summer (comma separated)" 
                        className="border-echo-sepia/30 focus-visible:ring-echo-clay"
                      />
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="upload">Upload Memory Media</Label>
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center 
                        ${previewImage ? 'border-echo-clay bg-echo-sepia/5' : 'border-echo-sepia/30'}`}
                      >
                        {previewImage ? (
                          <div className="space-y-4">
                            <img 
                              src={previewImage} 
                              alt="Preview" 
                              className="mx-auto max-h-64 rounded-md"
                            />
                            <Button 
                              type="button" 
                              variant="outline"
                              className="border-echo-clay text-echo-clay hover:bg-echo-clay/10"
                              onClick={() => setPreviewImage(null)}
                            >
                              Remove and upload different file
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <UploadCloud size={40} className="mx-auto text-echo-clay/50" />
                            <div className="space-y-2">
                              <p className="text-echo-coffee font-medium">
                                Drag and drop or click to upload
                              </p>
                              <p className="text-sm text-echo-coffee/70">
                                Support for images, videos, audio, and documents (max 100MB)
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              className="relative border-echo-clay text-echo-clay hover:bg-echo-clay/10"
                            >
                              Select File
                              <input
                                type="file"
                                id="upload"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                                onChange={handleImageChange}
                              />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="caption">Media Caption (optional)</Label>
                      <Input 
                        id="caption" 
                        placeholder="Describe this photo, video, or audio..." 
                        className="border-echo-sepia/30 focus-visible:ring-echo-clay"
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-echo-clay/50 text-echo-clay hover:bg-echo-clay/10"
                    >
                      <Plus size={16} className="mr-2" />
                      Add More Media (Optional)
                    </Button>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="private">Set as Private Memory</Label>
                        <Switch 
                          id="private" 
                          checked={isPrivate}
                          onCheckedChange={setIsPrivate}
                        />
                      </div>
                      <p className="text-sm text-echo-coffee/70">
                        {isPrivate 
                          ? "Your memory will only be visible to you and people you explicitly share it with." 
                          : "Your memory will be visible to everyone in the ECHO Marketplace."
                        }
                      </p>
                      
                      <div className="flex items-center gap-2 p-3 bg-echo-sepia/10 rounded-md mt-2">
                        {isPrivate ? (
                          <Lock size={18} className="text-echo-coffee" />
                        ) : (
                          <Globe size={18} className="text-echo-coffee" />
                        )}
                        <p className="text-sm text-echo-coffee/80">
                          {isPrivate 
                            ? "Private - Only visible to you and those you share with" 
                            : "Public - Visible to all ECHO Marketplace users"
                          }
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="bg-echo-sepia/20" />
                    
                    {isPrivate && (
                      <div className="space-y-3">
                        <Label>Share with Specific People (Optional)</Label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Enter email address" 
                            className="border-echo-sepia/30 focus-visible:ring-echo-clay"
                          />
                          <Button 
                            type="button"
                            variant="outline" 
                            className="border-echo-clay text-echo-clay hover:bg-echo-clay/10 shrink-0"
                          >
                            Add
                          </Button>
                        </div>
                        <p className="text-sm text-echo-coffee/70">
                          These people will receive an email with a link to view your memory.
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Switch id="soulbound" checked={true} disabled />
                        <Label htmlFor="soulbound" className="font-medium">Soul bound NFT</Label>
                      </div>
                      <p className="text-sm text-echo-coffee/70">
                        This memory will be created as a Soul bound NFT, which means it can never be sold or 
                        transferred to another wallet. It will always remain in your possession.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="border-echo-clay text-echo-clay hover:bg-echo-clay/10"
                    >
                      <ChevronLeft size={16} className="mr-1" />
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="bg-echo-rust hover:bg-echo-rust/90 text-white"
                    >
                      Continue
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      className="bg-echo-rust hover:bg-echo-rust/90 text-white"
                    >
                      Create Memory NFT
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreateMemory;
