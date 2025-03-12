
import React, { useState, useEffect } from 'react';
import { Bot, ChevronRight, Send, Sparkles, MessageSquare, Loader } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeUsers, setActiveUsers] = useState(476);
  const [pulseEffect, setPulseEffect] = useState(false);
  const { toast } = useToast();
  
  const suggestionChips = [
    { id: 1, text: 'Dor de cabeça', isNew: false },
    { id: 2, text: 'Baixar o colesterol', isNew: false },
    { id: 3, text: 'Cansaço constante', isNew: true },
    { id: 4, text: 'Vitamina D baixa', isNew: false },
  ];

  useEffect(() => {
    // Simulate fluctuations in active users
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 10) - 4; // Between -4 and +5
        return Math.max(450, prev + change);
      });
    }, 10000);

    // Occasional pulse animation
    const pulseInterval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 2000);
    }, 15000);
    
    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleChipClick = (text: string) => {
    setQuery(text);
    setIsExpanded(true);
    setIsTyping(true);
    
    // Simulate AI typing response
    setTimeout(() => {
      setIsTyping(false);
      toast({
        title: "Resposta pronta",
        description: `Sua pergunta sobre "${text}" foi respondida`,
        duration: 3000
      });
    }, 2000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsTyping(true);
    // Simulate AI typing response
    setTimeout(() => {
      setIsTyping(false);
      toast({
        title: "Resposta pronta",
        description: "Sua pergunta foi respondida pelo nosso assistente",
        duration: 3000
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className={`bg-doctordicas-blue-light rounded-2xl p-6 max-w-4xl mx-auto transition-all duration-300 ${
        isExpanded ? 'shadow-xl' : 'card-shadow'
      }`}>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
          <div className={`relative bg-white rounded-full p-3 shadow-md transition-transform duration-300 ${
            pulseEffect ? 'scale-110' : ''
          } ${isTyping ? 'animate-pulse' : ''}`}>
            <div className={`relative bg-doctordicas-blue w-10 h-10 rounded-full flex items-center justify-center ${
              pulseEffect ? 'animate-pulse' : ''
            }`}>
              <Bot size={20} className="text-white" />
              {pulseEffect && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-doctordicas-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-doctordicas-green"></span>
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-1">
                Como posso ajudar você hoje?
              </h2>
              <div className="hidden md:flex items-center text-xs bg-green-100 text-doctordicas-green px-2 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-doctordicas-green mr-1 animate-pulse"></div>
                <span>{activeUsers} usuários ativos</span>
              </div>
            </div>
            <p className="text-doctordicas-text-medium mb-3">
              Nossa IA analisa sua dúvida e conecta você com a melhor solução - seja um artigo especializado ou uma consulta.
            </p>
            
            {!isExpanded ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mt-4 mb-2">
                  {suggestionChips.map((chip) => (
                    <button 
                      key={chip.id}
                      className="chip bg-white hover:bg-doctordicas-blue hover:text-white transition-colors duration-300 border border-doctordicas-blue text-doctordicas-blue group relative"
                      onClick={() => handleChipClick(chip.text)}
                    >
                      {chip.text}
                      <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {chip.isNew && (
                        <span className="absolute -top-2 -right-2 bg-doctordicas-red text-white text-[10px] px-1 py-0.5 rounded-full">
                          NOVO
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center text-doctordicas-text-medium text-sm">
                  <Sparkles size={14} className="text-doctordicas-blue mr-1" />
                  <span>Respostas geradas em segundos por nossa IA avançada</span>
                </div>
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
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    className={`bg-doctordicas-blue text-white p-2 rounded-lg transition-colors ${
                      isTyping ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                    aria-label="Enviar pergunta"
                    disabled={isTyping}
                  >
                    {isTyping ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </form>
                
                {isTyping && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-doctordicas-blue/20 flex items-center justify-center">
                        <Bot size={14} className="text-doctordicas-blue" />
                      </div>
                      <div className="w-full">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="pl-8">
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                )}
                
                {!isTyping && isExpanded && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-doctordicas-blue hover:text-blue-600 text-sm transition-colors flex items-center"
                    >
                      <ChevronRight size={14} className="mr-1 rotate-180" />
                      Ver outras sugestões
                    </button>
                    
                    <div className="flex items-center text-xs text-doctordicas-text-medium">
                      <MessageSquare size={12} className="mr-1" />
                      <span>5 perguntas restantes hoje</span>
                    </div>
                  </div>
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
