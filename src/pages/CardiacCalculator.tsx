
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Clock, Lock, ChevronLeft, ChevronRight, Star, Check, HelpCircle, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Types
type Step = 'onboarding' | 'basic' | 'lifestyle' | 'clinical' | 'results';
type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'moderate' | 'intense';
type AlcoholConsumption = 'none' | 'moderate' | 'high';
type RiskFactor = {
  id: number;
  name: string;
  impact: string;
  value: number;
};
type RecommendedAction = {
  id: number;
  title: string;
  description?: string;
};

const CardiacCalculator = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('onboarding');
  const [progress, setProgress] = useState(0);
  
  // Basic information
  const [age, setAge] = useState(40);
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(1.7);
  const [familyHistory, setFamilyHistory] = useState(false);
  
  // Lifestyle
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [smoking, setSmoking] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [alcoholConsumption, setAlcoholConsumption] = useState<AlcoholConsumption>('moderate');
  
  // Clinical
  const [systolicPressure, setSystolicPressure] = useState<number | null>(null);
  const [cholesterolTotal, setCholesterolTotal] = useState<number | null>(null);
  const [cholesterolHDL, setCholesterolHDL] = useState<number | null>(null);
  
  // Results
  const [bmi, setBmi] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');
  const [reliabilityLevel, setReliabilityLevel] = useState('Básico');
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedAction[]>([]);

  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    const calculatedBmi = weight / (height * height);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));
  }, [weight, height]);

  // Update progress based on current step
  useEffect(() => {
    switch (currentStep) {
      case 'onboarding':
        setProgress(0);
        break;
      case 'basic':
        setProgress(25);
        break;
      case 'lifestyle':
        setProgress(50);
        break;
      case 'clinical':
        setProgress(75);
        break;
      case 'results':
        setProgress(100);
        calculateRiskScore();
        break;
      default:
        setProgress(0);
    }
  }, [currentStep]);

  // Calculate risk score
  const calculateRiskScore = () => {
    // Simple risk calculation algorithm based on provided data
    let score = 0;
    
    // Age factor
    if (age > 60) score += 4;
    else if (age > 50) score += 3;
    else if (age > 40) score += 2;
    else if (age > 30) score += 1;
    
    // Gender factor
    if (gender === 'male') score += 1;
    
    // BMI factor
    if (bmi > 30) score += 3;
    else if (bmi > 25) score += 2;
    else if (bmi < 18.5) score += 1;
    
    // Family history
    if (familyHistory) score += 4;
    
    // Lifestyle factors
    if (activityLevel === 'sedentary') score += 2;
    if (smoking) score += 3;
    if (diabetes) score += 4;
    if (alcoholConsumption === 'high') score += 2;
    
    // Clinical factors if available
    if (systolicPressure !== null) {
      if (systolicPressure > 160) score += 4;
      else if (systolicPressure > 140) score += 3;
      setReliabilityLevel('Intermediário');
    }
    
    if (cholesterolTotal !== null && cholesterolHDL !== null) {
      if (cholesterolTotal > 240) score += 3;
      else if (cholesterolTotal > 200) score += 2;
      
      if (cholesterolHDL < 40) score += 2;
      setReliabilityLevel('Avançado');
    }
    
    // Convert score to percentage risk (simple mapping for demonstration)
    const riskPercentage = Math.min(Math.round((score / 25) * 100) / 4, 35);
    setRiskScore(riskPercentage);
    
    // Set risk level
    if (riskPercentage < 5) {
      setRiskLevel('Baixo');
    } else if (riskPercentage < 10) {
      setRiskLevel('Moderado');
    } else if (riskPercentage < 20) {
      setRiskLevel('Moderado-Alto');
    } else {
      setRiskLevel('Alto');
    }
    
    // Set risk factors
    const factors: RiskFactor[] = [];
    
    if (familyHistory) {
      factors.push({
        id: 1,
        name: 'Histórico familiar',
        impact: 'Aumenta seu risco em +40%',
        value: 40
      });
    }
    
    factors.push({
      id: 2,
      name: 'Idade e sexo',
      impact: 'Fatores não modificáveis',
      value: 25
    });
    
    if (!smoking) {
      factors.push({
        id: 3,
        name: 'Pontos positivos',
        impact: 'Não fumar reduz seu risco em -30%',
        value: -30
      });
    }
    
    setRiskFactors(factors);
    
    // Set recommendations
    const actions: RecommendedAction[] = [];
    
    actions.push({
      id: 1,
      title: 'Agende uma consulta médica'
    });
    
    if (cholesterolTotal === null) {
      actions.push({
        id: 2,
        title: 'Faça exames de colesterol completo'
      });
    }
    
    if (bmi > 25) {
      actions.push({
        id: 3,
        title: 'Modifique sua dieta para controle de peso'
      });
    }
    
    setRecommendations(actions);
  };

  // Handle step navigation
  const goToNextStep = () => {
    switch(currentStep) {
      case 'onboarding':
        setCurrentStep('basic');
        break;
      case 'basic':
        setCurrentStep('lifestyle');
        break;
      case 'lifestyle':
        setCurrentStep('clinical');
        break;
      case 'clinical':
        setCurrentStep('results');
        toast({
          title: "Avaliação concluída!",
          description: "Seus resultados foram calculados com sucesso."
        });
        break;
    }
  };

  const goToPreviousStep = () => {
    switch(currentStep) {
      case 'basic':
        setCurrentStep('onboarding');
        break;
      case 'lifestyle':
        setCurrentStep('basic');
        break;
      case 'clinical':
        setCurrentStep('lifestyle');
        break;
      case 'results':
        setCurrentStep('clinical');
        break;
    }
  };

  const skipClinicalStep = () => {
    setCurrentStep('results');
    toast({
      title: "Etapa opcional ignorada",
      description: "Seus resultados serão calculados com as informações disponíveis."
    });
  };

  // BMI classification
  const getBmiClassification = () => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  // Age controls
  const increaseAge = () => setAge(prev => Math.min(prev + 1, 99));
  const decreaseAge = () => setAge(prev => Math.max(prev - 1, 18));
  
  // Weight controls
  const increaseWeight = () => setWeight(prev => Math.min(prev + 1, 200));
  const decreaseWeight = () => setWeight(prev => Math.max(prev - 1, 40));
  
  // Height controls
  const increaseHeight = () => setHeight(prev => Math.min(prev + 0.01, 2.2));
  const decreaseHeight = () => setHeight(prev => Math.max(prev - 0.01, 1.4));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-blue-50/50 pt-8 pb-16">
        {currentStep === 'onboarding' && (
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-3xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-doctordicas-text-dark mb-2">Calculadora Cardíaca</h1>
                  <p className="text-lg text-doctordicas-text-medium">Conheça seu risco cardiovascular em apenas 2 minutos</p>
                  
                  <div className="flex justify-center my-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                      ))}
                      <span className="ml-2 text-doctordicas-text-dark font-medium">4.9/5</span>
                      <span className="ml-1 text-doctordicas-text-medium">(2.543 avaliações)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mb-12">
                  <img 
                    src="/lovable-uploads/a7cb2062-525f-4766-a2a5-c03f190450a1.png" 
                    alt="Heart ECG Animation" 
                    className="w-64 h-auto animate-pulse" 
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <h2 className="md:col-span-2 text-xl font-semibold text-center mb-4">Avaliação personalizada baseada em ciência</h2>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Funciona mesmo sem dados de exame</p>
                      <p className="text-sm text-doctordicas-text-medium">Resultados com informações básicas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Recomendações personalizadas</p>
                      <p className="text-sm text-doctordicas-text-medium">Baseadas no seu perfil único</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Resultados progressivamente mais precisos</p>
                      <p className="text-sm text-doctordicas-text-medium">Quanto mais dados, melhor a análise</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Visualize impacto de mudanças</p>
                      <p className="text-sm text-doctordicas-text-medium">Simule alterações no seu estilo de vida</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mb-6">
                  <Button
                    onClick={goToNextStep}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-6 px-8 rounded-full text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Começar minha avaliação
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex justify-center items-center text-sm text-doctordicas-text-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Leva apenas 2 minutos</span>
                  <span className="mx-3">•</span>
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Seus dados são protegidos</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep !== 'onboarding' && (
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              
              <div className="flex justify-between items-center mt-8 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-doctordicas-text-dark">
                    {currentStep === 'basic' && 'Seus dados básicos'}
                    {currentStep === 'lifestyle' && 'Seu estilo de vida'}
                    {currentStep === 'clinical' && 'Seus dados clínicos'}
                    {currentStep === 'results' && 'Seus resultados'}
                  </h1>
                  <p className="text-doctordicas-text-medium">
                    {currentStep === 'basic' && 'Passo 1 de 4 - Informações pessoais para cálculo inicial'}
                    {currentStep === 'lifestyle' && 'Passo 2 de 4 - Hábitos e comportamentos diários'}
                    {currentStep === 'clinical' && 'Passo 3 de 4 - Valores de exames (opcional)'}
                    {currentStep === 'results' && 'Passo 4 de 4 - Avaliação de risco e próximos passos'}
                  </p>
                </div>

                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        (step === 1 && currentStep === 'basic') ||
                        (step === 2 && currentStep === 'lifestyle') ||
                        (step === 3 && currentStep === 'clinical') ||
                        (step === 4 && currentStep === 'results')
                          ? 'bg-blue-500 text-white' 
                          : ((step === 1 && ['lifestyle', 'clinical', 'results'].includes(currentStep)) ||
                             (step === 2 && ['clinical', 'results'].includes(currentStep)) ||
                             (step === 3 && currentStep === 'results'))
                            ? 'bg-blue-100 text-blue-500' 
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {((step === 1 && ['lifestyle', 'clinical', 'results'].includes(currentStep)) ||
                        (step === 2 && ['clinical', 'results'].includes(currentStep)) ||
                        (step === 3 && currentStep === 'results')) 
                        ? <Check className="w-4 h-4" /> 
                        : step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-3xl">
              <CardContent className="p-8">
                {currentStep === 'basic' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-6">Informações básicas</h2>
                      
                      <div className="mb-6">
                        <label htmlFor="age" className="block mb-2 font-medium">Idade</label>
                        <div className="flex items-center">
                          <button 
                            onClick={decreaseAge} 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-l-lg"
                          >
                            -
                          </button>
                          <div className="relative w-full">
                            <Input
                              id="age"
                              type="number"
                              value={age}
                              onChange={(e) => setAge(Number(e.target.value))}
                              className="text-center border-x-0 rounded-none"
                              min={18}
                              max={99}
                            />
                          </div>
                          <button 
                            onClick={increaseAge} 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-r-lg"
                          >
                            +
                          </button>
                          <span className="ml-2 text-gray-500">anos</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block mb-2 font-medium">Sexo biológico</label>
                        <div className="flex p-1 bg-blue-50 rounded-full">
                          <button
                            className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
                              gender === 'female' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setGender('female')}
                          >
                            Feminino
                          </button>
                          <button
                            className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
                              gender === 'male' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setGender('male')}
                          >
                            Masculino
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="weight" className="block mb-2 font-medium">Seu peso</label>
                        <div className="flex items-center">
                          <button 
                            onClick={decreaseWeight} 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-l-lg"
                          >
                            -
                          </button>
                          <div className="relative w-full">
                            <Input
                              id="weight"
                              type="number"
                              value={weight}
                              onChange={(e) => setWeight(Number(e.target.value))}
                              className="text-center border-x-0 rounded-none"
                              min={40}
                              max={200}
                            />
                          </div>
                          <button 
                            onClick={increaseWeight} 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-r-lg"
                          >
                            +
                          </button>
                          <span className="ml-2 text-gray-500">kg</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="height" className="block mb-2 font-medium">Sua altura</label>
                        <div className="flex items-center">
                          <button 
                            onClick={decreaseHeight} 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-l-lg"
                          >
                            -
                          </button>
                          <div className="relative w-full">
                            <Input
                              id="height"
                              type="number"
                              value={height.toFixed(2)}
                              onChange={(e) => setHeight(Number(e.target.value))}
                              className="text-center border-x-0 rounded-none"
                              min={1.4}
                              max={2.2}
                              step={0.01}
                            />
                          </div>
                          <button 
                            onClick={increaseHeight} 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-r-lg"
                          >
                            +
                          </button>
                          <span className="ml-2 text-gray-500">m</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-6">Resultados em tempo real</h2>
                      
                      <div className="bg-blue-50 p-6 rounded-xl mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium text-lg">Seu IMC (Índice de Massa Corporal)</h3>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <HelpCircle className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        <div className="relative mb-4">
                          <div className="h-2 bg-gray-200 rounded-full mb-2">
                            <div className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-red-500 w-full"></div>
                            <div 
                              className="absolute top-0 h-4 w-4 rounded-full bg-white border-2 border-blue-500 transform -translate-y-1/4"
                              style={{ left: `${Math.min(Math.max((bmi - 16) / 24 * 100, 0), 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Abaixo</span>
                            <span>Normal</span>
                            <span>Acima</span>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <span className="text-5xl font-bold text-blue-500">{bmi.toFixed(1)}</span>
                          <p className="text-gray-600 mt-1">{getBmiClassification()}</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="font-medium text-lg mb-4">Histórico familiar de doenças cardíacas</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div 
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              familyHistory 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 bg-white hover:border-blue-200'
                            }`}
                            onClick={() => setFamilyHistory(true)}
                          >
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                familyHistory ? 'bg-blue-500' : 'border border-gray-300'
                              }`}>
                                {familyHistory && <Check className="text-white h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-medium">Sim</p>
                                <p className="text-xs text-gray-500">Pais, irmãos ou avós</p>
                              </div>
                            </div>
                          </div>
                          
                          <div 
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              !familyHistory 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 bg-white hover:border-blue-200'
                            }`}
                            onClick={() => setFamilyHistory(false)}
                          >
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                !familyHistory ? 'bg-blue-500' : 'border border-gray-300'
                              }`}>
                                {!familyHistory && <Check className="text-white h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-medium">Não</p>
                                <p className="text-xs text-gray-500">Sem histórico</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="flex items-center text-blue-600">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
                          </svg>
                          <p className="text-sm font-medium">50% das informações preenchidas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 'lifestyle' && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-6">Frequência de atividade física</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            activityLevel === 'sedentary' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 bg-white hover:border-blue-200'
                          }`}
                          onClick={() => setActivityLevel('sedentary')}
                        >
                          <div className="flex justify-center mb-4">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M24 12V36" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 24H36" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <h3 className="text-center font-medium mb-1">Sedentário</h3>
                          <p className="text-center text-sm text-gray-500 mb-4">Pouca ou nenhuma atividade física</p>
                          
                          <div className="flex items-center justify-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              activityLevel === 'sedentary' ? 'bg-blue-500 border-blue-500' : 'border border-gray-300'
                            }`}>
                              {activityLevel === 'sedentary' && <Check className="text-white h-4 w-4" />}
                            </div>
                            <p className="ml-2 text-sm text-rose-600">Aumenta seu risco em +35%</p>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            activityLevel === 'moderate' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 bg-white hover:border-blue-200'
                          }`}
                          onClick={() => setActivityLevel('moderate')}
                        >
                          <div className="flex justify-center mb-4">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 34L28 34" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 26L32 26" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 18L36 18" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <h3 className="text-center font-medium mb-1">Moderado</h3>
                          <p className="text-center text-sm text-gray-500 mb-4">1-3 vezes por semana</p>
                          
                          <div className="flex items-center justify-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              activityLevel === 'moderate' ? 'bg-blue-500 border-blue-500' : 'border border-gray-300'
                            }`}>
                              {activityLevel === 'moderate' && <Check className="text-white h-4 w-4" />}
                            </div>
                            <p className="ml-2 text-sm text-green-600">Reduz seu risco em -15%</p>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            activityLevel === 'intense' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 bg-white hover:border-blue-200'
                          }`}
                          onClick={() => setActivityLevel('intense')}
                        >
                          <div className="flex justify-center mb-4">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 36L36 12" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M24 36V12" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M36 36L12 12" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <h3 className="text-center font-medium mb-1">Intenso</h3>
                          <p className="text-center text-sm text-gray-500 mb-4">4+ vezes por semana</p>
                          
                          <div className="flex items-center justify-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              activityLevel === 'intense' ? 'bg-blue-500 border-blue-500' : 'border border-gray-300'
                            }`}>
                              {activityLevel === 'intense' && <Check className="text-white h-4 w-4" />}
                            </div>
                            <p className="ml-2 text-sm text-green-600">Reduz seu risco em -30%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h2 className="text-xl font-semibold mb-6">Você fuma?</h2>
                        <div className="flex p-1 bg-blue-50 rounded-full">
                          <button
                            className={`flex-1 py-3 px-6 rounded-full text-center transition-colors ${
                              smoking 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setSmoking(true)}
                          >
                            Sim
                          </button>
                          <button
                            className={`flex-1 py-3 px-6 rounded-full text-center transition-colors ${
                              !smoking 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setSmoking(false)}
                          >
                            Não
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold mb-6">Consumo de álcool</h2>
                        <div className="flex p-1 bg-blue-50 rounded-full">
                          <button
                            className={`flex-1 py-3 px-2 rounded-full text-center transition-colors ${
                              alcoholConsumption === 'none' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setAlcoholConsumption('none')}
                          >
                            Nenhum
                          </button>
                          <button
                            className={`flex-1 py-3 px-2 rounded-full text-center transition-colors ${
                              alcoholConsumption === 'moderate' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setAlcoholConsumption('moderate')}
                          >
                            Moderado
                          </button>
                          <button
                            className={`flex-1 py-3 px-2 rounded-full text-center transition-colors ${
                              alcoholConsumption === 'high' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setAlcoholConsumption('high')}
                          >
                            Alto
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold mb-6">Você tem diabetes?</h2>
                        <div className="flex p-1 bg-blue-50 rounded-full">
                          <button
                            className={`flex-1 py-3 px-6 rounded-full text-center transition-colors ${
                              diabetes 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setDiabetes(true)}
                          >
                            Sim
                          </button>
                          <button
                            className={`flex-1 py-3 px-6 rounded-full text-center transition-colors ${
                              !diabetes 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-transparent text-gray-600'
                            }`}
                            onClick={() => setDiabetes(false)}
                          >
                            Não
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center text-green-600 mb-2">
                          <Check className="h-6 w-6 mr-2" />
                          <h3 className="font-semibold text-lg">Excelente progresso!</h3>
                        </div>
                        <p className="text-green-700">
                          Suas respostas ajudam a criar um perfil de risco mais preciso
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'clinical' && (
                  <div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                      <div className="flex items-center mb-2">
                        <Info className="text-blue-500 h-6 w-6 mr-2" />
                        <h3 className="font-semibold text-lg text-doctordicas-text-dark">Etapa opcional</h3>
                      </div>
                      <p className="text-doctordicas-text-medium">
                        Forneça dados de seus exames para um resultado mais preciso. 
                        Se não tiver esses dados, você pode pular esta etapa.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <label htmlFor="systolic" className="font-medium">Pressão arterial (sistólica)</label>
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              Não sei
                            </Button>
                          </div>
                          
                          <div className="relative">
                            <Input
                              id="systolic"
                              type="number"
                              placeholder="Ex: 120"
                              value={systolicPressure !== null ? systolicPressure : ''}
                              onChange={(e) => e.target.value ? setSystolicPressure(Number(e.target.value)) : setSystolicPressure(null)}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              mmHg
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            O número mais alto da sua medição de pressão
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <label htmlFor="cholesterol" className="font-medium">Colesterol total</label>
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              Não sei
                            </Button>
                          </div>
                          
                          <div className="relative">
                            <Input
                              id="cholesterol"
                              type="number"
                              placeholder="Ex: 180"
                              value={cholesterolTotal !== null ? cholesterolTotal : ''}
                              onChange={(e) => e.target.value ? setCholesterolTotal(Number(e.target.value)) : setCholesterolTotal(null)}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              mg/dL
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Nível de colesterol total no sangue
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <label htmlFor="hdl" className="font-medium">Colesterol HDL (bom)</label>
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              Não sei
                            </Button>
                          </div>
                          
                          <div className="relative">
                            <Input
                              id="hdl"
                              type="number"
                              placeholder="Ex: 50"
                              value={cholesterolHDL !== null ? cholesterolHDL : ''}
                              onChange={(e) => e.target.value ? setCholesterolHDL(Number(e.target.value)) : setCholesterolHDL(null)}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              mg/dL
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Nível de colesterol HDL (bom) no sangue
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-blue-50 rounded-xl p-6 mb-6">
                          <h3 className="font-semibold mb-4">Por que estes dados importam?</h3>
                          <ul className="space-y-4">
                            <li className="flex">
                              <div className="mr-3 mt-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 0L10.2 5.31H16L11.2 8.69L12.89 14L8 10.5L3.11 14L4.8 8.69L0 5.31H5.8L8 0Z" fill="#3B82F6"/>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Pressão arterial elevada</p>
                                <p className="text-sm text-gray-600">Pode danificar artérias e sobrecarregar o coração</p>
                              </div>
                            </li>
                            
                            <li className="flex">
                              <div className="mr-3 mt-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 0L10.2 5.31H16L11.2 8.69L12.89 14L8 10.5L3.11 14L4.8 8.69L0 5.31H5.8L8 0Z" fill="#3B82F6"/>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Colesterol total alto</p>
                                <p className="text-sm text-gray-600">Contribui para formação de placas nas artérias</p>
                              </div>
                            </li>
                            
                            <li className="flex">
                              <div className="mr-3 mt-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 0L10.2 5.31H16L11.2 8.69L12.89 14L8 10.5L3.11 14L4.8 8.69L0 5.31H5.8L8 0Z" fill="#3B82F6"/>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">HDL baixo</p>
                                <p className="text-sm text-gray-600">Reduz proteção natural do corpo contra aterosclerose</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 rounded-xl p-6">
                          <div className="flex items-center text-blue-600 mb-2">
                            <Info className="h-5 w-5 mr-2" />
                            <h3 className="font-semibold">Nível de confiabilidade</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Quanto mais dados você fornecer, mais preciso será seu resultado
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Básico</span>
                              <span>Intermediário</span>
                              <span>Avançado</span>
                            </div>
                            <Progress 
                              value={systolicPressure ? (cholesterolTotal && cholesterolHDL ? 100 : 50) : 0} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 'results' && (
                  <div>
                    <div className="mb-4 bg-blue-50 rounded-xl px-6 py-3 flex items-center justify-center">
                      <div className="text-sm text-blue-600">
                        Nível de confiabilidade: {reliabilityLevel}
                      </div>
                    </div>
                    
                    <div className="text-center mb-12">
                      <h2 className="text-2xl font-bold mb-8">Seu risco cardiovascular em 10 anos</h2>
                      
                      <div className="max-w-lg mx-auto">
                        <div className="relative h-12 mb-2">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"></div>
                          
                          <div 
                            className="absolute top-1/2 transform -translate-y-1/2"
                            style={{ left: `${Math.min(Math.max(riskScore / 35 * 100, 5), 95)}%` }}
                          >
                            <div className="w-16 h-16 rounded-full bg-white border-4 border-yellow-500 shadow-lg flex items-center justify-center transform -translate-x-1/2">
                              <span className="text-xl font-bold text-yellow-500">{riskScore}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm mt-8">
                          <div className="w-1/4 text-left">
                            <p className="font-medium">Baixo</p>
                            <p className="text-xs text-gray-500">&lt;5%</p>
                          </div>
                          <div className="w-1/4 text-center">
                            <p className="font-medium">Moderado</p>
                            <p className="text-xs text-gray-500">5-10%</p>
                          </div>
                          <div className="w-1/4 text-center">
                            <p className="font-medium">Alto</p>
                            <p className="text-xs text-gray-500">10-20%</p>
                          </div>
                          <div className="w-1/4 text-right">
                            <p className="font-medium">Muito Alto</p>
                            <p className="text-xs text-gray-500">&gt;20%</p>
                          </div>
                        </div>
                        
                        <div className="text-center mt-4">
                          <h3 className="text-xl font-bold text-yellow-500">Risco Moderado-Alto</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                      <div>
                        <h3 className="text-xl font-semibold mb-6">Seus principais fatores de risco</h3>
                        <div className="space-y-6">
                          {riskFactors.map((factor) => (
                            <div key={factor.id} className="flex items-start">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 ${
                                factor.id === 3 ? 'bg-green-100 text-green-500' : 
                                factor.id === 1 ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-500'
                              }`}>
                                {factor.id}
                              </div>
                              
                              <div className="w-full">
                                <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-medium">{factor.name}</h4>
                                  <span className={`text-sm ${
                                    factor.value > 0 ? 'text-red-500' : 'text-green-500'
                                  }`}>{factor.impact}</span>
                                </div>
                                
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      factor.value > 0 
                                        ? 'bg-gradient-to-r from-red-300 to-red-500' 
                                        : 'bg-gradient-to-r from-green-300 to-green-500'
                                    }`}
                                    style={{ width: `${Math.abs(factor.value)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-6">Próximos passos recomendados</h3>
                        <div className="space-y-4">
                          {recommendations.map((rec) => (
                            <div key={rec.id} className="flex items-start p-4 bg-blue-50 rounded-xl">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4 shrink-0">
                                {rec.id}
                              </div>
                              <div>
                                <h4 className="font-medium text-blue-700">{rec.title}</h4>
                                {rec.description && (
                                  <p className="text-sm text-blue-600 mt-1">{rec.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-8">
                          <Button 
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl py-6"
                          >
                            Ver plano de ação detalhado
                          </Button>
                          
                          <Button 
                            variant="outline"
                            className="w-full mt-4 border-blue-200 text-blue-600 font-medium rounded-xl py-6"
                          >
                            Explorar o simulador "E se?"
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
                        onClick={() => setCurrentStep('onboarding')}
                      >
                        Refaça esta avaliação em 3 meses para acompanhar seu progresso
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep !== 'onboarding' && currentStep !== 'results' && (
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="flex items-center"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Voltar
                    </Button>
                    
                    <div className="flex gap-4">
                      {currentStep === 'clinical' && (
                        <Button
                          variant="outline"
                          onClick={skipClinicalStep}
                          className="text-gray-500"
                        >
                          Pular esta etapa
                        </Button>
                      )}
                      
                      <Button
                        onClick={goToNextStep}
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
                      >
                        Continuar
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CardiacCalculator;
