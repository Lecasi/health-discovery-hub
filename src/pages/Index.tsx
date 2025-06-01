import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AIAssistant from '@/components/AIAssistant';
import DiagnosticCard from '@/components/DiagnosticCard';
import ConsultationCard from '@/components/ConsultationCard';
import HealthTools from '@/components/HealthTools';
import FeaturedContent from '@/components/FeaturedContent';
import Community from '@/components/Community';
import StatisticsBanner from '@/components/StatisticsBanner';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WelcomeBanner from '@/components/WelcomeBanner';
import { useToast } from "@/hooks/use-toast";
import HealthNews from '@/components/HealthNews';
import NutritionSection from '@/components/NutritionSection';
import MentalHealthSection from '@/components/MentalHealthSection';
import TrendingTopics from '@/components/TrendingTopics';
import UserInsightCollector from '@/components/UserInsightCollector';
import HeroSection from '@/components/HeroSection';
import QuickAccessCards from '@/components/QuickAccessCards';
import MainDiagnosticSection from '@/components/MainDiagnosticSection';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('visited');
    if (visited) {
      setHasVisitedBefore(true);
      setShowWelcome(false);
    } else {
      // Auto-hide welcome banner after 10 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  useEffect(() => {
    // Mark as visited when banner is closed
    if (!showWelcome) {
      localStorage.setItem('visited', 'true');
    }
  }, [showWelcome]);
  
  useEffect(() => {
    // Mark the page as loaded
    setIsPageLoaded(true);
    
    // Show a welcome back toast for returning users
    if (hasVisitedBefore) {
      setTimeout(() => {
        toast({
          title: "Bem-vindo de volta!",
          description: "Estamos felizes em vê-lo novamente.",
          duration: 5000
        });
      }, 1000);
    }
  }, [hasVisitedBefore, toast]);
  
  return (
    <div className={`min-h-screen bg-doctordicas-bg-light transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      
      <UserInsightCollector />
      
      <main>
        <HeroSection />
        <QuickAccessCards />
        <MainDiagnosticSection />
        <TrendingTopics />
        <HealthNews />
        <NutritionSection />
        <MentalHealthSection />
        <FeaturedContent />
        <Community />
        <StatisticsBanner />
      </main>
      
      <Footer />
      <ScrollToTop />
      <AIAssistant />
    </div>
  );
};

export default Index;
