
import React, { useState } from 'react';
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
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  const handleCloseWelcomeBanner = () => {
    setShowWelcomeBanner(false);
  };

  // Dummy articles data for NewsSection
  const recentArticles = [
    {
      id: 1,
      title: 'Como identificar sintomas de ansiedade',
      excerpt: 'Aprenda a reconhecer os sinais de ansiedade e quando buscar ajuda profissional.',
      image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=500&auto=format',
      category: 'Saúde Mental',
      categoryColor: 'blue' as const,
      publishedAt: '3 dias atrás',
      readTime: '5 min de leitura',
      author: 'Dr. Carlos Mendes',
      featured: true
    },
    {
      id: 2,
      title: 'Benefícios da vitamina D para imunidade',
      excerpt: 'Descubra como a vitamina do sol pode fortalecer seu sistema imunológico.',
      image: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=500&auto=format',
      category: 'Nutrição',
      categoryColor: 'green' as const,
      publishedAt: '5 dias atrás',
      readTime: '4 min de leitura',
      author: 'Dra. Ana Silva'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Doctor Dicas - Seu parceiro de saúde</title>
        <meta name="description" content="Artigos médicos, consultas virtuais e orientações confiáveis para sua saúde." />
      </Helmet>
      
      <Header />
      
      <main>
        {showWelcomeBanner && <WelcomeBanner onClose={handleCloseWelcomeBanner} />}
        <FeaturedContent />
        <TrendingTopics />
        <HealthTools />
        <NewsSection
          title="Artigos Recentes"
          description="Informações médicas baseadas em evidências"
          layout="featured"
          theme="light"
          items={recentArticles}
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
