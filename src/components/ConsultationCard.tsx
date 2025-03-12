
import React from 'react';
import { Clock } from 'lucide-react';

const ConsultationCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 card-shadow card-hover">
      <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-4">
        Consulte um especialista agora
      </h3>
      <p className="text-doctordicas-text-medium text-sm mb-5">
        Primeira consulta com preço especial
      </p>
      
      <div className="flex items-center gap-2 mb-3 text-doctordicas-text-dark">
        <div className="w-3 h-3 rounded-full bg-doctordicas-green animate-pulse"></div>
        <span className="font-medium">72 médicos online agora</span>
      </div>
      
      <div className="flex items-center gap-2 mb-6 text-doctordicas-text-dark">
        <Clock size={18} className="text-doctordicas-text-medium" />
        <span className="font-medium">Tempo médio de espera: 8 min</span>
      </div>
      
      <button className="w-full bg-doctordicas-green text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-doctordicas-green">
        AGENDAR CONSULTA
      </button>
    </div>
  );
};

export default ConsultationCard;
