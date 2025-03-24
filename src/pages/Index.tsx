
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WelcomeBanner from '@/components/WelcomeBanner';
import FeaturedContent from '@/components/FeaturedContent';
import TrendingTopics from '@/components/TrendingTopics';
import HealthTools from '@/components/HealthTools';
import NewsSection from '@/components/NewsSection';
import StatisticsBanner from '@/components/StatisticsBanner';
import HealthNews from '@/components/HealthNews';
import NutritionSection from '@/components/NutritionSection';
import MentalHealthSection from '@/components/MentalHealthSection';
import HealthTrends from '@/components/HealthTrends';
import Community from '@/components/Community';
import ExtensionSection from '@/components/ExtensionSection';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Doctor Dicas - Seu parceiro de saúde</title>
        <meta name="description" content="Artigos médicos, consultas virtuais e orientações confiáveis para sua saúde." />
      </Helmet>
      
      <Header />
      
      <main>
        <WelcomeBanner />
        <FeaturedContent />
        <TrendingTopics />
        <HealthTools />
        <NewsSection
          title="Artigos Recentes"
          description="Informações médicas baseadas em evidências"
          layout="featured"
          theme="light"
        />
        <ExtensionSection />
        <StatisticsBanner />
        <HealthNews />
        <NutritionSection />
        <MentalHealthSection />
        <HealthTrends />
        <Community />
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Index;
