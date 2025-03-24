
import React from 'react';
import { FileText, Heart, Utensils, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthTools = () => {
  const navigate = useNavigate();
  
  const tools = [
    {
      id: 1,
      icon: <FileText className="text-doctordicas-blue" size={24} />,
      title: 'Interpretador de Exames',
      description: 'Entenda seus resultados',
      action: 'Enviar exame para análise',
      path: '/exames',
      color: 'blue'
    },
    {
      id: 2,
      icon: <Heart className="text-doctordicas-red" size={24} />,
      title: 'Calculadora Cardíaca',
      description: 'Avalie seu coração',
      action: 'Calcular risco cardíaco',
      path: '#',
      color: 'red'
    },
    {
      id: 3,
      icon: <Utensils className="text-doctordicas-green" size={24} />,
      title: 'Plano Nutricional',
      description: 'Dieta personalizada',
      action: 'Criar plano alimentar',
      path: '#',
      color: 'green'
    },
    {
      id: 4,
      icon: <DollarSign className="text-doctordicas-blue" size={24} />,
      title: 'Comparador de Preços',
      description: 'Economize em medicamentos',
      action: 'Comparar preços agora',
      path: '/comparador',
      color: 'blue'
    }
  ];

  const handleToolClick = (path: string) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <h2 className="section-title">Ferramentas inteligentes</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <div 
            key={tool.id} 
            className="bg-white rounded-2xl p-6 card-shadow card-hover"
          >
            <div className="flex items-start mb-4">
              <div className={`p-2 rounded-lg bg-${tool.color === 'blue' ? 'blue' : tool.color === 'red' ? 'red' : 'green'}-50`}>
                {tool.icon}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-doctordicas-text-dark">
                  {tool.title}
                </h3>
                <p className="text-sm text-doctordicas-text-medium">
                  {tool.description}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => handleToolClick(tool.path)}
              className={`w-full text-center py-2 rounded-lg border border-doctordicas-${tool.color === 'blue' ? 'blue' : tool.color === 'red' ? 'red' : 'green'} text-doctordicas-${tool.color === 'blue' ? 'blue' : tool.color === 'red' ? 'red' : 'green'} font-medium hover:bg-doctordicas-${tool.color === 'blue' ? 'blue' : tool.color === 'red' ? 'red' : 'green'} hover:text-white transition-colors`}
            >
              {tool.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTools;
