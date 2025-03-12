
import React from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AIAssistant from '@/components/AIAssistant';
import DiagnosticCard from '@/components/DiagnosticCard';
import ConsultationCard from '@/components/ConsultationCard';
import HealthTools from '@/components/HealthTools';
import HealthTrends from '@/components/HealthTrends';
import FeaturedContent from '@/components/FeaturedContent';
import Community from '@/components/Community';
import StatisticsBanner from '@/components/StatisticsBanner';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      
      <main>
        <SearchBar />
        <AIAssistant />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <DiagnosticCard />
            <ConsultationCard />
          </div>
        </div>
        
        <HealthTools />
        <HealthTrends />
        <FeaturedContent />
        <Community />
        <StatisticsBanner />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
