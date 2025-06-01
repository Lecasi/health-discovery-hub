
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Utensils, Baby, Activity, Pill, Eye, Stethoscope } from 'lucide-react';

const ContentCategories = () => {
  const categories = [
    {
      id: 1,
      icon: <Heart className="text-red-500" size={28} />,
      title: 'Cardiologia',
      description: 'Saúde do coração e sistema cardiovascular',
      articleCount: 85,
      path: '/artigos?categoria=cardiologia'
    },
    {
      id: 2,
      icon: <Brain className="text-purple-500" size={28} />,
      title: 'Neurologia',
      description: 'Sistema nervoso e saúde mental',
      articleCount: 72,
      path: '/artigos?categoria=neurologia'
    },
    {
      id: 3,
      icon: <Utensils className="text-green-500" size={28} />,
      title: 'Nutrição',
      description: 'Alimentação saudável e dietas',
      articleCount: 96,
      path: '/artigos?categoria=nutricao'
    },
    {
      id: 4,
      icon: <Baby className="text-pink-500" size={28} />,
      title: 'Pediatria',
      description: 'Saúde infantil e desenvolvimento',
      articleCount: 64,
      path: '/artigos?categoria=pediatria'
    },
    {
      id: 5,
      icon: <Activity className="text-blue-500" size={28} />,
      title: 'Atividade Física',
      description: 'Exercícios e vida ativa',
      articleCount: 58,
      path: '/artigos?categoria=exercicios'
    },
    {
      id: 6,
      icon: <Pill className="text-orange-500" size={28} />,
      title: 'Medicamentos',
      description: 'Informações sobre remédios',
      articleCount: 43,
      path: '/artigos?categoria=medicamentos'
    },
    {
      id: 7,
      icon: <Eye className="text-indigo-500" size={28} />,
      title: 'Oftalmologia',
      description: 'Saúde dos olhos e visão',
      articleCount: 31,
      path: '/artigos?categoria=oftalmologia'
    },
    {
      id: 8,
      icon: <Stethoscope className="text-teal-500" size={28} />,
      title: 'Clínica Geral',
      description: 'Medicina preventiva e geral',
      articleCount: 89,
      path: '/artigos?categoria=clinica-geral'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-doctordicas-text-dark mb-4">
          Explore por Especialidade
        </h2>
        <p className="text-doctordicas-text-medium text-lg max-w-2xl mx-auto">
          Encontre informações especializadas organizadas por área médica
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={category.path}
            className="group bg-white rounded-xl p-6 card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="mb-4">
              <div className="inline-flex p-3 rounded-xl bg-gray-50 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
            </div>
            
            <h3 className="font-semibold text-doctordicas-text-dark mb-2 text-lg">
              {category.title}
            </h3>
            
            <p className="text-sm text-doctordicas-text-medium mb-3 leading-relaxed">
              {category.description}
            </p>
            
            <div className="text-xs text-doctordicas-blue font-medium">
              {category.articleCount} artigos disponíveis
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentCategories;
