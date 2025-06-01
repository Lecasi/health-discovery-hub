
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-doctordicas-blue to-blue-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Portal de Informações
                <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  Saúde & Bem-estar
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Conteúdo médico confiável, artigos especializados e informações atualizadas 
                para cuidar da sua saúde com conhecimento.
              </p>
            </div>

            {/* Busca principal */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  O que você gostaria de saber sobre saúde?
                </h3>
                <SearchBar />
              </div>
            </div>

            {/* Ações secundárias */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/artigos">
                <Button size="lg" className="w-full sm:w-auto bg-white text-doctordicas-blue hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
                  <BookOpen className="mr-2" size={20} />
                  Explorar Artigos
                </Button>
              </Link>
              <Link to="/artigos?categoria=trending">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-doctordicas-blue font-semibold px-8 py-4 text-lg">
                  Temas em Alta
                </Button>
              </Link>
            </div>

            {/* Indicadores de credibilidade */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-200 pt-4">
              <div className="flex items-center gap-2">
                <Award size={16} />
                <span>Conteúdo revisado por médicos</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>+500 artigos especializados</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>+2M leitores mensais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
