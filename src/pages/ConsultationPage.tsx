
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistantChat from '@/components/AIAssistantChat';
import { useToast } from "@/hooks/use-toast";

const ConsultationPage = () => {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('query');

  useEffect(() => {
    // Show welcome toast when page loads
    toast({
      title: "Assistente de Saúde",
      description: "Estou pronto para responder suas dúvidas de saúde",
      duration: 5000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-doctordicas-blue mb-3">
              Assistente de Saúde
            </h1>
            <p className="text-doctordicas-text-medium max-w-2xl mx-auto">
              Tire suas dúvidas sobre saúde com nosso assistente baseado em IA. 
              Combinamos informações confiáveis com recomendações personalizadas.
            </p>
          </div>
          
          <AIAssistantChat initialQuery={initialQuery} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultationPage;
