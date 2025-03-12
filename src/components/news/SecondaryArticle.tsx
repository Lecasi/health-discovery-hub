
import React from 'react';
import { Clock } from 'lucide-react';
import { NewsItem, categoryColors } from './types';

interface SecondaryArticleProps {
  article: NewsItem;
}

const SecondaryArticle = ({ article }: SecondaryArticleProps) => {
  return (
    <div className="bg-white rounded-xl p-4 card-shadow hover:shadow-md transition-all duration-300 group cursor-pointer">
      <div className="flex gap-3">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${categoryColors[article.categoryColor]}`}>
            {article.category}
          </div>
          <h4 className="font-medium text-doctordicas-text-dark group-hover:text-doctordicas-blue transition-colors line-clamp-2">
            {article.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-doctordicas-text-medium mt-1">
            <Clock size={12} />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryArticle;
