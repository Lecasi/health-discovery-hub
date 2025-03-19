
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExamInterpreter from '@/components/ExamInterpreter';
import { Microscope, FileText, Stethoscope } from 'lucide-react';

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
        
        <div className="container mx-auto px-4 max-w-3xl my-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                <div className="bg-blue-50 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-doctordicas-blue" />
                </div>
                <h3 className="font-semibold text-doctordicas-text-dark">Suporte para múltiplos exames</h3>
              </div>
              <p className="text-sm text-doctordicas-text-medium">
                Analise resultados de hemogramas, triglicerídeos, hormônios, função hepática, renal e muito mais.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                <div className="bg-blue-50 p-2 rounded-full mr-3">
                  <Microscope className="h-5 w-5 text-doctordicas-blue" />
                </div>
                <h3 className="font-semibold text-doctordicas-text-dark">Análise detalhada</h3>
              </div>
              <p className="text-sm text-doctordicas-text-medium">
                Receba explicações simples sobre cada parâmetro e o que os valores significam para sua saúde.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                <div className="bg-blue-50 p-2 rounded-full mr-3">
                  <Stethoscope className="h-5 w-5 text-doctordicas-blue" />
                </div>
                <h3 className="font-semibold text-doctordicas-text-dark">Recomendações personalizadas</h3>
              </div>
              <p className="text-sm text-doctordicas-text-medium">
                Obtenha sugestões práticas baseadas nos seus resultados e em evidências científicas.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExamInterpreterPage;
