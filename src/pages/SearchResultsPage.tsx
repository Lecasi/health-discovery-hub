
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Calendar, User, BookOpen, ArrowLeft, CheckCircle, RefreshCw, SlidersHorizontal, BrainCircuit } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Define types for search results
interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  type: 'article' | 'question' | 'tool' | 'specialist' | 'community';
  url: string;
  imageUrl?: string;
  date?: string;
  author?: string;
  category?: string;
  relevanceScore?: number;
}

// Define filter state type
interface FilterState {
  contentType: string[];
  date: string;
  difficulty: string;
  specialty: string;
}

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [directAnswer, setDirectAnswer] = useState('');
  const [searchTime, setSearchTime] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [resultsViewed, setResultsViewed] = useState(0);
  const { toast } = useToast();
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    contentType: [],
    date: 'all',
    difficulty: 'all',
    specialty: ''
  });
  
  // Specialties list
  const specialties = [
    'Cardiologia', 'Dermatologia', 'Neurologia', 'Pediatria', 
    'Ginecologia', 'Ortopedia', 'Psiquiatria', 'Oftalmologia'
  ];
  
  // Mock direct answers for common queries
  const directAnswers: {[key: string]: string} = {
    'dor de cabeça': 'Dores de cabeça podem ser causadas por tensão, enxaqueca, sinusite, ou problemas de visão. Se persistente ou severa, consulte um médico.',
    'pressão alta': 'Pressão arterial é considerada alta quando consistentemente acima de 130/80 mmHg. Fatores de risco incluem histórico familiar, idade, sobrepeso, sedentarismo e dieta rica em sódio.',
    'colesterol': 'O colesterol LDL ideal deve estar abaixo de 100 mg/dL. Pode ser controlado com dieta balanceada, exercícios regulares e, em alguns casos, medicamentos.',
    'gripe': 'A gripe comum dura geralmente de 5 a 7 dias. Sintomas incluem febre, dor de garganta, congestão nasal, dores musculares e fadiga. Repouso e hidratação são fundamentais.'
  };
  
  // Generate mock search results based on query
  const generateResults = (searchQuery: string): SearchResult[] => {
    // Base results that would come from the backend
    const baseResults: SearchResult[] = [
      {
        id: 1,
        title: `Tudo sobre ${searchQuery}: causas, sintomas e tratamentos`,
        excerpt: `Este artigo aborda de forma completa o que você precisa saber sobre ${searchQuery}, incluindo causas comuns, sintomas a observar e opções de tratamento recomendadas por especialistas.`,
        type: 'article',
        url: `/artigos/1`,
        imageUrl: 'https://source.unsplash.com/random/300x200?health',
        date: '2023-10-15',
        author: 'Dr. Marcos Silva',
        category: 'Saúde Geral'
      },
      {
        id: 2,
        title: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} durante a gravidez: o que você deve saber`,
        excerpt: `Guia completo para gestantes lidando com ${searchQuery}. Descubra quais medicamentos são seguros, mudanças de estilo de vida recomendadas e quando procurar ajuda médica.`,
        type: 'article',
        url: `/artigos/2`,
        date: '2023-11-22',
        author: 'Dra. Ana Campos',
        category: 'Saúde da Mulher'
      },
      {
        id: 3,
        title: `Perguntas frequentes sobre ${searchQuery}`,
        excerpt: `Nossa equipe médica responde às dúvidas mais comuns sobre ${searchQuery}. Encontre respostas confiáveis baseadas em evidências científicas atualizadas.`,
        type: 'question',
        url: `/categoria/faq`,
        date: '2023-12-05',
      },
      {
        id: 4,
        title: `Calculadora de risco para ${searchQuery}`,
        excerpt: `Ferramenta interativa para avaliar seu risco pessoal relacionado a ${searchQuery} com base em histórico médico, estilo de vida e outros fatores relevantes.`,
        type: 'tool',
        url: `/ferramentas/calculadora`,
      },
      {
        id: 5,
        title: `Especialistas em ${searchQuery}`,
        excerpt: `Encontre médicos especializados no tratamento de ${searchQuery} próximos a você. Consulte avaliações, especialidades e disponibilidade para consultas.`,
        type: 'specialist',
        url: `/especialistas`,
      },
      {
        id: 6,
        title: `Grupo de apoio: vivendo com ${searchQuery}`,
        excerpt: `Conecte-se com outras pessoas que compartilham experiências com ${searchQuery}. Troque dicas, desafios e histórias de superação.`,
        type: 'community',
        url: `/comunidade/grupos`,
      },
      {
        id: 7,
        title: `Novos tratamentos para ${searchQuery} em 2024`,
        excerpt: `Conheça as mais recentes pesquisas e avanços médicos no tratamento de ${searchQuery}, incluindo novos medicamentos e terapias alternativas.`,
        type: 'article',
        url: `/artigos/7`,
        date: '2024-01-10',
        author: 'Dr. Roberto Almeida',
        category: 'Avanços Médicos'
      },
      {
        id: 8,
        title: `Como prevenir ${searchQuery} naturalmente`,
        excerpt: `Estratégias naturais e mudanças no estilo de vida que podem ajudar a prevenir ou reduzir a ocorrência de ${searchQuery}, sem uso de medicamentos.`,
        type: 'article',
        url: `/artigos/8`,
        date: '2024-02-18',
        author: 'Dra. Juliana Costa',
        category: 'Medicina Preventiva'
      }
    ];
    
    return baseResults;
  };
  
  // Function to perform search
  const performSearch = (searchQuery: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setCurrentQuery(searchQuery);
    
    // Simulate API search delay
    const startTime = performance.now();
    setTimeout(() => {
      // Get mock results
      const searchResults = generateResults(searchQuery);
      
      // Apply any active filters
      let filteredResults = [...searchResults];
      
      if (filters.contentType.length > 0) {
        filteredResults = filteredResults.filter(result => 
          filters.contentType.includes(result.type)
        );
      }
      
      if (filters.date !== 'all' && filters.date) {
        const currentDate = new Date();
        const pastDate = new Date();
        
        switch(filters.date) {
          case 'day':
            pastDate.setDate(currentDate.getDate() - 1);
            break;
          case 'week':
            pastDate.setDate(currentDate.getDate() - 7);
            break;
          case 'month':
            pastDate.setMonth(currentDate.getMonth() - 1);
            break;
          case 'year':
            pastDate.setFullYear(currentDate.getFullYear() - 1);
            break;
        }
        
        filteredResults = filteredResults.filter(result => {
          if (!result.date) return false;
          const resultDate = new Date(result.date);
          return resultDate >= pastDate;
        });
      }
      
      if (filters.specialty && filters.specialty !== 'all') {
        filteredResults = filteredResults.filter(result => 
          result.category === filters.specialty
        );
      }
      
      // Check for direct answer
      const lowerQuery = searchQuery.toLowerCase();
      let answer = '';
      
      for (const key in directAnswers) {
        if (lowerQuery.includes(key)) {
          answer = directAnswers[key];
          break;
        }
      }
      
      setDirectAnswer(answer);
      setResults(filteredResults);
      setTotalResults(filteredResults.length);
      
      const endTime = performance.now();
      setSearchTime((endTime - startTime) / 1000); // Convert to seconds
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle search submission from the search bar
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    
    if (!searchQuery) return;
    
    // Update URL search params
    setSearchParams({ q: searchQuery });
    performSearch(searchQuery);
  };
  
  // Handle search result click
  const handleResultClick = (result: SearchResult) => {
    // Track which result was clicked
    console.log('Clicked result:', result.id, result.title);
    
    // Increment counter for viewed results
    setResultsViewed(prev => {
      const newCount = prev + 1;
      
      // Show feedback form after viewing 3 results
      if (newCount === 3) {
        setTimeout(() => {
          setShowFeedback(true);
        }, 500);
      }
      
      return newCount;
    });
  };
  
  // Handle feedback submission
  const handleFeedbackSubmit = (helpful: boolean) => {
    toast({
      title: "Obrigado pelo feedback!",
      description: helpful 
        ? "Ficamos felizes em ajudar com sua busca." 
        : "Vamos trabalhar para melhorar nossos resultados.",
      duration: 5000,
    });
    
    setShowFeedback(false);
  };
  
  // Toggle filter selection
  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'contentType') {
        if (prev.contentType.includes(value)) {
          newFilters.contentType = prev.contentType.filter(type => type !== value);
        } else {
          newFilters.contentType = [...prev.contentType, value];
        }
      } else {
        // @ts-ignore - This is fine since we're handling string values for other filters
        newFilters[filterType] = value;
      }
      
      return newFilters;
    });
    
    // Rerun search with new filters
    performSearch(currentQuery);
  };
  
  // Init search when component mounts or query changes
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);
  
  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6">
        {/* Back button and search header */}
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4 text-doctordicas-text-medium hover:text-doctordicas-blue transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-doctordicas-text-dark flex-1">Resultados da busca</h1>
        </div>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                name="search"
                defaultValue={query}
                className="pl-10 py-6"
                placeholder="Busque por sintomas, doenças, tratamentos..."
              />
            </div>
            <Button type="submit" className="bg-doctordicas-blue hover:bg-blue-600 py-6">
              Buscar
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="py-6 border-gray-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} />
            </Button>
          </div>
        </form>
        
        {/* Filters */}
        {showFilters && (
          <div className="mb-8 p-5 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-doctordicas-text-dark flex items-center">
                <Filter size={18} className="mr-1" /> Filtros de busca
              </h2>
              <Button variant="ghost" size="sm" onClick={() => {
                setFilters({
                  contentType: [],
                  date: 'all',
                  difficulty: 'all',
                  specialty: ''
                });
                performSearch(currentQuery);
              }}>
                <RefreshCw size={14} className="mr-1" /> Redefinir
              </Button>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* Content type filter */}
              <div>
                <h3 className="text-sm font-medium text-doctordicas-text-medium mb-2">Tipo de conteúdo</h3>
                <div className="space-y-2">
                  {[
                    { value: 'article', label: 'Artigos' },
                    { value: 'question', label: 'Perguntas' },
                    { value: 'tool', label: 'Ferramentas' },
                    { value: 'specialist', label: 'Especialistas' },
                    { value: 'community', label: 'Comunidade' }
                  ].map(type => (
                    <div key={type.value} className="flex items-center">
                      <button
                        type="button"
                        className={`flex items-center text-sm transition-colors ${
                          filters.contentType.includes(type.value)
                            ? 'text-doctordicas-blue font-medium'
                            : 'text-doctordicas-text-medium'
                        }`}
                        onClick={() => toggleFilter('contentType', type.value)}
                      >
                        <span className={`w-4 h-4 inline-block mr-2 rounded-sm border ${
                          filters.contentType.includes(type.value)
                            ? 'bg-doctordicas-blue border-doctordicas-blue text-white flex items-center justify-center'
                            : 'border-gray-300'
                        }`}>
                          {filters.contentType.includes(type.value) && <CheckCircle size={12} />}
                        </span>
                        {type.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Date filter */}
              <div>
                <h3 className="text-sm font-medium text-doctordicas-text-medium mb-2">Data de publicação</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Qualquer data' },
                    { value: 'day', label: 'Últimas 24 horas' },
                    { value: 'week', label: 'Última semana' },
                    { value: 'month', label: 'Último mês' },
                    { value: 'year', label: 'Último ano' }
                  ].map(date => (
                    <div key={date.value} className="flex items-center">
                      <button
                        type="button"
                        className={`flex items-center text-sm transition-colors ${
                          filters.date === date.value
                            ? 'text-doctordicas-blue font-medium'
                            : 'text-doctordicas-text-medium'
                        }`}
                        onClick={() => toggleFilter('date', date.value)}
                      >
                        <span className={`w-4 h-4 inline-block mr-2 rounded-full border ${
                          filters.date === date.value
                            ? 'border-doctordicas-blue'
                            : 'border-gray-300'
                        }`}>
                          {filters.date === date.value && (
                            <span className="block w-2 h-2 mx-auto mt-0.5 rounded-full bg-doctordicas-blue"></span>
                          )}
                        </span>
                        {date.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Difficulty level */}
              <div>
                <h3 className="text-sm font-medium text-doctordicas-text-medium mb-2">Nível de conhecimento</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Todos os níveis' },
                    { value: 'basic', label: 'Básico' },
                    { value: 'intermediate', label: 'Intermediário' },
                    { value: 'advanced', label: 'Avançado' },
                    { value: 'technical', label: 'Técnico/científico' }
                  ].map(level => (
                    <div key={level.value} className="flex items-center">
                      <button
                        type="button"
                        className={`flex items-center text-sm transition-colors ${
                          filters.difficulty === level.value
                            ? 'text-doctordicas-blue font-medium'
                            : 'text-doctordicas-text-medium'
                        }`}
                        onClick={() => toggleFilter('difficulty', level.value)}
                      >
                        <span className={`w-4 h-4 inline-block mr-2 rounded-full border ${
                          filters.difficulty === level.value
                            ? 'border-doctordicas-blue'
                            : 'border-gray-300'
                        }`}>
                          {filters.difficulty === level.value && (
                            <span className="block w-2 h-2 mx-auto mt-0.5 rounded-full bg-doctordicas-blue"></span>
                          )}
                        </span>
                        {level.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Specialty filter */}
              <div>
                <h3 className="text-sm font-medium text-doctordicas-text-medium mb-2">Especialidade médica</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className={`flex items-center text-sm transition-colors ${
                        !filters.specialty || filters.specialty === 'all'
                          ? 'text-doctordicas-blue font-medium'
                          : 'text-doctordicas-text-medium'
                      }`}
                      onClick={() => toggleFilter('specialty', 'all')}
                    >
                      <span className={`w-4 h-4 inline-block mr-2 rounded-full border ${
                        !filters.specialty || filters.specialty === 'all'
                          ? 'border-doctordicas-blue'
                          : 'border-gray-300'
                      }`}>
                        {(!filters.specialty || filters.specialty === 'all') && (
                          <span className="block w-2 h-2 mx-auto mt-0.5 rounded-full bg-doctordicas-blue"></span>
                        )}
                      </span>
                      Todas as especialidades
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {specialties.map(specialty => (
                      <div key={specialty} className="flex items-center">
                        <button
                          type="button"
                          className={`flex items-center text-sm transition-colors ${
                            filters.specialty === specialty
                              ? 'text-doctordicas-blue font-medium'
                              : 'text-doctordicas-text-medium'
                          }`}
                          onClick={() => toggleFilter('specialty', specialty)}
                        >
                          <span className={`w-4 h-4 inline-block mr-2 rounded-full border ${
                            filters.specialty === specialty
                              ? 'border-doctordicas-blue'
                              : 'border-gray-300'
                          }`}>
                            {filters.specialty === specialty && (
                              <span className="block w-2 h-2 mx-auto mt-0.5 rounded-full bg-doctordicas-blue"></span>
                            )}
                          </span>
                          {specialty}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Search results section */}
        {hasSearched && (
          <>
            {/* Search statistics */}
            <div className="mb-6 text-sm text-doctordicas-text-medium">
              {isLoading ? (
                <Skeleton className="w-72 h-5" />
              ) : (
                <>
                  {totalResults > 0 ? (
                    <p>{totalResults} resultados encontrados para "{currentQuery}" ({searchTime.toFixed(2)} segundos)</p>
                  ) : (
                    <p>Nenhum resultado encontrado para "{currentQuery}"</p>
                  )}
                </>
              )}
            </div>
            
            {/* Direct answer box */}
            {!isLoading && directAnswer && (
              <div className="mb-8 p-5 bg-white rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <BrainCircuit size={24} className="text-doctordicas-blue" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-doctordicas-text-dark mb-2">Resposta rápida</h2>
                    <p className="text-doctordicas-text-medium">{directAnswer}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Results listing */}
            <div className="space-y-6">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex gap-4">
                      <Skeleton className="w-20 h-20 rounded" />
                      <div className="flex-1">
                        <Skeleton className="w-3/4 h-6 mb-2" />
                        <Skeleton className="w-full h-4 mb-1" />
                        <Skeleton className="w-full h-4 mb-1" />
                        <Skeleton className="w-2/3 h-4 mb-4" />
                        <div className="flex gap-2">
                          <Skeleton className="w-20 h-5" />
                          <Skeleton className="w-24 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                results.length > 0 ? (
                  results.map((result) => (
                    <Link 
                      key={result.id} 
                      to={result.url}
                      className="block p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex gap-4">
                        {result.imageUrl && (
                          <div className="hidden sm:block">
                            <img 
                              src={result.imageUrl} 
                              alt={result.title} 
                              className="w-20 h-20 object-cover rounded" 
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h2 className="font-semibold text-doctordicas-text-dark mb-1 text-lg">
                            {result.title}
                          </h2>
                          <p className="text-doctordicas-text-medium mb-3 text-sm line-clamp-2">
                            {result.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs">
                            {result.type === 'article' && (
                              <span className="badge-blue">Artigo</span>
                            )}
                            {result.type === 'question' && (
                              <span className="badge-green">Pergunta</span>
                            )}
                            {result.type === 'tool' && (
                              <span className="badge-yellow">Ferramenta</span>
                            )}
                            {result.type === 'specialist' && (
                              <span className="badge bg-purple-100 text-purple-700">Especialista</span>
                            )}
                            {result.type === 'community' && (
                              <span className="badge bg-indigo-100 text-indigo-700">Comunidade</span>
                            )}
                            
                            {result.date && (
                              <span className="flex items-center text-doctordicas-text-medium">
                                <Calendar size={12} className="mr-1" />
                                {new Date(result.date).toLocaleDateString('pt-BR')}
                              </span>
                            )}
                            
                            {result.author && (
                              <span className="flex items-center text-doctordicas-text-medium">
                                <User size={12} className="mr-1" />
                                {result.author}
                              </span>
                            )}
                            
                            {result.category && (
                              <span className="flex items-center text-doctordicas-text-medium">
                                <BookOpen size={12} className="mr-1" />
                                {result.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-2">
                      Nenhum resultado encontrado
                    </h2>
                    <p className="text-doctordicas-text-medium mb-6 max-w-md mx-auto">
                      Não encontramos nenhum conteúdo para "{currentQuery}". Tente usar termos diferentes ou mais gerais.
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium text-sm text-doctordicas-text-medium">Sugestões populares:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['Dor de cabeça', 'Ansiedade', 'Pressão alta', 'Diabetes', 'Vitaminas'].map(term => (
                          <Button 
                            key={term} 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSearchParams({ q: term });
                              performSearch(term);
                            }}
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
        
        {/* User feedback popup */}
        {showFeedback && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded-xl shadow-lg border border-blue-100 max-w-sm animate-fade-in z-50">
            <h3 className="font-semibold text-doctordicas-text-dark mb-2">
              Esta busca foi útil para você?
            </h3>
            <p className="text-sm text-doctordicas-text-medium mb-4">
              Seu feedback nos ajuda a melhorar os resultados de busca.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleFeedbackSubmit(false)}
              >
                Não
              </Button>
              <Button 
                className="flex-1 bg-doctordicas-blue hover:bg-blue-600"
                onClick={() => handleFeedbackSubmit(true)}
              >
                Sim
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default SearchResultsPage;
