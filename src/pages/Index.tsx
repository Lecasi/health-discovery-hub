
import React, { useEffect, useState } from 'react';
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
import ScrollToTop from '@/components/ScrollToTop';
import WelcomeBanner from '@/components/WelcomeBanner';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  
  useEffect(() => {
    // Auto-hide welcome banner after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      
      <main className="pt-4">
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
      <ScrollToTop />
    </div>
  );
};

export default Index;
