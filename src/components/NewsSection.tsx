import React from 'react';
import { Clock, ArrowRight, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: 'blue' | 'green' | 'yellow' | 'red';
  publishedAt: string;
  readTime: string;
  author: string;
  authorImage?: string;
  featured?: boolean;
  views?: number;
  comments?: number;
  likes?: number;
}

interface NewsSectionProps {
  title: string;
  description?: string;
  theme?: 'light' | 'dark' | 'accent';
  items: NewsItem[];
  layout?: 'grid' | 'list' | 'featured';
  className?: string;
}

const NewsSection = ({ 
  title, 
  description, 
  theme = 'light', 
  items, 
  layout = 'grid',
  className 
}: NewsSectionProps) => {
  
  const themeClasses = {
    light: 'bg-white',
    dark: 'bg-doctordicas-text-dark text-white',
    accent: 'bg-doctordicas-blue text-white',
  };
  
  const categoryColors = {
    blue: 'bg-blue-100 text-doctordicas-blue',
    green: 'bg-green-100 text-doctordicas-green',
    yellow: 'bg-yellow-100 text-doctordicas-yellow',
    red: 'bg-red-100 text-doctordicas-red',
  };
  
  const renderFeaturedLayout = () => {
    const featured = items.find(item => item.featured) || items[0];
    const secondary = items.filter(item => item.id !== featured.id).slice(0, 4);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Article */}
        <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden card-shadow card-hover transition-all duration-300 group relative h-full">
          <div className="relative">
            <img 
              src={featured.image} 
              alt={featured.title} 
              className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[featured.categoryColor]}`}>
              {featured.category}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-doctordicas-text-dark mb-3 line-clamp-2 group-hover:text-doctordicas-blue transition-colors">
              {featured.title}
            </h3>
            
            <p className="text-doctordicas-text-medium mb-4 line-clamp-3">
              {featured.excerpt}
            </p>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                {featured.authorImage ? (
                  <img src={featured.authorImage} alt={featured.author} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {featured.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium">{featured.author}</div>
                  <div className="flex items-center gap-2 text-xs text-doctordicas-text-medium">
                    <Clock size={12} />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 text-doctordicas-text-medium">
                {featured.views && (
                  <div className="flex items-center gap-1 text-sm">
                    <Eye size={14} />
                    <span>{featured.views}</span>
                  </div>
                )}
                {featured.comments && (
                  <div className="flex items-center gap-1 text-sm">
                    <MessageSquare size={14} />
                    <span>{featured.comments}</span>
                  </div>
                )}
                {featured.likes && (
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsUp size={14} />
                    <span>{featured.likes}</span>
                  </div>
                )}
              </div>
            </div>
            
            <button className="flex items-center gap-1 text-doctordicas-blue font-medium mt-4 group-hover:gap-2 transition-all">
              Ler artigo completo <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        
        {/* Secondary Articles */}
        <div className="grid grid-cols-1 gap-4 content-between">
          {secondary.map(item => (
            <div key={item.id} className="bg-white rounded-xl p-4 card-shadow hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className="flex gap-3">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${categoryColors[item.categoryColor]}`}>
                    {item.category}
                  </div>
                  <h4 className="font-medium text-doctordicas-text-dark group-hover:text-doctordicas-blue transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-doctordicas-text-medium mt-1">
                    <Clock size={12} />
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button className="self-end text-doctordicas-blue font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300 mt-2">
            Ver mais artigos <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  };
  
  const renderGridLayout = () => {
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
  
  const renderListLayout = () => {
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
        
        {layout === 'featured' && renderFeaturedLayout()}
        {layout === 'grid' && renderGridLayout()}
        {layout === 'list' && renderListLayout()}
        
        <div className="mt-8 flex justify-center">
          <button className="btn-secondary flex items-center gap-2 group hover:bg-doctordicas-blue hover:text-white transition-all duration-300">
            Ver mais artigos nesta categoria
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
