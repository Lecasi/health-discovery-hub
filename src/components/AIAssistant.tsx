
import React from 'react';

const AIAssistant = () => {
  const suggestionChips = [
    { id: 1, text: 'Dor de cabeça' },
    { id: 2, text: 'Baixar o colesterol' },
    { id: 3, text: 'Cansaço constante' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-doctordicas-blue-light rounded-2xl p-6 max-w-4xl mx-auto card-shadow animate-fade-in">
        <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
          <div className="bg-white rounded-full p-3 shadow-md">
            <div className="bg-doctordicas-blue w-10 h-10 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">AI</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-1">Como posso ajudar você hoje?</h2>
            <p className="text-doctordicas-text-medium mb-3">
              Nossa IA analisa sua dúvida e conecta você com a melhor solução - seja um artigo especializado ou uma consulta.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {suggestionChips.map((chip) => (
                <button 
                  key={chip.id}
                  className="chip bg-white hover:bg-doctordicas-blue hover:text-white transition-colors duration-300 border border-doctordicas-blue text-doctordicas-blue"
                >
                  {chip.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
