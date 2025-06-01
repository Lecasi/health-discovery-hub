
import React from 'react';
import DiagnosticCard from '@/components/DiagnosticCard';
import ConsultationCard from '@/components/ConsultationCard';

const MainDiagnosticSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-doctordicas-text-dark mb-4">
            Cuidados Médicos Personalizados
          </h2>
          <p className="text-doctordicas-text-medium text-lg max-w-2xl mx-auto">
            Nossa IA analisa seus sintomas e conecta você com as melhores orientações médicas
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <DiagnosticCard />
          <ConsultationCard />
        </div>
      </div>
    </div>
  );
};

export default MainDiagnosticSection;
