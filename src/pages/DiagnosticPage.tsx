
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosticSystem from '@/components/DiagnosticSystem';

const DiagnosticPage = () => {
  return (
    <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
      <Header />
      <main className="flex-1">
        <DiagnosticSystem />
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticPage;
