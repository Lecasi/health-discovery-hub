
import React from 'react';
import { Zap, TrendingUp, Users, Clock } from 'lucide-react';

const TrendingTopics = () => {
  const topics = [
    {
      id: 1,
      title: 'Covid longa',
      searches: '42.560+',
      icon: <Zap className="text-doctordicas-red" size={18} />,
      color: 'red'
    },
    {
      id: 2,
      title: 'Saúde mental',
      searches: '38.920+',
      icon: <TrendingUp className="text-doctordicas-blue" size={18} />,
      color: 'blue'
    },
    {
      id: 3,
      title: 'Imunidade natural',
      searches: '26.450+',
      icon: <Users className="text-doctordicas-green" size={18} />,
      color: 'green'
    },
    {
      id: 4,
      title: 'Jejum intermitente',
      searches: '21.980+',
      icon: <Clock className="text-doctordicas-yellow" size={18} />,
      color: 'yellow'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="section-title">Tendências de Pesquisa</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map(topic => (
          <div 
            key={topic.id} 
            className={`rounded-xl p-4 border-l-4 bg-white card-shadow hover:shadow-md transition-all duration-300 border-doctordicas-${topic.color} cursor-pointer hover:-translate-y-1`}
          >
            <div className="flex items-center gap-2 mb-2">
              {topic.icon}
              <span className="text-sm font-medium text-doctordicas-text-medium">Em alta</span>
            </div>
            
            <h3 className="font-semibold text-doctordicas-text-dark mb-1">
              {topic.title}
            </h3>
            
            <p className="text-xs text-doctordicas-text-medium">
              {topic.searches} buscas recentes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
