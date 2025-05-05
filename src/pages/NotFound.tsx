import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page not found</p>
      <Button onClick={() => navigate('/')}>
        Return Home
      </Button>
    </div>
  );
}

export default NotFound; 