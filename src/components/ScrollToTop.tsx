
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-doctordicas-blue text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-doctordicas-blue z-40
            ${isHovered ? 'bg-blue-600 scale-110' : 'hover:bg-blue-600 hover:scale-110'}`}
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={20} className={`transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
