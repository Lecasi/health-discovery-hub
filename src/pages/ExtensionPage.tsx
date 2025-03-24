
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrowserExtensionDemo from '@/components/extension-demo/BrowserExtensionDemo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bell, ShieldCheck, BarChart4, CreditCard } from 'lucide-react';

const ExtensionPage = () => {
  return (
    <>
      <Helmet>
        <title>Extensão para Navegador | doctordicas</title>
        <meta name="description" content="Conheça a extensão doctordicas para navegador que analisa produtos em tempo real" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-blue-100 text-doctordicas-blue rounded-full px-3 py-1 text-sm font-medium mb-4">
              Em breve
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-doctordicas-text-dark mb-6">
              Análise doctordicas<br />para seu navegador
            </h1>
            <p className="text-xl text-doctordicas-text-medium max-w-3xl mx-auto mb-8">
              Faça escolhas mais saudáveis enquanto navega em sites de compras com nossa extensão que analisa produtos em tempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Entrar na lista de espera <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Ver demonstração
              </Button>
            </div>
          </div>
        </section>
        
        {/* Demo Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Veja como funciona</h2>
            <BrowserExtensionDemo />
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefícios da extensão</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <ShieldCheck className="h-6 w-6 text-doctordicas-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Decisões mais saudáveis</h3>
                <p className="text-gray-600">
                  Tome decisões baseadas em evidências científicas ao comprar alimentos e medicamentos online.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <CreditCard className="h-6 w-6 text-doctordicas-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Economia inteligente</h3>
                <p className="text-gray-600">
                  Compare alternativas mais econômicas e saudáveis para otimizar suas compras.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Bell className="h-6 w-6 text-doctordicas-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Alertas personalizados</h3>
                <p className="text-gray-600">
                  Configure alertas para ingredientes específicos baseados no seu perfil de saúde.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <BarChart4 className="h-6 w-6 text-doctordicas-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Histórico e relatórios</h3>
                <p className="text-gray-600">
                  Acompanhe suas escolhas de compras ao longo do tempo e veja o impacto na sua saúde.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas frequentes</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">Quando a extensão estará disponível?</h3>
                <p className="text-gray-600">
                  A extensão está em fase final de desenvolvimento, com lançamento previsto para o próximo trimestre. 
                  Inscreva-se na lista de espera para ser notificado quando estiver disponível.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">Em quais navegadores a extensão funcionará?</h3>
                <p className="text-gray-600">
                  A primeira versão será para Google Chrome, seguida por versões para Firefox e Microsoft Edge.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">A extensão é gratuita?</h3>
                <p className="text-gray-600">
                  Sim, a versão básica será gratuita. Haverá também uma versão premium com recursos avançados como relatórios detalhados e alertas personalizados.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">Como funciona a análise dos produtos?</h3>
                <p className="text-gray-600">
                  A extensão utiliza nossa base de dados proprietária com mais de 100.000 produtos, analisados por nossa equipe de nutricionistas e farmacêuticos. Para produtos não catalogados, utilizamos IA para análise em tempo real.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-doctordicas-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para tomar decisões mais saudáveis?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre para a lista de espera e seja um dos primeiros a experimentar nossa extensão para navegador.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex h-12 w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white shadow-sm transition-colors placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              />
              <Button size="lg" className="bg-white text-doctordicas-blue hover:bg-white/90">
                Inscrever-se
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ExtensionPage;
