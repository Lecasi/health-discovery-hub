
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { 
  NutritionalPlanData, 
  UserNutritionalProfile 
} from './NutritionalPlanTool';
import { Utensils, Download, Printer } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  Tooltip,
} from 'recharts';

interface NutritionalPlanProps {
  plan: NutritionalPlanData;
  userProfile: UserNutritionalProfile;
}

const NutritionalPlan: React.FC<NutritionalPlanProps> = ({ plan, userProfile }) => {
  const [selectedDay, setSelectedDay] = useState('hoje');

  // Dados para o gráfico de macronutrientes
  const macrosData = [
    { name: 'Proteínas', value: plan.macros.protein, color: '#2563eb' },
    { name: 'Carboidratos', value: plan.macros.carbs, color: '#16A34A' },
    { name: 'Gorduras', value: plan.macros.fat, color: '#D97706' }
  ];

  // Função simulada para baixar o plano como PDF
  const handleDownload = () => {
    alert('Funcionalidade de download será implementada em breve!');
  };

  // Função simulada para imprimir o plano
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-doctordicas-blue" />
              Resumo do Plano
            </CardTitle>
            <CardDescription>Baseado no seu perfil e objetivos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-doctordicas-text-medium">Calorias Diárias</p>
                <p className="text-2xl font-bold text-doctordicas-blue">{plan.dailyCalories} kcal</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-doctordicas-text-medium">IMC</p>
                <p className="text-2xl font-bold text-doctordicas-green">
                  {(userProfile.weight / Math.pow(userProfile.height/100, 2)).toFixed(1)}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-sm text-doctordicas-text-medium">Refeições</p>
                <p className="text-2xl font-bold text-doctordicas-yellow">{plan.meals.length}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-3 text-doctordicas-text-dark">Recomendações Principais</h3>
            <ul className="space-y-2">
              {plan.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-doctordicas-blue rounded-full h-5 w-5 text-white text-xs font-bold mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-doctordicas-text-medium">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Macronutrientes</CardTitle>
            <CardDescription>Distribuição diária</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macrosData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {macrosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}g`, 'Quantidade']}
                    contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mt-2">
              <div>
                <p className="text-xs text-doctordicas-text-medium">Proteínas</p>
                <p className="font-bold text-doctordicas-blue">{plan.macros.protein}g</p>
              </div>
              <div>
                <p className="text-xs text-doctordicas-text-medium">Carboidratos</p>
                <p className="font-bold text-doctordicas-green">{plan.macros.carbs}g</p>
              </div>
              <div>
                <p className="text-xs text-doctordicas-text-medium">Gorduras</p>
                <p className="font-bold text-doctordicas-yellow">{plan.macros.fat}g</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Seu Plano Alimentar</CardTitle>
          <CardDescription>Refeições recomendadas para o dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plan.meals.map((meal, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-doctordicas-blue">{meal.meal}</h4>
                  <span className="text-sm text-doctordicas-text-medium">{meal.time}</span>
                </div>
                <table className="w-full">
                  <thead className="text-left text-sm text-doctordicas-text-medium">
                    <tr>
                      <th className="py-1.5 font-medium">Alimento</th>
                      <th className="py-1.5 font-medium text-right">Porção</th>
                      <th className="py-1.5 font-medium text-right">Calorias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meal.foods.map((food, foodIndex) => (
                      <tr key={foodIndex} className="border-t border-gray-100">
                        <td className="py-2">{food.name}</td>
                        <td className="py-2 text-right text-sm">{food.portion}</td>
                        <td className="py-2 text-right text-sm">{food.calories} kcal</td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-200 font-medium">
                      <td colSpan={2} className="py-2 text-right">Total:</td>
                      <td className="py-2 text-right text-doctordicas-blue">{meal.totalCalories} kcal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={handleDownload} variant="outline" className="flex gap-2">
          <Download size={16} />
          Baixar Plano (PDF)
        </Button>
        <Button onClick={handlePrint} variant="outline" className="flex gap-2">
          <Printer size={16} />
          Imprimir Plano
        </Button>
      </div>
    </div>
  );
};

export default NutritionalPlan;
