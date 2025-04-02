
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NutritionalPlanTool from '@/components/nutrition/NutritionalPlanTool';
import ScrollToTop from '@/components/ScrollToTop';

const NutritionalPlanPage = () => {
  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-doctordicas-text-dark mb-2">Plano Nutricional Personalizado</h1>
        <p className="text-doctordicas-text-medium mb-8">
          Crie um plano alimentar adequado às suas necessidades e objetivos de saúde
        </p>

        <NutritionalPlanTool />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NutritionalPlanPage;
