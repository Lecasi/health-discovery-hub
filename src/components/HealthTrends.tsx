
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthTrends = () => {
  const [activeTab, setActiveTab] = useState('Estadual');
  
  const data = [
    { month: 'Jan', gripe: 400, dengue: 240 },
    { month: 'Fev', gripe: 300, dengue: 139 },
    { month: 'Mar', gripe: 200, dengue: 980 },
    { month: 'Abr', gripe: 278, dengue: 390 },
    { month: 'Mai', gripe: 189, dengue: 480 },
    { month: 'Jun', gripe: 239, dengue: 380 },
    { month: 'Jul', gripe: 349, dengue: 430 },
  ];

  const tabs = [
    { id: 'Estadual', label: 'Estadual' },
    { id: 'Regional', label: 'Regional' },
    { id: 'Faixa etária', label: 'Faixa etária' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <h2 className="section-title">Tendências de saúde</h2>
      
      <div className="bg-white rounded-2xl overflow-hidden card-shadow">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === tab.id
                  ? 'text-doctordicas-blue border-b-2 border-doctordicas-blue'
                  : 'text-doctordicas-text-medium hover:bg-gray-50'
              } transition-colors`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          <h3 className="text-sm font-medium text-doctordicas-text-medium mb-4">
            Tendências de saúde sazonais
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="gripe" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Gripe e resfriados"
                />
                <Line 
                  type="monotone" 
                  dataKey="dengue" 
                  stroke="#16A34A" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Dengue, zika e chikungunya"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-doctordicas-blue mr-2"></div>
              <span className="text-sm text-doctordicas-text-medium">Gripe e resfriados</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-doctordicas-green mr-2"></div>
              <span className="text-sm text-doctordicas-text-medium">Dengue e arboviroses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrends;
