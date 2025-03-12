
import React from 'react';
import NewsSection from './NewsSection';

const NutritionSection = () => {
  const nutritionNews = [
    {
      id: 1,
      title: 'Alimentos fermentados podem melhorar a saúde intestinal',
      excerpt: 'Iogurte, kefir, kimchi e outros alimentos fermentados são fontes importantes de probióticos que beneficiam o microbioma intestinal.',
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=580&auto=format&fit=crop',
      category: 'Microbioma',
      categoryColor: 'green' as const,
      publishedAt: '3 dias atrás',
      readTime: '6 min de leitura',
      author: 'Dra. Marcela Rocha',
      views: 876,
      comments: 23,
      likes: 145
    },
    {
      id: 2,
      title: '10 superalimentos que combatem inflamação no corpo',
      excerpt: 'Conheça os alimentos com propriedades anti-inflamatórias que podem ajudar a reduzir o processo inflamatório crônico no organismo.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=580&auto=format&fit=crop',
      category: 'Anti-inflamatórios',
      categoryColor: 'blue' as const,
      publishedAt: '4 dias atrás',
      readTime: '7 min de leitura',
      author: 'Dr. Fernando Silva',
      views: 765,
      comments: 19,
      likes: 132
    },
    {
      id: 3,
      title: 'Café da manhã proteico pode controlar a fome durante o dia',
      excerpt: 'Estudo demonstra que consumir proteínas no café da manhã ajuda a manter os níveis de glicose estáveis e reduzir a fome ao longo do dia.',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=580&auto=format&fit=crop',
      category: 'Nutrição Funcional',
      categoryColor: 'yellow' as const,
      publishedAt: '5 dias atrás',
      readTime: '5 min de leitura',
      author: 'Dra. Juliana Martins',
      views: 654,
      comments: 14,
      likes: 98
    }
  ];

  return (
    <div className="my-8 bg-gray-50 py-8">
      <NewsSection 
        title="Nutrição e Alimentação Saudável" 
        description="Conheça os alimentos que podem transformar sua saúde"
        items={nutritionNews}
        layout="grid"
      />
    </div>
  );
};

export default NutritionSection;
