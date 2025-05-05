import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NFTTypeSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  imageSrc: string;
  buttonLink: string;
  buttonText: string;
  tags?: string[];
  color: string;
  reverse?: boolean;
}

export function NFTTypeSection({
  title,
  description,
  icon,
  imageSrc,
  buttonLink,
  buttonText,
  tags = [],
  color,
  reverse = false
}: NFTTypeSectionProps) {
  return (
    <section className={`py-16 ${reverse ? 'bg-echo-sepia/5' : ''}`}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`order-2 ${reverse ? 'lg:order-1' : 'lg:order-1'}`}>
            <div className="flex items-center gap-3 mb-4 animate-fade-in">
              <div className={`p-2 rounded-md ${color} animate-pulse-soft`}>
                {icon}
              </div>
              <h2 className="text-3xl font-semibold text-echo-coffee">{title}</h2>
            </div>
            
            <p className="text-echo-coffee/80 mb-6 text-lg leading-relaxed">
              {description}
            </p>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-white border border-echo-sepia/20 px-3 py-1 rounded-full text-sm text-echo-coffee/70">
                    {tag}
                  </div>
                ))}
              </div>
            )}
            
            <Link to={buttonLink}>
              <Button className="bg-echo-rust hover:bg-echo-rust/90 text-white">
                {buttonText}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className={`order-1 ${reverse ? 'lg:order-2' : 'lg:order-2'}`}>
            <div className="relative overflow-hidden rounded-2xl border border-echo-sepia/20">
              <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
