
import React from 'react';
import { Clock, ArrowRight, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import { NewsItem, categoryColors } from './types';

interface FeaturedArticleProps {
  article: NewsItem;
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow card-hover transition-all duration-300 group relative h-full">
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.categoryColor]}`}>
          {article.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-doctordicas-text-dark mb-3 line-clamp-2 group-hover:text-doctordicas-blue transition-colors">
          {article.title}
        </h3>
        
        <p className="text-doctordicas-text-medium mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            {article.authorImage ? (
              <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {article.author.charAt(0)}
              </div>
            )}
            <div>
              <div className="text-sm font-medium">{article.author}</div>
              <div className="flex items-center gap-2 text-xs text-doctordicas-text-medium">
                <Clock size={12} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 text-doctordicas-text-medium">
            {article.views && (
              <div className="flex items-center gap-1 text-sm">
                <Eye size={14} />
                <span>{article.views}</span>
              </div>
            )}
            {article.comments && (
              <div className="flex items-center gap-1 text-sm">
                <MessageSquare size={14} />
                <span>{article.comments}</span>
              </div>
            )}
            {article.likes && (
              <div className="flex items-center gap-1 text-sm">
                <ThumbsUp size={14} />
                <span>{article.likes}</span>
              </div>
            )}
          </div>
        </div>
        
        <button className="flex items-center gap-1 text-doctordicas-blue font-medium mt-4 group-hover:gap-2 transition-all">
          Ler artigo completo <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedArticle;
