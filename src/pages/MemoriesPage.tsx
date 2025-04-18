
import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookMarked, Search, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const MemoriesPage = () => {
  // Sample memories data
  const memories = [
    {
      type: "memory" as const,
      title: "Summer in Amalfi, 1998",
      description: "A collection of treasured family memories from our trip to the Amalfi Coast.",
      imageSrc: "https://images.unsplash.com/photo-1473091541738-6eb2e754ff70",
      creator: "Maria Rossi",
      tags: ["Family", "Travel", "Italy"],
      isPrivate: true
    },
    {
      type: "memory" as const,
      title: "Graduation Day, 2022",
      description: "Celebrating the culmination of years of hard work and dedication.",
      imageSrc: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      creator: "Alex Johnson",
      tags: ["Achievement", "Education", "Milestone"],
      isPrivate: true
    },
    {
      type: "memory" as const,
      title: "Grandma's Recipe Collection",
      description: "Preserving family recipes passed down through generations.",
      imageSrc: "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
      creator: "Sofia Chen",
      tags: ["Family", "Tradition", "Food"],
      isPrivate: false
    },
    {
      type: "memory" as const,
      title: "Wedding Day, June 2020",
      description: "The most beautiful day of our lives, captured forever.",
      imageSrc: "https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4",
      creator: "James & Emily Wilson",
      tags: ["Wedding", "Love", "Celebration"],
      isPrivate: true
    },
    {
      type: "memory" as const,
      title: "First Marathon Completion",
      description: "The journey of training and accomplishing my first full marathon.",
      imageSrc: "https://images.unsplash.com/photo-1526676037777-05a232554f77",
      creator: "Thomas Wright",
      tags: ["Achievement", "Fitness", "Personal"],
      isPrivate: false
    },
    {
      type: "memory" as const,
      title: "Childhood Home, 1975-1995",
      description: "Memories of the place where I grew up and the life we built there.",
      imageSrc: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      creator: "Robert Miller",
      tags: ["Childhood", "Home", "Family"],
      isPrivate: true
    }
  ];

  return (
    <Layout>
      <section className="py-8 bg-echo-sepia/10 dark:bg-echo-dark-background/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-echo-coffee dark:text-echo-cyber-neon flex items-center gap-2">
                <BookMarked className="text-echo-rust dark:text-echo-cyber-electric" />
                Soul bound Memories
              </h1>
              <p className="text-echo-coffee/70 dark:text-echo-cyber-neon/80">Preserve your most precious moments forever</p>
            </div>
            <Link to="/create/memory">
              <Button className="bg-echo-rust hover:bg-echo-rust/90 dark:bg-echo-cyber-neon dark:hover:bg-echo-cyber-neon/90 text-white">
                <Plus size={16} className="mr-2" />
                Create Memory
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-echo-coffee/50 dark:text-echo-cyber-neon/50" />
              <Input 
                placeholder="Search memories..." 
                className="pl-10 border-echo-sepia/30 dark:border-echo-cyber-neon/20 focus-visible:ring-echo-clay dark:focus-visible:ring-echo-cyber-neon"
              />
            </div>
            <Button variant="outline" className="border-echo-clay text-echo-clay hover:bg-echo-clay/10 dark:border-echo-cyber-neon dark:text-echo-cyber-neon dark:hover:bg-echo-cyber-neon/10">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory, index) => (
              <NFTCard
                key={index}
                {...memory}
                onClick={() => console.log(`Viewing ${memory.title}`)}
              />
            ))}
          </div>
          
          {memories.length === 0 && (
            <div className="text-center py-12">
              <BookMarked size={48} className="mx-auto text-echo-sepia dark:text-echo-cyber-neon mb-4" />
              <h3 className="text-xl font-medium text-echo-coffee dark:text-echo-cyber-neon mb-2">No memories yet</h3>
              <p className="text-echo-coffee/70 dark:text-echo-cyber-neon/80 mb-6">
                Create your first Soul bound Memory to start preserving what matters.
              </p>
              <Link to="/create/memory">
                <Button className="bg-echo-rust hover:bg-echo-rust/90 dark:bg-echo-cyber-neon dark:hover:bg-echo-cyber-neon/90 text-white">
                  <Plus size={16} className="mr-2" />
                  Create Memory
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MemoriesPage;
