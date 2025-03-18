
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosticSystem from '@/components/DiagnosticSystem';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

const DiagnosticPage = () => {
  return (
    <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-blue-50 to-white py-8 mb-4">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-doctordicas-blue mb-3">
                Diagnóstico de Saúde Assistido por IA
              </h1>
              <p className="text-doctordicas-text-medium">
                Obtenha orientações rápidas sobre seus sintomas e próximos passos para cuidar da sua saúde.
              </p>
            </div>
          </div>
        </div>
        
        <DiagnosticSystem />
        
        <div className="container mx-auto px-4 my-8 max-w-3xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start mb-3">
                <div className="bg-green-50 p-2 rounded-lg mr-3">
                  <ShieldCheck className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-doctordicas-text-dark mb-1">Privacidade Garantida</h3>
                  <p className="text-sm text-doctordicas-text-medium">
                    Seus dados são criptografados e protegidos. Não compartilhamos suas informações de saúde com terceiros.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start mb-3">
                <div className="bg-amber-50 p-2 rounded-lg mr-3">
                  <AlertTriangle className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-doctordicas-text-dark mb-1">Aviso Importante</h3>
                  <p className="text-sm text-doctordicas-text-medium">
                    Este sistema não substitui atendimento médico profissional. Em casos de emergência, procure ajuda médica imediatamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticPage;
