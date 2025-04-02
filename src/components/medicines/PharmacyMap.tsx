
import React from 'react';
import { MapPin } from 'lucide-react';

const PharmacyMap = () => {
  return (
    <div className="relative">
      <div className="aspect-square bg-blue-50 rounded-lg p-2">
        <div className="w-full h-full bg-blue-100 rounded-lg relative overflow-hidden">
          {/* Mapa simulado */}
          <div className="w-full h-full relative">
            {/* Farmácia D */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-md">
                D
              </div>
            </div>
            
            {/* Farmácia F */}
            <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-md">
                F
              </div>
            </div>
            
            {/* Farmácia U */}
            <div className="absolute right-1/4 bottom-1/5 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-md">
                U
              </div>
            </div>
            
            {/* Usuário */}
            <div className="absolute top-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                <MapPin size={14} />
              </div>
            </div>
            
            {/* Linhas conectando */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <line 
                x1="50%" y1="50%" 
                x2="25%" y2="75%" 
                stroke="#6366F1" 
                strokeWidth="1" 
                strokeDasharray="5,5"
              />
              <line 
                x1="50%" y1="50%" 
                x2="75%" y2="80%" 
                stroke="#10B981" 
                strokeWidth="1" 
                strokeDasharray="5,5"
              />
              <line 
                x1="50%" y1="50%" 
                x2="67%" y2="25%" 
                stroke="#8B5CF6" 
                strokeWidth="1" 
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyMap;
