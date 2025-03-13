
import React, { useEffect, useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { NewsItem, categoryColors, checkContentRelevance } from './types';

interface SecondaryArticleProps {
  article: NewsItem;
}

const SecondaryArticle = ({ article }: SecondaryArticleProps) => {
  const [relevanceScore, setRelevanceScore] = useState<number>(1);
  const [userInsights, setUserInsights] = useState<any>(null);
  
  // Carregar insights do usuário do localStorage, se disponíveis
  useEffect(() => {
    const storedInsights = localStorage.getItem('userInsights');
    if (storedInsights) {
      try {
        const parsedInsights = JSON.parse(storedInsights);
        setUserInsights(parsedInsights);
      } catch (e) {
        console.error('Erro ao carregar dados do usuário');
      }
    }
  }, []);
  
  // Calcular relevância quando userInsights estiver disponível
  useEffect(() => {
    if (userInsights) {
      const score = checkContentRelevance(article, userInsights);
      setRelevanceScore(score);
    }
  }, [userInsights, article]);

  return (
    <div className="bg-white rounded-xl p-4 card-shadow hover:shadow-md transition-all duration-300 group cursor-pointer relative">
      {/* Indicador de conteúdo altamente relevante */}
      {relevanceScore > 1.5 && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center shadow-sm animate-pulse">
          <Sparkles size={10} className="mr-1" />
          Para você
        </div>
      )}
      
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
          
          {/* Tags do artigo */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {article.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-doctordicas-text-medium">
                  {tag}
                </span>
              ))}
              {article.tags.length > 2 && (
                <span className="text-[10px] text-doctordicas-text-medium">
                  +{article.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondaryArticle;
