
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewsItem } from '@/components/news/types';
import GridLayout from '@/components/news/GridLayout';
import ListLayout from '@/components/news/ListLayout';

// Mock data - seria substituído por chamada à API
const mockArticles: NewsItem[] = [
  {
    id: 1,
    title: 'Alimentos fermentados podem melhorar a saúde intestinal',
    excerpt: 'Iogurte, kefir, kimchi e outros alimentos fermentados são fontes importantes de probióticos que beneficiam o microbioma intestinal.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=580&auto=format&fit=crop',
    category: 'Microbioma',
    categoryColor: 'green',
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
    categoryColor: 'blue',
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
    categoryColor: 'yellow',
    publishedAt: '5 dias atrás',
    readTime: '5 min de leitura',
    author: 'Dra. Juliana Martins',
    views: 654,
    comments: 14,
    likes: 98
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
  }
];

// Categorias disponíveis para filtro
const categories = [
  { name: 'Todos', value: 'all' },
  { name: 'Microbioma', value: 'Microbioma' },
  { name: 'Anti-inflamatórios', value: 'Anti-inflamatórios' },
  { name: 'Nutrição Funcional', value: 'Nutrição Funcional' },
  { name: 'Psicoterapia', value: 'Psicoterapia' },
  { name: 'Musicoterapia', value: 'Musicoterapia' },
  { name: 'Sono', value: 'Sono' }
];

const ArticlesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterArticles(searchQuery, activeCategory);
  };

  const filterArticles = (query: string, category: string) => {
    let filtered = mockArticles;
    
    // Filtrar por categoria
    if (category !== 'all') {
      filtered = filtered.filter(article => article.category === category);
    }
    
    // Filtrar por pesquisa
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) || 
        article.excerpt.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredArticles(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterArticles(searchQuery, category);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-doctordicas-text-dark mb-6">
        Artigos e Conteúdo de Saúde
      </h1>
      
      <p className="text-doctordicas-text-medium mb-8 max-w-3xl">
        Explore nossa biblioteca de artigos escritos por especialistas em saúde. 
        Descubra insights sobre bem-estar, tratamentos, prevenção de doenças e muito mais.
      </p>
      
      {/* Search and filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Buscar</Button>
        </form>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                activeCategory === category.value
                  ? 'bg-doctordicas-blue text-white'
                  : 'bg-gray-100 text-doctordicas-text-medium hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
          
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gray-100' : ''}
            >
              Grade
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-gray-100' : ''}
            >
              Lista
            </Button>
          </div>
        </div>
      </div>
      
      {/* Articles list */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-doctordicas-text-dark mb-2">
            Nenhum artigo encontrado
          </h3>
          <p className="text-doctordicas-text-medium">
            Tente ajustar seus filtros ou termos de busca.
          </p>
        </div>
      ) : (
        <div className="mb-8">
          {viewMode === 'grid' ? (
            <GridLayout items={filteredArticles} />
          ) : (
            <ListLayout items={filteredArticles} />
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlesListPage;
