
import React from 'react';

const HealthNews = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Novo estudo revela benefícios de dormir 8 horas para a saúde cardíaca',
      excerpt: 'Pesquisadores da Universidade de São Paulo descobriram que dormir 8 horas por noite pode reduzir em até 30% o risco de doenças cardíacas.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=580&auto=format&fit=crop',
      category: 'Cardiologia',
      categoryColor: 'red',
      publishedAt: '2 horas atrás',
      readTime: '5 min de leitura',
      author: 'Dr. Ricardo Almeida',
      featured: true,
      views: 1245,
      comments: 38,
      likes: 213
    },
    {
      id: 2,
      title: 'Vitamina D pode fortalecer o sistema imunológico contra Covid-19',
      excerpt: 'Nova pesquisa indica que níveis adequados de vitamina D podem proporcionar melhor resposta do sistema imunológico contra o coronavírus.',
      image: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?q=80&w=580&auto=format&fit=crop',
      category: 'Imunologia',
      categoryColor: 'blue',
      publishedAt: '4 horas atrás',
      readTime: '6 min de leitura',
      author: 'Dra. Carla Santos',
      views: 987,
      comments: 24,
      likes: 156
    },
    {
      id: 3,
      title: 'Exercício físico moderado pode prevenir demência, aponta estudo',
      excerpt: 'Praticar atividade física moderada por pelo menos 150 minutos por semana pode reduzir o risco de demência em até 40%.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=580&auto=format&fit=crop',
      category: 'Neurologia',
      categoryColor: 'yellow',
      publishedAt: '8 horas atrás',
      readTime: '7 min de leitura',
      author: 'Dr. Paulo Mendes',
      views: 765,
      comments: 19,
      likes: 123
    },
    {
      id: 4,
      title: 'Dieta mediterrânea associada a menor risco de depressão',
      excerpt: 'Estudo com mais de 10.000 participantes mostra que seguir a dieta mediterrânea está associado a uma redução de 33% no risco de depressão.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=580&auto=format&fit=crop',
      category: 'Nutrição',
      categoryColor: 'green',
      publishedAt: '12 horas atrás',
      readTime: '5 min de leitura',
      author: 'Dra. Ana Lisboa',
      views: 643,
      comments: 15,
      likes: 98
    },
    {
      id: 5,
      title: 'Meditação diária pode reduzir níveis de ansiedade em 28%',
      excerpt: 'Pesquisa revela que praticar meditação por apenas 10 minutos diários pode reduzir significativamente os níveis de ansiedade em adultos.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=580&auto=format&fit=crop',
      category: 'Saúde Mental',
      categoryColor: 'blue',
      publishedAt: '1 dia atrás',
      readTime: '4 min de leitura',
      author: 'Dr. Roberto Campos',
      views: 521,
      comments: 12,
      likes: 87
    }
  ];

  return (
    <div className="my-8">
      <NewsSection 
        title="Últimas Notícias de Saúde" 
        description="Fique por dentro das pesquisas e descobertas mais recentes"
        items={newsItems}
        layout="featured"
      />
    </div>
  );
};

export default HealthNews;
