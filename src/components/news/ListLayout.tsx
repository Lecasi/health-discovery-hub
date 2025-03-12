
import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { NewsItem, categoryColors } from './types';

interface ListLayoutProps {
  items: NewsItem[];
}

const ListLayout = ({ items }: ListLayoutProps) => {
  return (
    <div className="space-y-4">
      {items.map(item => (
        <div 
          key={item.id} 
          className="bg-white rounded-xl p-4 card-shadow hover:shadow-md transition-all duration-300 flex gap-4 group cursor-pointer"
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${categoryColors[item.categoryColor]}`}>
              {item.category}
            </div>
            
            <h3 className="font-semibold text-doctordicas-text-dark group-hover:text-doctordicas-blue transition-colors md:text-lg mb-1">
              {item.title}
            </h3>
            
            <p className="text-doctordicas-text-medium text-sm line-clamp-2 mb-2">
              {item.excerpt}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-doctordicas-text-medium">
                <span>{item.publishedAt}</span>
                <span>•</span>
                <span>{item.readTime}</span>
              </div>
              
              <button className="text-sm text-doctordicas-blue font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Ler artigo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListLayout;
