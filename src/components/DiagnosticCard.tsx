
import React, { useState } from 'react';

const DiagnosticCard = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const bodyParts = [
    'Cabeça', 'Peito', 'Abdômen', 'Costas',
    'Braços', 'Pernas', 'Geral'
  ];

  const handleDiagnose = () => {
    console.log('Diagnosing:', { selectedBodyPart, symptoms });
    // Implement diagnostic logic
  };

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow card-hover">
      <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-4">Precisa de um diagnóstico rápido?</h3>
      <p className="text-doctordicas-text-medium text-sm mb-5">
        Descreva seus sintomas e nossa IA conectará você com orientações personalizadas.
      </p>
      
      <div className="mb-4">
        <select
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg text-doctordicas-text-dark focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue"
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
          className="w-full p-3 border border-gray-200 rounded-lg text-doctordicas-text-dark focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20 focus:border-doctordicas-blue resize-none h-24"
        />
      </div>
      
      <button
        onClick={handleDiagnose}
        className="w-full bg-doctordicas-blue text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-doctordicas-blue"
      >
        Diagnosticar
      </button>
    </div>
  );
};

export default DiagnosticCard;
