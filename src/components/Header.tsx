
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="bg-doctordicas-blue text-white font-bold py-1 px-3 rounded-lg">
                doctordicas
              </div>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-doctordicas-text-dark hover:text-doctordicas-blue transition-colors font-medium">
              Temas
            </a>
            <a href="#" className="text-doctordicas-text-dark hover:text-doctordicas-blue transition-colors font-medium">
              Consultas
            </a>
            <a href="#" className="text-doctordicas-text-dark hover:text-doctordicas-blue transition-colors font-medium">
              Comunidade
            </a>
            <a href="#" className="text-doctordicas-text-dark hover:text-doctordicas-blue transition-colors font-medium">
              Meu Perfil
            </a>
          </nav>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-doctordicas-text-dark p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="animate-fade-in" />
              ) : (
                <Menu size={24} className="animate-fade-in" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-doctordicas-text-dark hover:bg-doctordicas-blue-light hover:text-doctordicas-blue"
            >
              Temas
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-doctordicas-text-dark hover:bg-doctordicas-blue-light hover:text-doctordicas-blue"
            >
              Consultas
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-doctordicas-text-dark hover:bg-doctordicas-blue-light hover:text-doctordicas-blue"
            >
              Comunidade
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-doctordicas-text-dark hover:bg-doctordicas-blue-light hover:text-doctordicas-blue"
            >
              Meu Perfil
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
