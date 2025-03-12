
import React from 'react';
import NewsSection from './NewsSection';

const MentalHealthSection = () => {
  const mentalHealthNews = [
    {
      id: 1,
      title: 'Terapia cognitivo-comportamental mostra resultados rápidos para ansiedade',
      excerpt: 'Abordagem terapêutica focada em solução de problemas pode trazer resultados significativos em apenas oito semanas de tratamento.',
      image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=580&auto=format&fit=crop',
      category: 'Psicoterapia',
      categoryColor: 'blue',
      publishedAt: '2 dias atrás',
      readTime: '8 min de leitura',
      author: 'Dra. Paula Monteiro',
      views: 964,
      comments: 27,
      likes: 187
    },
    {
      id: 2,
      title: 'Música pode reduzir sintomas de depressão em até 25%',
      excerpt: 'Ouvir música por 30 minutos diários, especialmente as melodias preferidas do paciente, mostrou efeitos positivos em casos de depressão leve e moderada.',
      image: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?q=80&w=580&auto=format&fit=crop',
      category: 'Musicoterapia',
      categoryColor: 'yellow',
      publishedAt: '4 dias atrás',
      readTime: '6 min de leitura',
      author: 'Dr. Rafael Oliveira',
      views: 832,
      comments: 21,
      likes: 156
    },
    {
      id: 3,
      title: 'Rotina de sono regular é fundamental para saúde emocional',
      excerpt: 'Estudo com mais de 5.000 participantes confirma que dormir e acordar no mesmo horário todos os dias melhora a regulação emocional e reduz irritabilidade.',
      image: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?q=80&w=580&auto=format&fit=crop',
      category: 'Sono',
      categoryColor: 'red',
      publishedAt: '5 dias atrás',
      readTime: '5 min de leitura',
      author: 'Dra. Luísa Costa',
      views: 745,
      comments: 18,
      likes: 123
    },
    {
      id: 4,
      title: 'Contato com a natureza por 120 minutos semanais melhora bem-estar',
      excerpt: 'Passar apenas duas horas por semana em ambientes naturais pode ter impactos significativos na saúde mental, segundo novo estudo.',
      image: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=580&auto=format&fit=crop',
      category: 'Ecoterapia',
      categoryColor: 'green',
      publishedAt: '6 dias atrás',
      readTime: '7 min de leitura',
      author: 'Dr. André Campos',
      views: 621,
      comments: 15,
      likes: 98
    }
  ];

  return (
    <div className="my-8">
      <NewsSection 
        title="Saúde Mental e Bem-estar" 
        description="Descubra como cuidar da sua mente"
        items={mentalHealthNews}
        layout="list"
      />
    </div>
  );
};

export default MentalHealthSection;
