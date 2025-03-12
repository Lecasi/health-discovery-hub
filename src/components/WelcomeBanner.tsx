
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface WelcomeBannerProps {
  onClose: () => void;
}

const WelcomeBanner = ({ onClose }: WelcomeBannerProps) => {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg">
      <div className="bg-white mx-4 rounded-xl shadow-lg border border-doctordicas-blue/20 overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-doctordicas-blue to-blue-500 px-4 py-2 flex justify-between items-center">
          <h3 className="text-white font-medium">Bem-vindo ao doctordicas</h3>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-doctordicas-text-medium mb-3">
            Respostas rápidas para suas dúvidas de saúde, de fontes confiáveis e verificadas por especialistas.
          </p>
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="bg-doctordicas-blue text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Começar a explorar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
