
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, Award, Landmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CreatePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-echo-coffee mb-2">
            Create Your Digital Legacy
          </h1>
          <p className="text-echo-coffee/70 max-w-2xl mx-auto">
            Choose the type of NFT you want to create. Each serves a different purpose in preserving what matters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-echo-sepia/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BookMarked size={24} className="text-blue-600" />
              </div>
              <CardTitle className="text-echo-coffee">Soul bound Memories</CardTitle>
              <CardDescription className="text-echo-coffee/70">
                Personal, emotional NFTs that can never be sold or transferred
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-echo-coffee/80">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  Preserve individual stories and family histories
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  Document personal milestones and achievements
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  Private sharing capabilities with specific people
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/create/memory" className="w-full">
                <Button 
                  className="w-full border-blue-500 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Create Memory
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-echo-sepia/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Award size={24} className="text-green-600" />
              </div>
              <CardTitle className="text-echo-coffee">Proof-of-Good NFTs</CardTitle>
              <CardDescription className="text-echo-coffee/70">
                Immutable records of positive actions and verified real-world impact
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-echo-coffee/80">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-green-600" />
                  </div>
                  Document kindness and community contributions
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-green-600" />
                  </div>
                  Get verification for claimed positive actions
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-green-600" />
                  </div>
                  Connect your impact to recognized frameworks like SDGs
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/create/impact" className="w-full">
                <Button 
                  className="w-full border-green-500 bg-green-500 hover:bg-green-600 text-white"
                >
                  Document Impact
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-echo-sepia/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Landmark size={24} className="text-amber-600" />
              </div>
              <CardTitle className="text-echo-coffee">Heritage NFTs</CardTitle>
              <CardDescription className="text-echo-coffee/70">
                Preservation of cultural artifacts, traditions, languages, and practices
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-echo-coffee/80">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-amber-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-amber-600" />
                  </div>
                  Preserve cultural knowledge for future generations
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-amber-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-amber-600" />
                  </div>
                  Community-based validation of cultural significance
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-amber-100 p-0.5 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-amber-600" />
                  </div>
                  Support for diverse media (dance, music, oral histories)
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/create/heritage" className="w-full">
                <Button 
                  className="w-full border-amber-500 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Preserve Heritage
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Small check icon component
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default CreatePage;
