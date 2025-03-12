
import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Search, ShieldCheck, RotateCcw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DiagnosticCard = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [diagnosesCount, setDiagnosesCount] = useState(12567);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const bodyParts = [
    'Cabeça', 'Peito', 'Abdômen', 'Costas',
    'Braços', 'Pernas', 'Geral'
  ];

  useEffect(() => {
    // Simulate increasing diagnoses count
    const interval = setInterval(() => {
      setDiagnosesCount(prev => prev + 1);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDiagnose = () => {
    if (!selectedBodyPart || !symptoms) {
      setFeedback({
        type: 'error',
        message: 'Por favor, preencha todos os campos'
      });
      return;
    }
    
    setIsSubmitting(true);
    setFeedback(null);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Diagnosing:', { selectedBodyPart, symptoms });
      setIsSubmitting(false);
      setFeedback({
        type: 'success',
        message: 'Diagnóstico iniciado! Estamos analisando seus sintomas.'
      });
      
      // Show toast notification
      toast({
        title: "Diagnóstico iniciado",
        description: "Nossa IA está analisando seus sintomas agora.",
        duration: 5000,
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
    }, 1500);
  };
  
  const resetForm = () => {
    setSelectedBodyPart('');
    setSymptoms('');
    setFeedback(null);
  };

  return (
    <div 
      className="bg-white rounded-2xl p-6 card-shadow transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-doctordicas-text-dark">
          Precisa de um diagnóstico rápido?
        </h3>
        <div className="bg-doctordicas-blue-light rounded-full p-1.5 text-doctordicas-blue text-xs font-medium">
          {diagnosesCount.toLocaleString()} diagnósticos
        </div>
      </div>
      
      <p className="text-doctordicas-text-medium text-sm mb-5">
        Descreva seus sintomas e nossa IA conectará você com orientações personalizadas.
      </p>
      
      <div className="mb-4 relative">
        <select
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
          className={`w-full p-3 border rounded-lg text-doctordicas-text-dark appearance-none bg-white transition-all duration-300 ${
            isHovered ? 'border-doctordicas-blue shadow-sm' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue`}
          style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
        >
          <option value="">Selecione a região do corpo</option>
          {bodyParts.map((part) => (
            <option key={part} value={part}>{part}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Descreva o que está sentindo"
          className={`w-full p-3 border rounded-lg text-doctordicas-text-dark resize-none h-24 transition-all duration-300 ${
            isHovered ? 'border-doctordicas-blue shadow-sm' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue`}
        />
      </div>
      
      <div className="flex items-center text-xs text-doctordicas-text-medium mb-4 gap-1">
        <ShieldCheck size={14} className="text-doctordicas-green" />
        <span>Seus dados são protegidos e analisados com segurança</span>
      </div>
      
      {feedback && (
        <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 text-sm animate-fade-in ${
          feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {feedback.type === 'success' ? 
            <CheckCircle size={18} className="text-green-500 mt-0.5" /> : 
            <AlertCircle size={18} className="text-red-500 mt-0.5" />
          }
          <span>{feedback.message}</span>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={handleDiagnose}
          disabled={isSubmitting}
          className={`flex-1 flex justify-center items-center gap-2 bg-doctordicas-blue text-white py-2.5 rounded-lg font-medium transition-all duration-300 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 hover:shadow-md'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-doctordicas-blue`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Processando...</span>
            </>
          ) : (
            <>
              <Search size={16} className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              <span>Diagnosticar</span>
            </>
          )}
        </button>
        
        {(selectedBodyPart || symptoms) && (
          <button
            onClick={resetForm}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-doctordicas-text-medium hover:bg-gray-50 transition-colors flex items-center"
          >
            <RotateCcw size={16} className="mr-1" />
            Limpar
          </button>
        )}
      </div>
    </div>
  );
};

export default DiagnosticCard;
