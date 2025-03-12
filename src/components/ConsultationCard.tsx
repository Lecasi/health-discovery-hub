
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle, Shield, Users, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ConsultationCard = () => {
  const [onlineDoctors, setOnlineDoctors] = useState(72);
  const [waitTime, setWaitTime] = useState(8);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [satisfaction, setSatisfaction] = useState(98);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
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
      
      toast({
        title: "Consulta agendada",
        description: "Sua consulta foi agendada com sucesso!",
        duration: 5000,
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsBooked(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div 
      className="bg-white rounded-2xl p-6 transition-all duration-300 card-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-doctordicas-text-dark">
          Consulte um especialista agora
        </h3>
        <div className="bg-green-50 rounded-full px-2 py-1 flex items-center text-doctordicas-green text-xs">
          <Star size={12} className="mr-1 text-yellow-500" fill="#eab308" />
          <span>{satisfaction}% satisfação</span>
        </div>
      </div>
      
      <p className="text-doctordicas-text-medium text-sm mb-5">
        Primeira consulta com preço especial
      </p>
      
      <div className="flex items-center gap-2 mb-3 text-doctordicas-text-dark">
        <div className="w-3 h-3 rounded-full bg-doctordicas-green animate-pulse"></div>
        <span className="font-medium">{onlineDoctors} médicos online agora</span>
        <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-doctordicas-blue rounded-full ml-1">
          +{Math.floor(onlineDoctors/10)} especialistas
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-3 text-doctordicas-text-dark">
        <Clock size={18} className="text-doctordicas-text-medium" />
        <span className="font-medium">Tempo médio de espera: {waitTime} min</span>
      </div>
      
      <div className="flex items-center text-xs text-doctordicas-text-medium mb-5">
        <Users size={14} className="mr-1" />
        <span>Mais de 50.000 consultas realizadas</span>
        <Shield size={14} className="ml-2 mr-1 text-doctordicas-blue" />
        <span>Médicos verificados</span>
      </div>
      
      <div className="space-y-3">
        <button 
          onClick={handleBooking}
          disabled={isBooking || isBooked}
          className={`w-full bg-doctordicas-green text-white py-3 rounded-lg font-medium transition-all duration-300 flex justify-center items-center gap-2 ${
            (isBooking || isBooked) ? 'opacity-70 cursor-not-allowed' : `hover:bg-green-600 ${isHovered ? 'shadow-md' : ''}`
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-doctordicas-green`}
        >
          {isBooking ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>PROCESSANDO...</span>
            </>
          ) : isBooked ? (
            <>
              <CheckCircle size={18} className="animate-bounce" />
              <span>AGENDADO COM SUCESSO!</span>
            </>
          ) : (
            <>
              <span className="relative">
                AGENDAR CONSULTA
                {isHovered && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-doctordicas-green text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in">
                    Primeira consulta R$49,90
                    <svg className="absolute top-full left-1/2 transform -translate-x-1/2" width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0L5 5L10 0H0Z" fill="#16A34A" />
                    </svg>
                  </span>
                )}
              </span>
            </>
          )}
        </button>
        
        <button className={`w-full bg-white text-doctordicas-text-dark border py-3 rounded-lg font-medium transition-all duration-300 flex justify-center items-center gap-2 ${
          isHovered ? 'border-doctordicas-blue text-doctordicas-blue' : 'border-gray-200 hover:bg-gray-50'
        }`}>
          <Calendar size={18} className={`transition-colors duration-300 ${isHovered ? 'text-doctordicas-blue' : 'text-doctordicas-blue'}`} />
          <span>AGENDAR PARA DEPOIS</span>
        </button>
      </div>
    </div>
  );
};

export default ConsultationCard;
