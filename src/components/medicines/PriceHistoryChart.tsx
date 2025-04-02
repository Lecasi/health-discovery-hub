
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceHistoryChart = () => {
  // Dados mockados para demonstração
  const priceHistory = [
    { date: '01/05', price: 28.99 },
    { date: '08/05', price: 27.50 },
    { date: '15/05', price: 25.99 },
    { date: '22/05', price: 24.99 },
    { date: '29/05', price: 23.50 },
    { date: '05/06', price: 19.90 },
    { date: '12/06', price: 18.90 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={priceHistory}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis 
          domain={['dataMin - 1', 'dataMax + 1']}
          tickFormatter={(value) => `R$ ${value}`} 
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-3 border rounded-lg shadow-sm">
                  <p className="font-medium">{`Data: ${payload[0].payload.date}`}</p>
                  <p className="text-blue-600 font-medium">{`Preço: R$ ${payload[0].value}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#3B82F6" 
          strokeWidth={2}
          activeDot={{ r: 8, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }} 
          dot={{ r: 4, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
          name="Preço (R$)" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceHistoryChart;
