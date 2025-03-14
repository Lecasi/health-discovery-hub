
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GridLayout from '@/components/news/GridLayout';
import { NewsItem } from '@/components/news/types';

// Sample articles for category pages
const categoryArticles: Record<string, NewsItem[]> = {
  'saude-mental': [
    {
      id: 101,
      title: 'Como lidar com a ansiedade no dia a dia',
      excerpt: 'Dicas práticas para gerenciar sintomas de ansiedade e melhorar sua saúde mental.',
      image: '/placeholder.svg',
      author: 'Dra. Mariana Silva',
      publishedAt: '2023-09-15',
      readTime: '8 min',
      category: 'Saúde Mental',
      categoryColor: 'blue',
      tags: ['ansiedade', 'saúde mental', 'bem-estar']
    },
    {
      id: 102,
      title: 'Sinais de depressão que não devem ser ignorados',
      excerpt: 'Aprenda a identificar os principais sintomas de depressão e quando buscar ajuda profissional.',
      image: '/placeholder.svg',
      author: 'Dr. Carlos Mendes',
      publishedAt: '2023-08-22',
      readTime: '10 min',
      category: 'Saúde Mental',
      categoryColor: 'blue',
      tags: ['depressão', 'saúde mental', 'tratamento']
    },
    {
      id: 103,
      title: 'Benefícios da terapia cognitivo-comportamental',
      excerpt: 'Conheça como esta abordagem terapêutica pode ajudar no tratamento de diversos transtornos mentais.',
      image: '/placeholder.svg',
      author: 'Dra. Patrícia Souza',
      publishedAt: '2023-07-30',
      readTime: '7 min',
      category: 'Saúde Mental',
      categoryColor: 'blue',
      tags: ['terapia', 'TCC', 'tratamento', 'saúde mental']
    }
  ],
  'nutricao': [
    {
      id: 201,
      title: 'Alimentos que fortalecem o sistema imunológico',
      excerpt: 'Descubra quais alimentos podem ajudar a melhorar suas defesas naturais.',
      image: '/placeholder.svg',
      author: 'Dra. Amanda Nunes',
      publishedAt: '2023-09-10',
      readTime: '6 min',
      category: 'Nutrição',
      categoryColor: 'green',
      tags: ['nutrição', 'imunidade', 'alimentação saudável']
    },
    {
      id: 202,
      title: 'Mitos e verdades sobre dietas low-carb',
      excerpt: 'Um guia baseado em evidências sobre os prós e contras das dietas baixas em carboidratos.',
      image: '/placeholder.svg',
      author: 'Dr. Ricardo Lima',
      publishedAt: '2023-08-18',
      readTime: '9 min',
      category: 'Nutrição',
      categoryColor: 'green',
      tags: ['dietas', 'low-carb', 'emagrecimento', 'nutrição']
    }
  ],
  'exercicios': [
    {
      id: 301,
      title: 'Como começar a praticar exercícios depois dos 40',
      excerpt: 'Guia completo para iniciar atividades físicas com segurança após os 40 anos.',
      image: '/placeholder.svg',
      author: 'Dr. Fernando Costa',
      publishedAt: '2023-09-05',
      readTime: '8 min',
      category: 'Exercícios Físicos',
      categoryColor: 'yellow',
      tags: ['exercícios', 'idade', 'saúde', 'atividade física']
    }
  ],
  // Adicione mais categorias conforme necessário
};

// Mapeamento de IDs para nomes de categorias
const categoryNames: Record<string, string> = {
  'saude-mental': 'Saúde Mental',
  'nutricao': 'Nutrição',
  'exercicios': 'Exercícios Físicos',
  'cardiologia': 'Cardiologia',
  'pediatria': 'Pediatria',
  'diabetes': 'Diabetes'
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const items = categoryId ? (categoryArticles[categoryId] || []) : [];
  const categoryName = categoryId ? (categoryNames[categoryId] || categoryId) : '';

  return (
    <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-doctordicas-text-dark mb-2">{categoryName}</h1>
            <p className="text-doctordicas-text-medium">
              Artigos e informações sobre {categoryName.toLowerCase()}.
            </p>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {items.length > 0 ? (
          <GridLayout items={items} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-doctordicas-text-medium">
              Não encontramos artigos nesta categoria.
            </h2>
            <p className="mt-2 text-doctordicas-text-light">
              Por favor, verifique outras categorias ou volte mais tarde.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
