
import React from 'react';
import DiagnosticFlow from '@/components/DiagnosticFlow';

const DiagnosticSystem = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-doctordicas-text-dark mb-2">
            Sistema de Diagnóstico
          </h1>
          <p className="text-doctordicas-text-medium">
            Nossa inteligência artificial pode ajudar a identificar possíveis condições baseadas nos seus sintomas.
            <span className="block text-sm mt-1 text-doctordicas-text-light italic">
              Importante: Este sistema não substitui a consulta médica profissional.
            </span>
          </p>
        </div>
        
        <DiagnosticFlow />
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-doctordicas-blue mb-2">
            Como funciona nosso sistema de diagnóstico?
          </h3>
          <p className="text-sm text-doctordicas-text-medium mb-3">
            Nosso sistema usa inteligência artificial para analisar seus sintomas e compará-los com milhares de 
            casos clínicos documentados. Isso permite identificar possíveis condições médicas e orientar sobre 
            os próximos passos.
          </p>
          <p className="text-sm text-doctordicas-text-medium">
            A precisão do diagnóstico depende das informações fornecidas. Quanto mais detalhes sobre seus sintomas,
            melhor será o resultado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticSystem;
