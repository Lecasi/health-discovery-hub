
import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ArticleNotFound = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-lg mx-auto">
        <div className="bg-red-100 text-red-700 p-3 rounded-full inline-flex mb-6">
          <SearchX size={32} />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-doctordicas-text-dark mb-4">
          Artigo não encontrado
        </h1>
        
        <p className="text-doctordicas-text-medium mb-8">
          Não foi possível encontrar o artigo que você está procurando. Ele pode ter sido removido ou o link está incorreto.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/artigos">Ver todos os artigos</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleNotFound;
