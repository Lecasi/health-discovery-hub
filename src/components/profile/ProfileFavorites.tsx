
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Trash2, FileText, Stethoscope, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for saved articles
const savedArticles = [
  {
    id: '1',
    title: 'Como manter uma alimentação saudável',
    excerpt: 'Descubra os princípios fundamentais de uma alimentação equilibrada para manter sua saúde em dia.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
    date: '12/05/2023',
  },
  {
    id: '2',
    title: 'Exercícios para melhorar a postura',
    excerpt: 'Problemas de postura podem causar dores crônicas. Conheça exercícios simples para melhorar sua postura.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    date: '27/03/2023',
  },
  {
    id: '3',
    title: 'Entendendo a ansiedade: causas e tratamentos',
    excerpt: 'A ansiedade afeta milhões de pessoas. Saiba mais sobre causas, sintomas e formas de tratamento.',
    image: 'https://images.unsplash.com/photo-1493689485253-f07fcbfc731b',
    date: '04/01/2023',
  },
];

// Mock data for saved diagnoses
const savedDiagnoses = [
  {
    id: 'diag-1',
    date: '15/05/2023',
    category: 'Cardiovascular',
    mainSymptom: 'Dor no peito',
  },
  {
    id: 'diag-2',
    date: '03/04/2023',
    category: 'Respiratório',
    mainSymptom: 'Tosse seca persistente',
  },
];

// Mock data for saved searches
const savedSearches = [
  {
    id: '1',
    term: 'dor de cabeça frequente',
    date: '12/05/2023',
  },
  {
    id: '2',
    term: 'vitamina d benefícios',
    date: '10/05/2023',
  },
  {
    id: '3',
    term: 'exercícios para lombar',
    date: '05/05/2023',
  },
  {
    id: '4',
    term: 'sintomas de gripe',
    date: '01/05/2023',
  },
];

const ProfileFavorites = () => {
  const [articles, setArticles] = useState(savedArticles);
  const [diagnoses, setDiagnoses] = useState(savedDiagnoses);
  const [searches, setSearches] = useState(savedSearches);

  // Remove article
  const removeArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  // Remove diagnosis
  const removeDiagnosis = (id: string) => {
    setDiagnoses(diagnoses.filter(diagnosis => diagnosis.id !== id));
  };

  // Remove search
  const removeSearch = (id: string) => {
    setSearches(searches.filter(search => search.id !== id));
  };

  // Clear all searches
  const clearAllSearches = () => {
    setSearches([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-doctordicas-text-dark">Meus Favoritos</h2>
        <div className="flex items-center bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-full">
          <Heart className="h-3.5 w-3.5 mr-1" />
          <span>{articles.length + diagnoses.length + searches.length} itens salvos</span>
        </div>
      </div>
      
      <Tabs defaultValue="articles">
        <TabsList className="mb-4">
          <TabsTrigger value="articles" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Artigos
          </TabsTrigger>
          <TabsTrigger value="diagnoses" className="flex items-center gap-1">
            <Stethoscope className="h-4 w-4" />
            Diagnósticos
          </TabsTrigger>
          <TabsTrigger value="searches" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            Buscas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-white border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <img 
                      src={`${article.image}?w=500&h=300&auto=format&fit=crop`} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => removeArticle(article.id)}
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-doctordicas-text-dark mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-doctordicas-text-medium mb-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-doctordicas-text-medium">{article.date}</span>
                      <Link 
                        to={`/artigos/${article.id}`}
                        className="text-sm text-doctordicas-blue hover:underline"
                      >
                        Ler artigo
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-doctordicas-text-dark mb-1">
                Nenhum artigo salvo
              </h3>
              <p className="text-sm text-doctordicas-text-medium mb-4">
                Você ainda não salvou nenhum artigo. Explore nosso conteúdo e adicione aos favoritos.
              </p>
              <Button asChild>
                <Link to="/artigos">Explorar Artigos</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="diagnoses">
          {diagnoses.length > 0 ? (
            <div className="space-y-4">
              {diagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-doctordicas-blue-light p-2 rounded-full">
                        <Stethoscope className="h-5 w-5 text-doctordicas-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-doctordicas-text-dark">{diagnosis.category}</h3>
                        <p className="text-sm text-doctordicas-text-medium">{diagnosis.mainSymptom}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-doctordicas-text-medium">{diagnosis.date}</span>
                      <button 
                        onClick={() => removeDiagnosis(diagnosis.id)}
                        className="text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Link 
                      to={`/diagnostico/resultados/${diagnosis.id}`}
                      className="text-sm text-doctordicas-blue hover:underline"
                    >
                      Ver resultados
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Stethoscope className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-doctordicas-text-dark mb-1">
                Nenhum diagnóstico salvo
              </h3>
              <p className="text-sm text-doctordicas-text-medium mb-4">
                Você ainda não tem diagnósticos salvos. Use nosso sistema de diagnóstico.
              </p>
              <Button asChild>
                <Link to="/diagnostico">Iniciar Diagnóstico</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="searches">
          {searches.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-doctordicas-text-dark">Buscas recentes</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllSearches}
                  className="text-xs"
                >
                  Limpar tudo
                </Button>
              </div>
              <div className="space-y-2">
                {searches.map((search) => (
                  <div key={search.id} className="flex items-center justify-between bg-white border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Search className="h-4 w-4 text-doctordicas-text-medium" />
                      <span className="text-doctordicas-text-dark">{search.term}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-doctordicas-text-medium">{search.date}</span>
                      <button 
                        onClick={() => removeSearch(search.id)}
                        className="text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-doctordicas-text-dark mb-1">
                Nenhuma busca salva
              </h3>
              <p className="text-sm text-doctordicas-text-medium mb-4">
                Suas buscas recentes aparecerão aqui.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileFavorites;
