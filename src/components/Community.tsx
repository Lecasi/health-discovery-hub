
import React from 'react';
import { Heart, Brain, Apple } from 'lucide-react';

const Community = () => {
  const communities = [
    {
      id: 1,
      name: 'Saúde Cardíaca',
      members: 2486,
      icon: <Heart className="text-doctordicas-red" size={24} />,
      color: 'red'
    },
    {
      id: 2,
      name: 'Saúde Mental',
      members: 3721,
      icon: <Brain className="text-doctordicas-blue" size={24} />,
      color: 'blue'
    },
    {
      id: 3,
      name: 'Nutrição Saudável',
      members: 4892,
      icon: <Apple className="text-doctordicas-green" size={24} />,
      color: 'green'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <h2 className="section-title">Comunidade ativa</h2>
      <p className="text-doctordicas-text-medium mb-6">
        Conecte-se com pessoas que compartilham experiências similares
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div 
            key={community.id} 
            className="bg-white rounded-2xl p-6 card-shadow card-hover"
          >
            <div className="flex items-center mb-6">
              <div className={`p-2 mr-4 rounded-full bg-${community.color === 'blue' ? 'blue' : community.color === 'red' ? 'red' : 'green'}-100`}>
                {community.icon}
              </div>
              <div>
                <h3 className="font-semibold text-doctordicas-text-dark">
                  {community.name}
                </h3>
                <p className="text-sm text-doctordicas-text-medium">
                  {community.members.toLocaleString()} membros
                </p>
              </div>
            </div>
            
            <button 
              className={`w-full text-center py-2 rounded-lg font-medium transition-colors ${
                community.id === 1 
                  ? 'bg-white text-doctordicas-red border border-doctordicas-red hover:bg-doctordicas-red hover:text-white' 
                  : community.id === 2 
                  ? 'bg-white text-doctordicas-blue border border-doctordicas-blue hover:bg-doctordicas-blue hover:text-white'
                  : 'bg-white text-doctordicas-green border border-doctordicas-green hover:bg-doctordicas-green hover:text-white'
              }`}
            >
              Participar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
