
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-doctordicas-blue to-blue-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Sua saúde em
                <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  boas mãos
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Diagnósticos inteligentes, consultas virtuais e orientações médicas 
                personalizadas com a tecnologia mais avançada.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/diagnostico">
                <Button size="lg" className="w-full sm:w-auto bg-white text-doctordicas-blue hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
                  <Search className="mr-2" size={20} />
                  Começar Diagnóstico
                </Button>
              </Link>
              <Link to="/consulta">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-doctordicas-blue font-semibold px-8 py-4 text-lg">
                  Consulta Virtual
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Disponível 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>+2M usuários</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="h-4 bg-white/30 rounded w-3/4"></div>
                  <div className="h-4 bg-white/20 rounded w-1/2"></div>
                  <div className="h-8 bg-white/40 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-6 bg-white/20 rounded"></div>
                    <div className="h-6 bg-white/20 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
