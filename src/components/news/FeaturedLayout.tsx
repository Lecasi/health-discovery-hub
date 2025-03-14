
import React from 'react';
import { Clock, ArrowRight, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem, categoryColors } from './types';
import FeaturedArticle from './FeaturedArticle';
import SecondaryArticle from './SecondaryArticle';

interface FeaturedLayoutProps {
  items: NewsItem[];
}

const FeaturedLayout = ({ items }: FeaturedLayoutProps) => {
  const featured = items.find(item => item.featured) || items[0];
  const secondary = items.filter(item => item.id !== featured.id).slice(0, 4);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Featured Article */}
      <div className="md:col-span-2">
        <FeaturedArticle article={featured} />
      </div>
      
      {/* Secondary Articles */}
      <div className="grid grid-cols-1 gap-4 content-between">
        {secondary.map(item => (
          <SecondaryArticle key={item.id} article={item} />
        ))}
        
        <Link to="/artigos" className="self-end text-doctordicas-blue font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300 mt-2">
          Ver mais artigos <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedLayout;
