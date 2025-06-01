
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Heart, Utensils, DollarSign, ArrowRight } from 'lucide-react';

const QuickAccessCards = () => {
  const tools = [
    {
      id: 1,
      icon: <FileText className="text-doctordicas-blue" size={24} />,
      title: 'Interpretador de Exames',
      description: 'Entenda seus resultados médicos',
      path: '/exames'
    },
    {
      id: 2,
      icon: <Heart className="text-doctordicas-red" size={24} />,
      title: 'Calculadora Cardíaca',
      description: 'Avalie seu risco cardiovascular',
      path: '/calculadora-cardiaca'
    },
    {
      id: 3,
      icon: <Utensils className="text-doctordicas-green" size={24} />,
      title: 'Plano Nutricional',
      description: 'Dieta personalizada',
      path: '/plano-nutricional'
    },
    {
      id: 4,
      icon: <DollarSign className="text-doctordicas-blue" size={24} />,
      title: 'Comparador de Preços',
      description: 'Encontre melhores preços',
      path: '/medicamentos'
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-doctordicas-text-dark mb-3">
            Serviços Complementares
          </h2>
          <p className="text-doctordicas-text-medium max-w-xl mx-auto">
            Ferramentas adicionais para apoiar o cuidado com sua saúde
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <Link 
              key={tool.id}
              to={tool.path}
              className="group bg-white rounded-lg p-4 card-shadow hover:shadow-md transition-all duration-300"
            >
              <div className="mb-3">
                <div className="inline-flex p-2 rounded-lg bg-gray-50 group-hover:scale-105 transition-transform duration-300">
                  {tool.icon}
                </div>
              </div>
              
              <h3 className="font-medium text-doctordicas-text-dark mb-1 text-base">
                {tool.title}
              </h3>
              
              <p className="text-xs text-doctordicas-text-medium mb-3">
                {tool.description}
              </p>
              
              <div className="flex items-center text-doctordicas-blue font-medium text-xs group-hover:translate-x-1 transition-transform duration-300">
                <span>Acessar</span>
                <ArrowRight size={12} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCards;
