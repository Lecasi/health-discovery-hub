
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const popularSearches = [
    'Dor de cabeça', 
    'Colesterol alto', 
    'Vacina covid', 
    'Pressão arterial', 
    'Insônia',
    'Ansiedade'
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    setShowSuggestions(false);
    // Implement search functionality
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    if (query.length > 0) {
      setShowSuggestions(true);
    }
  };
  
  useEffect(() => {
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
  
  const handleClickOutside = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setIsFocused(false);
    }, 100);
  };
  
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 mb-8 relative z-30">
      <form 
        onSubmit={handleSearch}
        className={`relative w-full max-w-3xl mx-auto transition-all duration-300 transform ${
          isFocused ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        <div className="relative">
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            type="text"
            placeholder="O que você está buscando? Ex: Dor de cabeça, Colesterol alto..."
            className="w-full pl-12 pr-28 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/30 focus:border-doctordicas-blue shadow-md text-doctordicas-text-dark transition-shadow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleClickOutside}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpar busca"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-doctordicas-blue text-white px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/40"
          >
            Buscar
          </button>
        </div>
        
        {/* Search suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 animate-fade-in z-50">
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
                      setShowSuggestions(false);
                    }}
                  >
                    <Search size={16} className="text-gray-400 mr-3" />
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Popular searches */}
        {isFocused && !query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 animate-fade-in">
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
                    }}
                  >
                    <Search size={16} className="text-gray-400 mr-3" />
                    {search}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
