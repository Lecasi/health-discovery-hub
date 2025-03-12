
import React, { useState } from 'react';
import { Bot, ChevronRight, Send } from 'lucide-react';

const AIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const suggestionChips = [
    { id: 1, text: 'Dor de cabeça' },
    { id: 2, text: 'Baixar o colesterol' },
    { id: 3, text: 'Cansaço constante' },
    { id: 4, text: 'Vitamina D baixa' },
  ];

  const handleChipClick = (text: string) => {
    setQuery(text);
    setIsExpanded(true);
    setIsTyping(true);
    
    // Simulate AI typing response
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsTyping(true);
    // Simulate AI typing response
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className={`bg-doctordicas-blue-light rounded-2xl p-6 max-w-4xl mx-auto card-shadow transition-all duration-300 ${
        isExpanded ? 'shadow-xl' : ''
      }`}>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
          <div className={`bg-white rounded-full p-3 shadow-md transition-transform duration-300 ${
            isTyping ? 'animate-pulse' : ''
          }`}>
            <div className="bg-doctordicas-blue w-10 h-10 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-1">
              Como posso ajudar você hoje?
            </h2>
            <p className="text-doctordicas-text-medium mb-3">
              Nossa IA analisa sua dúvida e conecta você com a melhor solução - seja um artigo especializado ou uma consulta.
            </p>
            
            {!isExpanded ? (
              <div className="flex flex-wrap gap-2 mt-4 mb-2">
                {suggestionChips.map((chip) => (
                  <button 
                    key={chip.id}
                    className="chip bg-white hover:bg-doctordicas-blue hover:text-white transition-colors duration-300 border border-doctordicas-blue text-doctordicas-blue group"
                    onClick={() => handleChipClick(chip.text)}
                  >
                    {chip.text}
                    <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-4 animate-fade-in">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue"
                    placeholder="Digite sua dúvida..."
                  />
                  <button
                    type="submit"
                    className="bg-doctordicas-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="Enviar pergunta"
                  >
                    <Send size={18} />
                  </button>
                </form>
                
                {isTyping && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-sm animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                )}
                
                {!isTyping && isExpanded && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="mt-4 text-doctordicas-blue hover:text-blue-600 text-sm transition-colors"
                  >
                    Ver outras sugestões
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
