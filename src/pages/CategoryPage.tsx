
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GridLayout from '@/components/news/GridLayout';
import { Article } from '@/types/article';

// Sample articles for category pages
const categoryArticles: Record<string, Article[]> = {
  'saude-mental': [
    {
      id: '101',
      title: 'Como lidar com a ansiedade no dia a dia',
      summary: 'Dicas práticas para gerenciar sintomas de ansiedade e melhorar sua saúde mental.',
      content: 'Conteúdo completo sobre ansiedade...',
      author: 'Dra. Mariana Silva',
      date: '2023-09-15',
      readTime: 8,
      category: 'saude-mental',
      imageUrl: '/placeholder.svg',
      tags: ['ansiedade', 'saúde mental', 'bem-estar']
    },
    {
      id: '102',
      title: 'Sinais de depressão que não devem ser ignorados',
      summary: 'Aprenda a identificar os principais sintomas de depressão e quando buscar ajuda profissional.',
      content: 'Conteúdo completo sobre depressão...',
      author: 'Dr. Carlos Mendes',
      date: '2023-08-22',
      readTime: 10,
      category: 'saude-mental',
      imageUrl: '/placeholder.svg',
      tags: ['depressão', 'saúde mental', 'tratamento']
    },
    {
      id: '103',
      title: 'Benefícios da terapia cognitivo-comportamental',
      summary: 'Conheça como esta abordagem terapêutica pode ajudar no tratamento de diversos transtornos mentais.',
      content: 'Conteúdo completo sobre TCC...',
      author: 'Dra. Patrícia Souza',
      date: '2023-07-30',
      readTime: 7,
      category: 'saude-mental',
      imageUrl: '/placeholder.svg',
      tags: ['terapia', 'TCC', 'tratamento', 'saúde mental']
    }
  ],
  'nutricao': [
    {
      id: '201',
      title: 'Alimentos que fortalecem o sistema imunológico',
      summary: 'Descubra quais alimentos podem ajudar a melhorar suas defesas naturais.',
      content: 'Conteúdo completo sobre alimentos e imunidade...',
      author: 'Dra. Amanda Nunes',
      date: '2023-09-10',
      readTime: 6,
      category: 'nutricao',
      imageUrl: '/placeholder.svg',
      tags: ['nutrição', 'imunidade', 'alimentação saudável']
    },
    {
      id: '202',
      title: 'Mitos e verdades sobre dietas low-carb',
      summary: 'Um guia baseado em evidências sobre os prós e contras das dietas baixas em carboidratos.',
      content: 'Conteúdo completo sobre dietas low-carb...',
      author: 'Dr. Ricardo Lima',
      date: '2023-08-18',
      readTime: 9,
      category: 'nutricao',
      imageUrl: '/placeholder.svg',
      tags: ['dietas', 'low-carb', 'emagrecimento', 'nutrição']
    }
  ],
  'exercicios': [
    {
      id: '301',
      title: 'Como começar a praticar exercícios depois dos 40',
      summary: 'Guia completo para iniciar atividades físicas com segurança após os 40 anos.',
      content: 'Conteúdo completo sobre exercícios após os 40...',
      author: 'Dr. Fernando Costa',
      date: '2023-09-05',
      readTime: 8,
      category: 'exercicios',
      imageUrl: '/placeholder.svg',
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
  const articles = categoryId ? (categoryArticles[categoryId] || []) : [];
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

        {articles.length > 0 ? (
          <GridLayout articles={articles} />
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
