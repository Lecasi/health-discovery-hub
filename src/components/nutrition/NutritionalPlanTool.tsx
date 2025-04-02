
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import NutritionalForm from './NutritionalForm';
import NutritionalPlan from './NutritionalPlan';
import NutritionalTips from './NutritionalTips';

const NutritionalPlanTool = () => {
  const [activeTab, setActiveTab] = useState("perfil");
  const [userProfile, setUserProfile] = useState<UserNutritionalProfile | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<NutritionalPlanData | null>(null);
  const { toast } = useToast();

  const handleProfileSubmit = (profile: UserNutritionalProfile) => {
    setUserProfile(profile);
    
    // Simula uma chamada de API para gerar o plano com base no perfil
    setTimeout(() => {
      // Em um cenário real, aqui teríamos uma chamada para uma API que geraria o plano
      const plan = generateMockNutritionalPlan(profile);
      setGeneratedPlan(plan);
      setActiveTab("plano");
      
      toast({
        title: "Plano nutricional gerado!",
        description: "Seu plano alimentar personalizado foi criado com sucesso.",
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="perfil" className="data-[state=active]:bg-doctordicas-blue data-[state=active]:text-white">
            Perfil Nutricional
          </TabsTrigger>
          <TabsTrigger 
            value="plano" 
            disabled={!generatedPlan}
            className="data-[state=active]:bg-doctordicas-blue data-[state=active]:text-white"
          >
            Plano Alimentar
          </TabsTrigger>
          <TabsTrigger 
            value="dicas" 
            className="data-[state=active]:bg-doctordicas-blue data-[state=active]:text-white"
          >
            Dicas e Recomendações
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil" className="pt-6">
          <NutritionalForm onSubmit={handleProfileSubmit} />
        </TabsContent>
        
        <TabsContent value="plano" className="pt-6">
          {generatedPlan ? (
            <NutritionalPlan plan={generatedPlan} userProfile={userProfile!} />
          ) : (
            <div className="text-center py-12">
              <p className="text-doctordicas-text-medium">
                Complete seu perfil nutricional primeiro para gerar um plano personalizado.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="dicas" className="pt-6">
          <NutritionalTips userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Tipos para a ferramenta
export interface UserNutritionalProfile {
  age: number;
  gender: 'masculino' | 'feminino';
  weight: number;
  height: number;
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso';
  goal: 'perda_peso' | 'manutencao' | 'ganho_massa' | 'saude';
  restrictions: string[];
  preferences: string[];
  medicalConditions: string[];
}

export interface MealPlan {
  meal: string;
  time: string;
  foods: Array<{ name: string; portion: string; calories: number }>;
  totalCalories: number;
}

export interface NutritionalPlanData {
  dailyCalories: number;
  macros: {
    protein: number;  // em gramas
    carbs: number;    // em gramas
    fat: number;      // em gramas
  };
  meals: MealPlan[];
  weeklyPlan?: Record<string, MealPlan[]>;
  recommendations: string[];
}

// Função mock para gerar um plano nutricional
const generateMockNutritionalPlan = (profile: UserNutritionalProfile): NutritionalPlanData => {
  // Em um cenário real, esta função seria substituída por uma chamada de API
  // que realmente analisaria os dados do perfil e geraria um plano personalizado

  // Cálculo básico de calorias diárias baseado nas informações do perfil
  const bmr = profile.gender === 'masculino'
    ? 88.36 + (13.4 * profile.weight) + (4.8 * profile.height) - (5.7 * profile.age)
    : 447.6 + (9.2 * profile.weight) + (3.1 * profile.height) - (4.3 * profile.age);
  
  // Fatores de atividade
  const activityFactors: Record<string, number> = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725,
    muito_intenso: 1.9
  };
  
  // Fatores de objetivo
  const goalFactors: Record<string, number> = {
    perda_peso: 0.8,
    manutencao: 1.0,
    ganho_massa: 1.15,
    saude: 1.0
  };
  
  const dailyCalories = Math.round(bmr * activityFactors[profile.activityLevel] * goalFactors[profile.goal]);
  
  // Distribuição básica de macronutrientes
  const protein = Math.round((dailyCalories * 0.30) / 4); // 30% das calorias, 4 cals/g
  const fat = Math.round((dailyCalories * 0.25) / 9);    // 25% das calorias, 9 cals/g
  const carbs = Math.round((dailyCalories * 0.45) / 4);  // 45% das calorias, 4 cals/g

  // Refeições mockadas
  const meals: MealPlan[] = [
    {
      meal: "Café da Manhã",
      time: "7:00",
      foods: [
        { name: "Aveia em flocos", portion: "40g", calories: 150 },
        { name: "Leite desnatado", portion: "200ml", calories: 80 },
        { name: "Banana", portion: "1 unidade média", calories: 105 },
        { name: "Castanhas", portion: "15g", calories: 90 }
      ],
      totalCalories: 425
    },
    {
      meal: "Lanche da Manhã",
      time: "10:00",
      foods: [
        { name: "Iogurte natural", portion: "170g", calories: 100 },
        { name: "Morangos", portion: "100g", calories: 35 },
        { name: "Mel", portion: "10g", calories: 30 }
      ],
      totalCalories: 165
    },
    {
      meal: "Almoço",
      time: "13:00",
      foods: [
        { name: "Filé de frango grelhado", portion: "120g", calories: 180 },
        { name: "Arroz integral", portion: "100g", calories: 110 },
        { name: "Feijão", portion: "80g", calories: 90 },
        { name: "Legumes no vapor", portion: "100g", calories: 50 },
        { name: "Salada verde", portion: "à vontade", calories: 25 }
      ],
      totalCalories: 455
    },
    {
      meal: "Lanche da Tarde",
      time: "16:00",
      foods: [
        { name: "Torrada integral", portion: "2 fatias", calories: 70 },
        { name: "Abacate", portion: "1/4 unidade", calories: 80 },
        { name: "Tomate", portion: "1 unidade pequena", calories: 20 }
      ],
      totalCalories: 170
    },
    {
      meal: "Jantar",
      time: "19:30",
      foods: [
        { name: "Peixe assado", portion: "120g", calories: 140 },
        { name: "Batata doce", portion: "100g", calories: 90 },
        { name: "Brócolis", portion: "100g", calories: 35 },
        { name: "Azeite de oliva", portion: "5ml", calories: 45 }
      ],
      totalCalories: 310
    }
  ];

  // Recomendações personalizadas com base no perfil
  const recommendations = [
    "Mantenha-se hidratado bebendo pelo menos 2 litros de água por dia",
    "Priorize alimentos naturais e pouco processados",
    "Distribua sua alimentação em 5-6 refeições ao longo do dia"
  ];

  // Adiciona recomendações com base no objetivo
  if (profile.goal === 'perda_peso') {
    recommendations.push("Evite carboidratos simples à noite");
    recommendations.push("Consuma fibras em todas as refeições para aumentar a saciedade");
  } else if (profile.goal === 'ganho_massa') {
    recommendations.push("Consuma proteínas de alto valor biológico em todas as refeições");
    recommendations.push("Faça uma refeição rica em proteínas logo após o treino");
  }

  // Adiciona recomendações com base nas restrições médicas
  if (profile.medicalConditions.includes('diabetes')) {
    recommendations.push("Monitore sua glicemia regularmente");
    recommendations.push("Evite açúcares simples e prefira carboidratos complexos");
  }
  
  if (profile.medicalConditions.includes('hipertensao')) {
    recommendations.push("Reduza o consumo de sódio, evitando alimentos industrializados");
    recommendations.push("Aumente o consumo de potássio através de vegetais frescos e frutas");
  }

  return {
    dailyCalories,
    macros: {
      protein,
      carbs,
      fat
    },
    meals,
    recommendations
  };
};

export default NutritionalPlanTool;
