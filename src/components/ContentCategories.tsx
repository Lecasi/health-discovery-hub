
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Utensils, Baby, Activity, Pill, Eye, Stethoscope } from 'lucide-react';

const ContentCategories = () => {
  const categories = [
    {
      id: 1,
      icon: <Heart className="text-white" size={32} />,
      title: 'Cardiologia',
      description: 'Saúde do coração e sistema cardiovascular',
      articleCount: 85,
      path: '/artigos?categoria=cardiologia',
      gradient: 'from-red-400 via-red-500 to-pink-500',
      bgPattern: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 2,
      icon: <Brain className="text-white" size={32} />,
      title: 'Neurologia',
      description: 'Sistema nervoso e saúde mental',
      articleCount: 72,
      path: '/artigos?categoria=neurologia',
      gradient: 'from-purple-400 via-purple-500 to-indigo-500',
      bgPattern: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 3,
      icon: <Utensils className="text-white" size={32} />,
      title: 'Nutrição',
      description: 'Alimentação saudável e dietas',
      articleCount: 96,
      path: '/artigos?categoria=nutricao',
      gradient: 'from-green-400 via-green-500 to-emerald-500',
      bgPattern: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 4,
      icon: <Baby className="text-white" size={32} />,
      title: 'Pediatria',
      description: 'Saúde infantil e desenvolvimento',
      articleCount: 64,
      path: '/artigos?categoria=pediatria',
      gradient: 'from-pink-400 via-pink-500 to-rose-500',
      bgPattern: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 5,
      icon: <Activity className="text-white" size={32} />,
      title: 'Atividade Física',
      description: 'Exercícios e vida ativa',
      articleCount: 58,
      path: '/artigos?categoria=exercicios',
      gradient: 'from-blue-400 via-blue-500 to-cyan-500',
      bgPattern: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 6,
      icon: <Pill className="text-white" size={32} />,
      title: 'Medicamentos',
      description: 'Informações sobre remédios',
      articleCount: 43,
      path: '/artigos?categoria=medicamentos',
      gradient: 'from-orange-400 via-orange-500 to-amber-500',
      bgPattern: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 7,
      icon: <Eye className="text-white" size={32} />,
      title: 'Oftalmologia',
      description: 'Saúde dos olhos e visão',
      articleCount: 31,
      path: '/artigos?categoria=oftalmologia',
      gradient: 'from-indigo-400 via-indigo-500 to-purple-500',
      bgPattern: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 8,
      icon: <Stethoscope className="text-white" size={32} />,
      title: 'Clínica Geral',
      description: 'Medicina preventiva e geral',
      articleCount: 89,
      path: '/artigos?categoria=clinica-geral',
      gradient: 'from-teal-400 via-teal-500 to-cyan-500',
      bgPattern: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&auto=format'
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
            className="group relative overflow-hidden rounded-2xl h-64 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${category.bgPattern})` }}
            />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-85 group-hover:opacity-90 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative h-full p-6 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    {category.articleCount} artigos
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-xl leading-tight">
                  {category.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentCategories;
