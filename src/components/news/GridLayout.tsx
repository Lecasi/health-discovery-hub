
import React from 'react';
import { Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem, categoryColors } from './types';

interface GridLayoutProps {
  items: NewsItem[];
}

const GridLayout = ({ items }: GridLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Link to={`/artigos/${item.id}`} key={item.id} className="block group">
          <div className="h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[item.categoryColor]}`}>
                {item.category}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-doctordicas-text-dark mb-2 group-hover:text-doctordicas-blue transition-colors">
                {item.title}
              </h3>
              
              <p className="text-doctordicas-text-medium text-sm mb-4 line-clamp-2">{item.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-doctordicas-text-medium">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{item.readTime}</span>
                </div>
                
                {item.views && (
                  <div className="flex items-center gap-2">
                    <Eye size={14} />
                    <span>{item.views} visualizações</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GridLayout;
