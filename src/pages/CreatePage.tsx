import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function CreatePage() {
  const navigate = useNavigate();

  const nftTypes = [
    {
      title: 'Memory NFT',
      description: 'Create a memory NFT to preserve your special moments.',
      path: '/memories/create',
      color: 'bg-blue-500',
    },
    {
      title: 'Proof of Good NFT',
      description: 'Create a proof of good NFT to showcase your positive impact.',
      path: '/proof-of-good/create',
      color: 'bg-green-500',
    },
    {
      title: 'Heritage NFT',
      description: 'Create a heritage NFT to preserve cultural and historical significance.',
      path: '/heritage/create',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create NFT</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nftTypes.map((type) => (
          <Card key={type.path} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${type.color} mb-4`} />
              <CardTitle>{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate(type.path)}
                className="w-full"
              >
                Create {type.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 