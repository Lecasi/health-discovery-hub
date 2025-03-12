
import React from 'react';
import { Clock, ArrowRight, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import { NewsItem, categoryColors } from './types';

interface GridLayoutProps {
  items: NewsItem[];
}

const GridLayout = ({ items }: GridLayoutProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map(item => (
        <div 
          key={item.id} 
          className="bg-white rounded-2xl overflow-hidden card-shadow card-hover group cursor-pointer"
        >
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[item.categoryColor]}`}>
              {item.category}
            </div>
          </div>
          
          <div className="p-5">
            <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-2 line-clamp-2 group-hover:text-doctordicas-blue transition-colors">
              {item.title}
            </h3>
            
            <p className="text-doctordicas-text-medium mb-3 text-sm line-clamp-2">
              {item.excerpt}
            </p>
            
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-doctordicas-text-medium" />
                <span className="text-xs text-doctordicas-text-medium">{item.readTime}</span>
              </div>
              
              <button className="text-sm text-doctordicas-blue font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Ler <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {(item.views || item.comments || item.likes) && (
              <div className="flex gap-3 text-doctordicas-text-medium mt-3 pt-3 border-t border-gray-100">
                {item.views && (
                  <div className="flex items-center gap-1 text-xs">
                    <Eye size={12} />
                    <span>{item.views}</span>
                  </div>
                )}
                {item.comments && (
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare size={12} />
                    <span>{item.comments}</span>
                  </div>
                )}
                {item.likes && (
                  <div className="flex items-center gap-1 text-xs">
                    <ThumbsUp size={12} />
                    <span>{item.likes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
