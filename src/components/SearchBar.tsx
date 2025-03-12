
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 mb-8">
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
            className="w-full pl-12 pr-28 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue shadow-sm text-doctordicas-text-dark"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-doctordicas-blue text-white px-5 py-2 rounded-full font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/40"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
