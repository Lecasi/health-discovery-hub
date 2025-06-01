
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Heart, Utensils, DollarSign, ArrowRight } from 'lucide-react';

const QuickAccessCards = () => {
  const tools = [
    {
      id: 1,
      icon: <FileText className="text-doctordicas-blue" size={32} />,
      title: 'Interpretador de Exames',
      description: 'Entenda seus resultados médicos de forma clara e detalhada',
      path: '/exames',
      color: 'blue',
      popular: true
    },
    {
      id: 2,
      icon: <Heart className="text-doctordicas-red" size={32} />,
      title: 'Calculadora Cardíaca',
      description: 'Avalie seu risco cardiovascular com precisão',
      path: '/calculadora-cardiaca',
      color: 'red'
    },
    {
      id: 3,
      icon: <Utensils className="text-doctordicas-green" size={32} />,
      title: 'Plano Nutricional',
      description: 'Dieta personalizada para seus objetivos',
      path: '/plano-nutricional',
      color: 'green'
    },
    {
      id: 4,
      icon: <DollarSign className="text-doctordicas-blue" size={32} />,
      title: 'Comparador de Preços',
      description: 'Encontre os melhores preços de medicamentos',
      path: '/medicamentos',
      color: 'blue'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-doctordicas-text-dark mb-4">
          Ferramentas Inteligentes
        </h2>
        <p className="text-doctordicas-text-medium text-lg max-w-2xl mx-auto">
          Acesse nossas ferramentas desenvolvidas para cuidar da sua saúde de forma inteligente e personalizada
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Link 
            key={tool.id}
            to={tool.path}
            className="group relative bg-white rounded-2xl p-6 card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {tool.popular && (
              <div className="absolute -top-3 left-6 bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                Popular
              </div>
            )}
            
            <div className="mb-4">
              <div className={`inline-flex p-3 rounded-xl bg-${tool.color === 'blue' ? 'blue' : tool.color === 'red' ? 'red' : 'green'}-50 group-hover:scale-110 transition-transform duration-300`}>
                {tool.icon}
              </div>
            </div>
            
            <h3 className="font-semibold text-doctordicas-text-dark mb-2 text-lg">
              {tool.title}
            </h3>
            
            <p className="text-sm text-doctordicas-text-medium mb-4 leading-relaxed">
              {tool.description}
            </p>
            
            <div className="flex items-center text-doctordicas-blue font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
              <span>Acessar ferramenta</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCards;
