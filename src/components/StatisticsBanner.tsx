
import React from 'react';

const StatisticsBanner = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="bg-doctordicas-blue text-white rounded-2xl p-8 md:p-12 text-center card-shadow">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ajudamos mais de 2 milhões de pessoas com suas dúvidas de saúde
        </h2>
        
        <p className="text-white/85 text-lg mb-8">
          Conte com nossos 900+ especialistas e conteúdo verificado por médicos
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
            <div className="text-3xl font-bold mb-2">2M+</div>
            <div className="text-white/80">Pessoas atendidas</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
            <div className="text-3xl font-bold mb-2">900+</div>
            <div className="text-white/80">Especialistas</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
            <div className="text-3xl font-bold mb-2">10k+</div>
            <div className="text-white/80">Artigos publicados</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBanner;
