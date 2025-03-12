
import React from 'react';
import { ChevronRight, Star, Clock, Check } from 'lucide-react';

const FeaturedContent = () => {
  const articles = [
    {
      id: 1,
      title: 'Surto de dengue: como se proteger efetivamente',
      description: 'Guia completo com medidas preventivas baseadas nas mais recentes diretrizes médicas',
      image: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?q=80&w=580&auto=format&fit=crop',
      category: 'TENDÊNCIA EM ALTA',
      categoryColor: 'yellow',
      author: 'Dr. Carlos Santos',
      authorSpecialty: 'Infectologista',
      verified: true,
      readTime: '8 min de leitura',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      title: '10 alimentos que combatem a inflamação crônica',
      description: 'Alimentos e estratégias nutricionais comprovadas cientificamente para reduzir processos inflamatórios',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=580&auto=format&fit=crop',
      category: 'NUTRIÇÃO FUNCIONAL',
      categoryColor: 'green',
      author: 'Dra. Ana Silva',
      authorSpecialty: 'Nutricionista Funcional',
      verified: true,
      readTime: '12 min de leitura',
      rating: 4.9,
      reviews: 187
    },
    {
      id: 3,
      title: 'Guia definitivo de exercícios para pessoas com mais de 50 anos',
      description: 'Aprenda a fortalecer músculos e articulações com segurança para um envelhecimento saudável',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=580&auto=format&fit=crop',
      category: 'SAÚDE NA MATURIDADE',
      categoryColor: 'blue',
      author: 'Dr. Roberto Gomes',
      authorSpecialty: 'Geriatra e Fisioterapeuta',
      verified: true,
      readTime: '15 min de leitura',
      rating: 4.7,
      reviews: 156
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Conteúdo especializado para você</h2>
        <span className="text-sm text-doctordicas-text-medium hidden md:block">
          Selecionado por nossos especialistas
        </span>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-2xl overflow-hidden card-shadow group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                article.categoryColor === 'yellow' ? 'bg-yellow-100 text-doctordicas-yellow' : 
                article.categoryColor === 'green' ? 'bg-green-100 text-doctordicas-green' : 
                'bg-blue-100 text-doctordicas-blue'
              }`}>
                {article.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-doctordicas-text-dark mb-2 line-clamp-2 group-hover:text-doctordicas-blue transition-colors">
                {article.title}
              </h3>
              
              <p className="text-doctordicas-text-medium mb-4 line-clamp-3">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{article.rating}</span>
                  <span className="text-sm text-doctordicas-text-medium">({article.reviews})</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-doctordicas-text-medium">
                  <Clock size={14} />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{article.author}</span>
                    {article.verified && (
                      <Check size={14} className="text-doctordicas-blue bg-blue-100 rounded-full p-[2px]" />
                    )}
                  </div>
                  <div className="text-sm text-doctordicas-text-medium">
                    {article.authorSpecialty}
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 btn-primary flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Ler artigo completo
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button className="btn-secondary flex items-center gap-2 group">
          Ver mais conteúdos especializados
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedContent;
