
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, Bookmark, Check, ArrowRight, Sparkles, BarChart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const popularSearches = [
    'Dor de cabeça', 
    'Colesterol alto', 
    'Vacina covid', 
    'Pressão arterial', 
    'Insônia',
    'Ansiedade'
  ];
  
  const trendingSearches = [
    'Meditação para dormir',
    'Sintomas de covid',
    'Vitamina D baixa',
    'Alergias sazonais'
  ];

  const relatedQuestions = {
    'dor': ['Dor nas costas pode ser rim?', 'Dor de cabeça constante é perigoso?', 'Dores musculares após treino'],
    'gripe': ['Gripe ou covid: como diferenciar?', 'Quanto tempo dura uma gripe comum?', 'Remédios caseiros para gripe'],
    'dieta': ['Dieta para baixar colesterol', 'Dieta low carb funciona?', 'Alimentos para controle de diabetes']
  };

  const specialties = {
    'cabeça': 'Neurologia',
    'coração': 'Cardiologia',
    'estômago': 'Gastroenterologia',
    'pele': 'Dermatologia',
    'ansiedade': 'Psiquiatria',
    'colesterol': 'Endocrinologia'
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    console.log('Searching for:', query);
    
    // Store in recent searches
    if (!recentSearches.includes(query)) {
      const updatedSearches = [query, ...recentSearches].slice(0, 3);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setShowSuggestions(false);
      
      // Navigate to search results page
      navigate(`/busca?q=${encodeURIComponent(query)}`);
    }, 800);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    if (query.length > 0) {
      setShowSuggestions(true);
      setHasTyped(true);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery.length > 0) {
      setHasTyped(true);
    } else {
      setHasTyped(false);
    }
  };
  
  // Get related questions based on query
  const getRelatedQuestions = () => {
    for (const key in relatedQuestions) {
      if (query.toLowerCase().includes(key)) {
        return relatedQuestions[key as keyof typeof relatedQuestions];
      }
    }
    return [];
  };
  
  // Get related specialty based on query
  const getRelatedSpecialty = () => {
    for (const key in specialties) {
      if (query.toLowerCase().includes(key)) {
        return specialties[key as keyof typeof specialties];
      }
    }
    return null;
  };
  
  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    if (query.length > 0) {
      const filtered = popularSearches.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setHasTyped(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 mb-8 relative z-30" ref={searchRef}>
      <form 
        onSubmit={handleSearch}
        className={`relative w-full max-w-3xl mx-auto transition-all duration-300 transform ${
          isFocused ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        <div className="relative">
          <Search 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              isSearching ? 'text-doctordicas-blue animate-pulse' : 'text-gray-400'
            }`} 
            size={20} 
          />
          <input
            type="text"
            placeholder="O que você está buscando? Ex: Dor de cabeça, Colesterol alto..."
            className={`w-full pl-12 pr-28 py-4 rounded-full border transition-all duration-300 text-doctordicas-text-dark ${
              isFocused 
                ? 'border-doctordicas-blue ring-2 ring-doctordicas-blue/30 shadow-lg' 
                : 'border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/30 focus:border-doctordicas-blue'
            }`}
            value={query}
            onChange={handleQueryChange}
            onFocus={handleFocus}
            disabled={isSearching}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpar busca"
            >
              <X size={18} className="hover:rotate-90 transition-transform duration-300" />
            </button>
          )}
          <button
            type="submit"
            disabled={isSearching}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-doctordicas-blue text-white px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/40 ${
              isSearching ? 'opacity-80' : ''
            }`}
          >
            {isSearching ? (
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-1"></div>
                <span>Buscando</span>
              </div>
            ) : 'Buscar'}
          </button>
        </div>
        
        {/* Advanced search suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 animate-fade-in z-50">
            {hasTyped && query.length >= 2 ? (
              <>
                {/* Autocomplete suggestions */}
                {suggestions.length > 0 && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-2 flex items-center">
                      <p className="text-doctordicas-text-medium text-sm font-medium">Sugestões</p>
                    </div>
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li 
                          key={index}
                          className="border-b border-gray-100 last:border-none"
                        >
                          <button
                            type="button"
                            className="flex items-center w-full px-4 py-3 hover:bg-gray-50 text-left text-doctordicas-text-dark transition-colors"
                            onClick={() => {
                              setQuery(suggestion);
                              // Auto submit after selection
                              setTimeout(() => {
                                const formElement = document.querySelector('form');
                                if (formElement) formElement.dispatchEvent(new Event('submit', { cancelable: true }));
                              }, 100);
                            }}
                          >
                            <Search size={16} className="text-gray-400 mr-3" />
                            <span dangerouslySetInnerHTML={{
                              __html: suggestion.replace(
                                new RegExp(query, 'gi'),
                                match => `<span class="bg-yellow-100 font-medium">${match}</span>`
                              )
                            }} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Related questions based on query */}
                {getRelatedQuestions().length > 0 && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-2 flex items-center">
                      <p className="text-doctordicas-text-medium text-sm font-medium flex items-center">
                        <Sparkles size={14} className="mr-1 text-doctordicas-blue" />
                        Perguntas relacionadas
                      </p>
                    </div>
                    <ul>
                      {getRelatedQuestions().map((question, index) => (
                        <li 
                          key={`question-${index}`}
                          className="border-b border-gray-100 last:border-none"
                        >
                          <button
                            type="button"
                            className="flex items-center w-full px-4 py-3 hover:bg-gray-50 text-left text-doctordicas-text-dark transition-colors"
                            onClick={() => {
                              setQuery(question);
                              setTimeout(() => {
                                const formElement = document.querySelector('form');
                                if (formElement) formElement.dispatchEvent(new Event('submit', { cancelable: true }));
                              }, 100);
                            }}
                          >
                            <ArrowRight size={14} className="text-doctordicas-blue mr-3" />
                            {question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Related specialty if detected */}
                {getRelatedSpecialty() && (
                  <div className="border-b border-gray-100 px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm text-doctordicas-text-medium mb-1 flex items-center">
                      <BarChart size={14} className="mr-1 text-doctordicas-green" />
                      Especialidade relacionada:
                    </p>
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-green-50 text-doctordicas-green rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
                      onClick={() => {
                        navigate(`/categoria/${encodeURIComponent(getRelatedSpecialty() as string)}`);
                      }}
                    >
                      {getRelatedSpecialty()}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-2 flex items-center justify-between">
                      <p className="text-doctordicas-text-medium text-sm font-medium flex items-center">
                        <Clock size={14} className="mr-1" />
                        Buscas recentes
                      </p>
                      <button 
                        className="text-xs text-doctordicas-blue hover:text-blue-700 transition-colors"
                        onClick={clearRecentSearches}
                      >
                        Limpar
                      </button>
                    </div>
                    <ul>
                      {recentSearches.map((search, index) => (
                        <li 
                          key={`recent-${index}`}
                          className="border-b border-gray-100 last:border-none"
                        >
                          <button
                            type="button"
                            className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-left text-doctordicas-text-dark transition-colors group"
                            onClick={() => {
                              setQuery(search);
                              setShowSuggestions(false);
                              setTimeout(() => {
                                const formElement = document.querySelector('form');
                                if (formElement) formElement.dispatchEvent(new Event('submit', { cancelable: true }));
                              }, 100);
                            }}
                          >
                            <Clock size={14} className="text-gray-400 mr-3" />
                            <span className="flex-1">{search}</span>
                            <Bookmark size={14} className="text-gray-300 group-hover:text-doctordicas-blue transition-colors mr-1" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Trending searches */}
                <div className="px-4 py-2 border-b border-gray-100 flex items-center">
                  <p className="text-doctordicas-text-medium text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-1 text-doctordicas-blue" />
                    Em tendência agora
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="ml-2 bg-blue-50 text-doctordicas-blue text-xs px-1.5 py-0.5 rounded-full">
                          NOVO
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white shadow-lg p-2 text-xs">
                        <p>Buscas populares nas últimas 24h</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <ul className="grid grid-cols-2">
                  {trendingSearches.map((search, index) => (
                    <li 
                      key={`trending-${index}`}
                      className="border-b border-gray-100 last:border-none"
                    >
                      <button
                        type="button"
                        className="flex items-center w-full px-4 py-3 hover:bg-gray-50 text-left text-doctordicas-text-dark transition-colors"
                        onClick={() => {
                          setQuery(search);
                          setShowSuggestions(false);
                          setTimeout(() => {
                            const formElement = document.querySelector('form');
                            if (formElement) formElement.dispatchEvent(new Event('submit', { cancelable: true }));
                          }, 100);
                        }}
                      >
                        <TrendingUp size={14} className="text-doctordicas-blue mr-2" />
                        {search}
                      </button>
                    </li>
                  ))}
                </ul>
                
                {/* Popular searches */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-doctordicas-text-medium text-sm font-medium">Buscas populares</p>
                </div>
                <ul>
                  {popularSearches.slice(0, 4).map((search, index) => (
                    <li 
                      key={index}
                      className="border-b border-gray-100 last:border-none"
                    >
                      <button
                        type="button"
                        className="flex items-center w-full px-4 py-3 hover:bg-gray-50 text-left text-doctordicas-text-dark transition-colors"
                        onClick={() => {
                          setQuery(search);
                          setShowSuggestions(false);
                          setTimeout(() => {
                            const formElement = document.querySelector('form');
                            if (formElement) formElement.dispatchEvent(new Event('submit', { cancelable: true }));
                          }, 100);
                        }}
                      >
                        <Search size={16} className="text-gray-400 mr-3" />
                        {search}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
