
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-echo-coffee mb-2">404</h1>
          <h2 className="text-2xl font-medium text-echo-coffee mb-4">Page Not Found</h2>
          <p className="text-echo-coffee/70 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-echo-rust hover:bg-echo-rust/90 text-white">
              <HomeIcon size={16} className="mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
