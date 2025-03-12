
import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const DiagnosticCard = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const bodyParts = [
    'Cabeça', 'Peito', 'Abdômen', 'Costas',
    'Braços', 'Pernas', 'Geral'
  ];

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
    <div className="bg-white rounded-2xl p-6 card-shadow card-hover">
      <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-4">Precisa de um diagnóstico rápido?</h3>
      <p className="text-doctordicas-text-medium text-sm mb-5">
        Descreva seus sintomas e nossa IA conectará você com orientações personalizadas.
      </p>
      
      <div className="mb-4 relative">
        <select
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg text-doctordicas-text-dark focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue appearance-none bg-white transition-shadow"
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
          className="w-full p-3 border border-gray-200 rounded-lg text-doctordicas-text-dark focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue resize-none h-24 transition-shadow"
        />
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
          className={`flex-1 bg-doctordicas-blue text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-doctordicas-blue ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processando...' : 'Diagnosticar'}
        </button>
        
        {(selectedBodyPart || symptoms) && (
          <button
            onClick={resetForm}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-doctordicas-text-medium hover:bg-gray-50 transition-colors"
          >
            Limpar
          </button>
        )}
      </div>
    </div>
  );
};

export default DiagnosticCard;
