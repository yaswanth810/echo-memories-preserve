import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateMemory from "./pages/CreateMemory";
import MemoriesPage from "./pages/MemoriesPage";
import CreatePage from "./pages/CreatePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Memory routes */}
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/create/memory" element={<CreateMemory />} />
          
          {/* These would be implemented next */}
          <Route path="/proof-of-good" element={<NotFound />} />
          <Route path="/heritage" element={<NotFound />} />
          <Route path="/create/impact" element={<NotFound />} />
          <Route path="/create/heritage" element={<NotFound />} />
          <Route path="/explore" element={<NotFound />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
