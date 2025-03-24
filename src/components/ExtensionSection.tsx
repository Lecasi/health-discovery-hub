
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrowserExtensionDemo from './extension-demo/BrowserExtensionDemo';

const ExtensionSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-doctordicas-blue mb-4">
            Conheça nossa nova Extensão para Navegador
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tome decisões mais saudáveis enquanto compra online com análises em tempo real de produtos alimentícios e medicamentos.
          </p>
        </div>
        
        <BrowserExtensionDemo />
        
        <div className="mt-12 text-center">
          <Link 
            to="/extensao"
            className="inline-flex items-center gap-2 text-doctordicas-blue font-medium hover:underline"
          >
            Saiba mais sobre a extensão 
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExtensionSection;
