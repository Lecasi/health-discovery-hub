
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { NewsItem, categoryColors } from '@/components/news/types';

interface RelatedArticlesProps {
  articles: NewsItem[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (!articles || articles.length === 0) return null;
  
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Artigos relacionados</h3>
      
      <div className="space-y-4">
        {articles.map(article => (
          <Link 
            key={article.id} 
            to={`/artigos/${article.id}`} 
            className="block"
          >
            <div className="flex gap-3 group">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
