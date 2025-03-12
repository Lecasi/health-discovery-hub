
import React from 'react';
import { ChevronRight } from 'lucide-react';

const FeaturedContent = () => {
  const articles = [
    {
      id: 1,
      title: 'Surto de dengue: como se proteger',
      description: 'Casos aumentaram 26% no último mês',
      image: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?q=80&w=580&auto=format&fit=crop',
      category: 'TENDÊNCIA EM ALTA',
      categoryColor: 'yellow',
      author: 'Dr. Carlos Santos',
      readTime: '5 min de leitura',
      authorType: 'Parasitologia'
    },
    {
      id: 2,
      title: '10 alimentos que combatem a inflamação',
      description: 'Alimentos anti-inflamatórios e seus benefícios',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=580&auto=format&fit=crop',
      category: 'NUTRIÇÃO',
      categoryColor: 'green',
      author: 'Dra. Ana Silva',
      readTime: '12 min de leitura',
      authorType: 'Nutrição'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Conteúdo selecionado para você</h2>
        <span className="text-sm text-doctordicas-text-medium">
          Com base nas tendências e buscas populares
        </span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-2xl overflow-hidden card-shadow card-hover">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className={`inline-block px-2 py-1 rounded-md text-xs font-semibold mb-3 ${
                article.categoryColor === 'yellow' ? 'bg-yellow-100 text-doctordicas-yellow' : 'bg-green-100 text-doctordicas-green'
              }`}>
                {article.category}
              </div>
              
              <h3 className="text-xl font-semibold text-doctordicas-text-dark mb-2">
                {article.title}
              </h3>
              
              <p className="text-doctordicas-text-medium mb-4">
                {article.description}
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <div className="chip bg-gray-100 text-doctordicas-text-medium">
                    {article.categoryColor === 'yellow' ? 'Prevenção' : 'Nutrição'}
                  </div>
                  <div className="mt-2 text-sm text-doctordicas-text-medium">
                    {article.author} • {article.readTime}
                  </div>
                </div>
                
                <button className="btn-primary bg-doctordicas-blue flex items-center">
                  Ler agora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;
