
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

const ConsultationCard = () => {
  const [onlineDoctors, setOnlineDoctors] = useState(72);
  const [waitTime, setWaitTime] = useState(8);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  
  // Simulate fluctuations in online doctors and wait times
  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation between -2 and +3
      const doctorChange = Math.floor(Math.random() * 6) - 2;
      // Ensure we don't go below 50 doctors
      setOnlineDoctors(prev => Math.max(50, prev + doctorChange));
      
      // Random fluctuation between -1 and +1 minutes
      const timeChange = Math.floor(Math.random() * 3) - 1;
      // Ensure we don't go below 5 or above 15 minutes
      setWaitTime(prev => Math.min(15, Math.max(5, prev + timeChange)));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleBooking = () => {
    setIsBooking(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsBooked(false);
      }, 3000);
    }, 1500);
  };

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
        <span className="font-medium">{onlineDoctors} médicos online agora</span>
      </div>
      
      <div className="flex items-center gap-2 mb-6 text-doctordicas-text-dark">
        <Clock size={18} className="text-doctordicas-text-medium" />
        <span className="font-medium">Tempo médio de espera: {waitTime} min</span>
      </div>
      
      <div className="space-y-3">
        <button 
          onClick={handleBooking}
          disabled={isBooking || isBooked}
          className={`w-full bg-doctordicas-green text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-doctordicas-green flex justify-center items-center gap-2 ${
            (isBooking || isBooked) ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isBooking ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>PROCESSANDO...</span>
            </>
          ) : isBooked ? (
            <>
              <CheckCircle size={18} />
              <span>AGENDADO COM SUCESSO!</span>
            </>
          ) : (
            'AGENDAR CONSULTA'
          )}
        </button>
        
        <button className="w-full bg-white text-doctordicas-text-dark border border-gray-200 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
          <Calendar size={18} className="text-doctordicas-blue" />
          <span>AGENDAR PARA DEPOIS</span>
        </button>
      </div>
    </div>
  );
};

export default ConsultationCard;
