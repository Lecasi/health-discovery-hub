
import React from 'react';
import { Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem, categoryColors } from './types';

interface ListLayoutProps {
  items: NewsItem[];
}

const ListLayout = ({ items }: ListLayoutProps) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <Link to={`/artigos/${item.id}`} key={item.id} className="block group">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-0 sm:flex overflow-hidden">
            <div className="sm:w-60 lg:w-80 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 sm:h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[item.categoryColor]}`}>
                {item.category}
              </div>
            </div>
            
            <div className="sm:flex-1 p-0 pt-4 sm:p-6">
              <h3 className="text-lg font-bold text-doctordicas-text-dark mb-2 group-hover:text-doctordicas-blue transition-colors">
                {item.title}
              </h3>
              
              <p className="text-doctordicas-text-medium text-sm mb-4 line-clamp-3">{item.excerpt}</p>
              
              <div className="mt-auto flex items-center justify-between text-sm text-doctordicas-text-medium">
                <div>Por {item.author}</div>
                
                <div className="flex items-center gap-4">
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
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListLayout;
