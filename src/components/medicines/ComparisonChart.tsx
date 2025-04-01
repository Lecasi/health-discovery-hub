
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComparisonChart = () => {
  // Dados mockados para demonstração
  const pharmacies = [
    { id: 1, name: 'Farmácia Popular', price: 25.90 },
    { id: 2, name: 'Drogasil', price: 28.50 },
    { id: 3, name: 'Pacheco', price: 23.75 },
    { id: 4, name: 'Raia', price: 26.99 },
    { id: 5, name: 'Pague Menos', price: 22.99 },
  ];
  
  const compareData = pharmacies.map(pharmacy => ({
    name: pharmacy.name,
    price: pharmacy.price
  }));
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={compareData}
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" unit=" R$" domain={[0, 'dataMax + 5']} />
        <YAxis type="category" dataKey="name" />
        <Tooltip 
          formatter={(value) => [`R$ ${value}`, 'Preço']}
        />
        <Bar 
          dataKey="price" 
          fill="#2563eb" 
          animationDuration={1500}
          label={{ 
            position: 'right', 
            formatter: (value) => `R$ ${value.toFixed(2)}` 
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;
