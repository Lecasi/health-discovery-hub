
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExamInterpreter from '@/components/ExamInterpreter';

const ExamInterpreterPage = () => {
  return (
    <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-blue-50 to-white py-8 mb-4">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-doctordicas-blue mb-3">
                Interpretador Inteligente de Exames
              </h1>
              <p className="text-doctordicas-text-medium">
                Entenda seus resultados de exames com explicações claras e personalizadas geradas por nossa IA avançada.
              </p>
            </div>
          </div>
        </div>
        
        <ExamInterpreter />
      </main>
      <Footer />
    </div>
  );
};

export default ExamInterpreterPage;
