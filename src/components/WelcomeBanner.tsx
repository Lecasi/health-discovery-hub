
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface WelcomeBannerProps {
  onClose: () => void;
}

const WelcomeBanner = ({ onClose }: WelcomeBannerProps) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
      setProgress((step + 1) * 100 / totalSteps);
    } else {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="text-white font-medium flex items-center">
              Bem-vindo ao doctordicas
              <span className="ml-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">NOVO</span>
            </h3>
            <div className="p-4">
              <p className="text-doctordicas-text-medium mb-3">
                Respostas rápidas para suas dúvidas de saúde, de fontes confiáveis e verificadas por especialistas.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  {[...Array(totalSteps)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i + 1 === step ? 'bg-doctordicas-blue' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextStep}
                  className="bg-doctordicas-blue text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center group"
                >
                  Próximo
                  <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-white font-medium">Recursos exclusivos</h3>
            <div className="p-4">
              <p className="text-doctordicas-text-medium mb-3">
                Acesse ferramentas de diagnóstico, consultas online e conteúdo personalizado para cuidar da sua saúde.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  {[...Array(totalSteps)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i + 1 === step ? 'bg-doctordicas-blue' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextStep}
                  className="bg-doctordicas-blue text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center group"
                >
                  Próximo
                  <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-white font-medium">Comece agora</h3>
            <div className="p-4">
              <p className="text-doctordicas-text-medium mb-3">
                Está pronto para explorar? Navegue pelo site ou use nossa IA assistente para tirar suas dúvidas.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  {[...Array(totalSteps)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i + 1 === step ? 'bg-doctordicas-blue' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={onClose}
                  className="bg-doctordicas-green text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center"
                >
                  <CheckCircle size={14} className="mr-1" />
                  Começar a explorar
                </button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg">
      <div className="bg-white mx-4 rounded-xl shadow-lg border border-doctordicas-blue/20 overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-doctordicas-blue to-blue-500 px-4 py-2 flex justify-between items-center">
          {renderStepContent()}
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-doctordicas-blue transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
