
import React from 'react';
import DiagnosticCard from '@/components/DiagnosticCard';
import ConsultationCard from '@/components/ConsultationCard';

const MainDiagnosticSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-doctordicas-text-dark mb-3">
            Orientação Médica Online
          </h2>
          <p className="text-doctordicas-text-medium max-w-xl mx-auto">
            Para situações que necessitam avaliação médica especializada
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <DiagnosticCard />
          <ConsultationCard />
        </div>
      </div>
    </div>
  );
};

export default MainDiagnosticSection;
