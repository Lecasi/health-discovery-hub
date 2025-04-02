
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComparisonChart = () => {
  // Dados mockados para demonstração
  const pharmacies = [
    { id: 1, name: 'Drogasil', price: 18.90 },
    { id: 2, name: 'FarmaSaúde', price: 19.90 },
    { id: 3, name: 'Ultrafarma', price: 21.50 },
    { id: 4, name: 'Drogaria SP', price: 24.75 },
    { id: 5, name: 'Pague Menos', price: 22.99 },
  ];
  
  const compareData = pharmacies.map(pharmacy => ({
    name: pharmacy.name,
    price: pharmacy.price
  })).sort((a, b) => a.price - b.price);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={compareData}
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          domain={[0, 'dataMax + 5']} 
          tickFormatter={(value) => `R$ ${value}`} 
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value) => [`R$ ${value}`, 'Preço']}
          contentStyle={{ 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '10px'
          }}
        />
        <Bar 
          dataKey="price" 
          fill="#3B82F6" 
          animationDuration={1500}
          label={{ 
            position: 'right', 
            formatter: (value) => `R$ ${value.toFixed(2)}`,
            fill: '#1E40AF',
            fontSize: 12,
            fontWeight: 500
          }}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;
