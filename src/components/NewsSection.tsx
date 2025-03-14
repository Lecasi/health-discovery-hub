
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NewsSectionProps, themeClasses } from './news/types';
import GridLayout from './news/GridLayout';
import ListLayout from './news/ListLayout';
import FeaturedLayout from './news/FeaturedLayout';

const NewsSection = ({ 
  title, 
  description, 
  theme = 'light', 
  items, 
  layout = 'grid',
  className 
}: NewsSectionProps) => {
  
  return (
    <div className={cn("py-8", themeClasses[theme], className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title mb-0">{title}</h2>
          {description && (
            <span className="text-sm text-opacity-80 hidden md:block">
              {description}
            </span>
          )}
        </div>
        
        {layout === 'featured' && <FeaturedLayout items={items} />}
        {layout === 'grid' && <GridLayout items={items} />}
        {layout === 'list' && <ListLayout items={items} />}
        
        <div className="mt-8 flex justify-center">
          <Link to="/artigos" className="btn-secondary flex items-center gap-2 group hover:bg-doctordicas-blue hover:text-white transition-all duration-300">
            Ver mais artigos nesta categoria
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
