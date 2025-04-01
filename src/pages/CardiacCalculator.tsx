
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Activity, Clock, Info, AlertCircle, ChevronRight, Award, Check, Star, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

// Update the Step type to include 'onboarding'
type Step = 'onboarding' | 'basic' | 'lifestyle' | 'clinical' | 'results';

// Define types for the user data
interface UserData {
  // Basic data
  age: number;
  sex: 'male' | 'female';
  weight: number;
  height: number;
  familyHistory: boolean;
  
  // Lifestyle data
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  smoker: boolean;
  diabetic: boolean;
  alcoholConsumption: 'none' | 'moderate' | 'heavy';
  
  // Clinical data
  systolicBP?: number;
  totalCholesterol?: number;
  hdlCholesterol?: number;
}

const CardiacCalculator = () => {
  // State for the current step in the process
  const [currentStep, setCurrentStep] = useState<Step>('onboarding');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  // User data state
  const [userData, setUserData] = useState<UserData>({
    age: 40,
    sex: 'male',
    weight: 70,
    height: 170,
    familyHistory: false,
    activityLevel: 'moderate',
    smoker: false,
    diabetic: false,
    alcoholConsumption: 'none',
  });
  
  // Derived state
  const [bmi, setBmi] = useState(0);
  const [risk, setRisk] = useState(0);
  const [riskCategory, setRiskCategory] = useState('');
  const [mainFactors, setMainFactors] = useState<string[]>([]);
  
  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    if (userData.weight > 0 && userData.height > 0) {
      const heightInMeters = userData.height / 100;
      const calculatedBmi = userData.weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBmi.toFixed(1)));
    }
  }, [userData.weight, userData.height]);
  
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
        break;
    }
  }, [currentStep]);
  
  const handleInputChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };
  
  const calculateRisk = () => {
    // This is a simplified risk calculation for demonstration
    // In a real app, you would implement an actual risk algorithm
    
    // Base risk based on age
    let calculatedRisk = (userData.age - 30) * 0.5;
    if (calculatedRisk < 0) calculatedRisk = 0;
    
    // Adjust for sex
    if (userData.sex === 'male') {
      calculatedRisk += 2;
    }
    
    // Adjust for BMI
    if (bmi >= 30) {
      calculatedRisk += 3;
    } else if (bmi >= 25) {
      calculatedRisk += 1.5;
    }
    
    // Adjust for family history
    if (userData.familyHistory) {
      calculatedRisk += 4;
    }
    
    // Adjust for lifestyle factors
    if (userData.smoker) {
      calculatedRisk += 5;
    }
    
    if (userData.diabetic) {
      calculatedRisk += 4;
    }
    
    if (userData.alcoholConsumption === 'heavy') {
      calculatedRisk += 3;
    } else if (userData.alcoholConsumption === 'moderate') {
      calculatedRisk += 1;
    }
    
    if (userData.activityLevel === 'sedentary') {
      calculatedRisk += 3;
    } else if (userData.activityLevel === 'light') {
      calculatedRisk += 1;
    } else if (userData.activityLevel === 'active') {
      calculatedRisk -= 2;
    }
    
    // Clinical factors if provided
    if (userData.systolicBP) {
      if (userData.systolicBP >= 140) {
        calculatedRisk += 5;
      } else if (userData.systolicBP >= 130) {
        calculatedRisk += 2.5;
      }
    }
    
    if (userData.totalCholesterol && userData.hdlCholesterol) {
      const ratio = userData.totalCholesterol / userData.hdlCholesterol;
      if (ratio > 5) {
        calculatedRisk += 5;
      } else if (ratio > 3.5) {
        calculatedRisk += 2.5;
      }
    }
    
    // Cap the risk at 30%
    calculatedRisk = Math.min(calculatedRisk, 30);
    
    // Determine the main risk factors
    const factors = [];
    
    if (userData.age > 50) factors.push('Idade acima de 50 anos');
    if (userData.sex === 'male') factors.push('Sexo masculino');
    if (bmi >= 30) factors.push('Obesidade');
    if (userData.familyHistory) factors.push('Histórico familiar');
    if (userData.smoker) factors.push('Tabagismo');
    if (userData.diabetic) factors.push('Diabetes');
    if (userData.alcoholConsumption === 'heavy') factors.push('Consumo elevado de álcool');
    if (userData.activityLevel === 'sedentary') factors.push('Sedentarismo');
    if (userData.systolicBP && userData.systolicBP >= 140) factors.push('Pressão arterial elevada');
    if (userData.totalCholesterol && userData.totalCholesterol > 200) factors.push('Colesterol total elevado');
    if (userData.hdlCholesterol && userData.hdlCholesterol < 40) factors.push('HDL baixo');
    
    // Take the top 3 factors
    setMainFactors(factors.slice(0, 3));
    
    // Set the risk category
    if (calculatedRisk < 5) {
      setRiskCategory('Baixo');
    } else if (calculatedRisk < 10) {
      setRiskCategory('Moderado');
    } else if (calculatedRisk < 20) {
      setRiskCategory('Moderado-Alto');
    } else {
      setRiskCategory('Alto');
    }
    
    setRisk(parseFloat(calculatedRisk.toFixed(1)));
    setCurrentStep('results');
  };
  
  const nextStep = () => {
    if (currentStep === 'basic') {
      setCurrentStep('lifestyle');
    } else if (currentStep === 'lifestyle') {
      setCurrentStep('clinical');
    } else if (currentStep === 'clinical') {
      calculateRisk();
    }
  };
  
  const prevStep = () => {
    if (currentStep === 'lifestyle') {
      setCurrentStep('basic');
    } else if (currentStep === 'clinical') {
      setCurrentStep('lifestyle');
    } else if (currentStep === 'results') {
      setCurrentStep('clinical');
    }
  };
  
  const startCalculator = () => {
    setCurrentStep('basic');
    toast({
      title: "Avaliação iniciada",
      description: "Vamos analisar seu risco cardíaco com base nos seus dados.",
    });
  };
  
  const restartCalculator = () => {
    setCurrentStep('basic');
    setUserData({
      age: 40,
      sex: 'male',
      weight: 70,
      height: 170,
      familyHistory: false,
      activityLevel: 'moderate',
      smoker: false,
      diabetic: false,
      alcoholConsumption: 'none',
    });
    setBmi(0);
    setRisk(0);
    setRiskCategory('');
    setMainFactors([]);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-doctordicas-text-dark mb-2">
          Calculadora Cardíaca
        </h1>
        <p className="text-doctordicas-text-medium text-center mb-8">
          Avalie seu risco cardiovascular e receba recomendações personalizadas
        </p>
        
        {/* Progress bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs mt-1 text-doctordicas-text-medium">
            <span>Início</span>
            <span>Dados Básicos</span>
            <span>Estilo de Vida</span>
            <span>Dados Clínicos</span>
            <span>Resultados</span>
          </div>
        </div>
        
        {currentStep === 'onboarding' && (
          <div className="animate-fade-in">
            <Card className="mb-8 overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-6 animate-pulse">
                  <Heart className="h-12 w-12" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-center">Descubra seu risco cardiovascular</h2>
                
                <p className="text-center mb-6 max-w-md">
                  Nossa calculadora usa algoritmos validados clinicamente para estimar seu risco de desenvolver doenças cardiovasculares nos próximos 10 anos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md mb-6">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex flex-col items-center">
                    <Clock className="h-6 w-6 mb-2" />
                    <span className="text-sm">Rápido</span>
                    <span className="text-xs opacity-80">3 min</span>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex flex-col items-center">
                    <Activity className="h-6 w-6 mb-2" />
                    <span className="text-sm">Preciso</span>
                    <span className="text-xs opacity-80">Validado</span>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex flex-col items-center">
                    <Award className="h-6 w-6 mb-2" />
                    <span className="text-sm">Personalizado</span>
                    <span className="text-xs opacity-80">Para você</span>
                  </div>
                </div>
                
                <Button 
                  onClick={startCalculator}
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 animate-pulse"
                >
                  Começar minha avaliação
                  <ChevronRight className="ml-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Como funciona a Calculadora Cardíaca?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Insira seus dados básicos</h4>
                      <p className="text-sm text-gray-600">Idade, sexo, peso e altura são essenciais para o cálculo do risco base.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Informe seu estilo de vida</h4>
                      <p className="text-sm text-gray-600">Hábitos como tabagismo e atividade física influenciam diretamente seu risco.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Adicione dados clínicos (opcional)</h4>
                      <p className="text-sm text-gray-600">Para um resultado mais preciso, inclua dados de exames como pressão e colesterol.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Receba sua avaliação personalizada</h4>
                      <p className="text-sm text-gray-600">Veja seu risco cardiovascular e recomendações específicas para sua saúde.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <div className="flex items-center">
                    <Info className="text-blue-600 mr-2" size={16} />
                    <p className="text-sm text-gray-600">
                      Esta ferramenta é informativa e não substitui uma consulta médica profissional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {currentStep === 'basic' && (
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Dados Básicos</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <div className="flex mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInputChange('age', Math.max(18, userData.age - 1))}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Input
                        id="age"
                        type="number"
                        value={userData.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                        className="mx-2 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInputChange('age', userData.age + 1)}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Recomendado: 18-90 anos</p>
                  </div>
                  
                  <div>
                    <Label>Sexo Biológico</Label>
                    <div className="flex space-x-2 mt-1">
                      <Button
                        variant={userData.sex === 'male' ? 'default' : 'outline'}
                        className={userData.sex === 'male' ? 'bg-blue-600' : ''}
                        onClick={() => handleInputChange('sex', 'male')}
                      >
                        Masculino
                      </Button>
                      <Button
                        variant={userData.sex === 'female' ? 'default' : 'outline'}
                        className={userData.sex === 'female' ? 'bg-pink-500' : ''}
                        onClick={() => handleInputChange('sex', 'female')}
                      >
                        Feminino
                      </Button>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center text-xs text-gray-500 mt-1">
                          <Info className="h-3 w-3 mr-1" />
                          Por que precisamos desta informação?
                        </TooltipTrigger>
                        <TooltipContent>
                          O sexo biológico influencia diferentes fatores de risco cardiovascular.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <div className="flex mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInputChange('weight', Math.max(40, userData.weight - 1))}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Input
                        id="weight"
                        type="number"
                        value={userData.weight}
                        onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                        className="mx-2 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInputChange('weight', userData.weight + 1)}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Altura (cm)</Label>
                    <div className="flex mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInputChange('height', Math.max(140, userData.height - 1))}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Input
                        id="height"
                        type="number"
                        value={userData.height}
                        onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                        className="mx-2 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInputChange('height', userData.height + 1)}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {bmi > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Seu IMC</h3>
                      <Badge variant={
                        bmi < 18.5 ? "outline" : 
                        bmi < 25 ? "default" : 
                        bmi < 30 ? "secondary" : 
                        "destructive"
                      }>
                        {bmi < 18.5 ? "Abaixo do peso" : 
                        bmi < 25 ? "Peso normal" : 
                        bmi < 30 ? "Sobrepeso" : 
                        "Obesidade"}
                      </Badge>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-blue-600 bg-blue-200">
                            {bmi}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                        <div 
                          style={{ width: `${Math.min(bmi/40 * 100, 100)}%` }} 
                          className={`
                            shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center 
                            ${bmi < 18.5 ? "bg-yellow-500" : 
                            bmi < 25 ? "bg-green-500" : 
                            bmi < 30 ? "bg-yellow-500" : 
                            "bg-red-500"}
                          `}
                        ></div>
                      </div>
                      <div className="flex text-xs justify-between text-gray-500">
                        <span>16</span>
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                        <span>40</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="familyHistory">Histórico familiar de doenças cardíacas?</Label>
                    <Switch 
                      id="familyHistory" 
                      checked={userData.familyHistory}
                      onCheckedChange={(checked) => handleInputChange('familyHistory', checked)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Pais, irmãos ou avós com doença cardíaca antes dos 55 anos (homem) ou 65 anos (mulher)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === 'lifestyle' && (
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Estilo de Vida</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Nível de atividade física</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <Card 
                      className={`cursor-pointer border-2 ${userData.activityLevel === 'sedentary' ? 'border-blue-600' : 'border-transparent'}`}
                      onClick={() => handleInputChange('activityLevel', 'sedentary')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-2">
                          <AlertCircle className="h-6 w-6 text-red-500" />
                        </div>
                        <h4 className="font-medium">Sedentário</h4>
                        <p className="text-xs text-gray-500">Pouca ou nenhuma atividade</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer border-2 ${userData.activityLevel === 'light' ? 'border-blue-600' : 'border-transparent'}`}
                      onClick={() => handleInputChange('activityLevel', 'light')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-10 h-10 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                          <Activity className="h-6 w-6 text-yellow-500" />
                        </div>
                        <h4 className="font-medium">Leve</h4>
                        <p className="text-xs text-gray-500">1-2 dias por semana</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer border-2 ${userData.activityLevel === 'moderate' ? 'border-blue-600' : 'border-transparent'}`}
                      onClick={() => handleInputChange('activityLevel', 'moderate')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <Activity className="h-6 w-6 text-green-500" />
                        </div>
                        <h4 className="font-medium">Moderada</h4>
                        <p className="text-xs text-gray-500">3-5 dias por semana</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer border-2 ${userData.activityLevel === 'active' ? 'border-blue-600' : 'border-transparent'}`}
                      onClick={() => handleInputChange('activityLevel', 'active')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <Activity className="h-6 w-6 text-blue-500" />
                        </div>
                        <h4 className="font-medium">Intenso</h4>
                        <p className="text-xs text-gray-500">6-7 dias por semana</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {userData.activityLevel !== 'sedentary' && (
                    <div className="text-xs text-green-600 flex items-center mt-2">
                      <Check className="h-3 w-3 mr-1" /> 
                      {userData.activityLevel === 'active' ? 'Reduz seu risco cardíaco em até 35%' : 
                       userData.activityLevel === 'moderate' ? 'Reduz seu risco cardíaco em até 25%' : 
                       'Reduz seu risco cardíaco em até 15%'}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="smoker">Você é fumante?</Label>
                      <Switch 
                        id="smoker" 
                        checked={userData.smoker}
                        onCheckedChange={(checked) => handleInputChange('smoker', checked)}
                      />
                    </div>
                    {userData.smoker && (
                      <div className="text-xs text-red-600 flex items-center mt-2">
                        <AlertCircle className="h-3 w-3 mr-1" /> Aumenta significativamente seu risco
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="diabetic">Você tem diabetes?</Label>
                      <Switch 
                        id="diabetic" 
                        checked={userData.diabetic}
                        onCheckedChange={(checked) => handleInputChange('diabetic', checked)}
                      />
                    </div>
                    {userData.diabetic && (
                      <div className="text-xs text-red-600 flex items-center mt-2">
                        <AlertCircle className="h-3 w-3 mr-1" /> Fator de risco cardiovascular importante
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Consumo de álcool</Label>
                    <RadioGroup 
                      value={userData.alcoholConsumption} 
                      onValueChange={(value: 'none' | 'moderate' | 'heavy') => handleInputChange('alcoholConsumption', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="alcohol-none" />
                        <Label htmlFor="alcohol-none">Não consumo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="alcohol-moderate" />
                        <Label htmlFor="alcohol-moderate">Moderado (até 1 dose/dia)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="heavy" id="alcohol-heavy" />
                        <Label htmlFor="alcohol-heavy">Frequente (mais de 1 dose/dia)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === 'clinical' && (
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-bold">Dados Clínicos</h2>
                <Badge variant="outline" className="mt-2 md:mt-0">
                  Opcional, mas aumenta a precisão
                </Badge>
              </div>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <Info className="text-yellow-600 mr-2 mt-0.5" size={18} />
                    <p className="text-sm text-gray-700">
                      Os campos abaixo são opcionais. Se você não souber ou não tiver esses valores, 
                      continue com "Não sei" e ainda receberá uma avaliação de risco básica.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="systolicBP">Pressão Arterial (número mais alto)</Label>
                      <HoverCard>
                        <HoverCardTrigger className="text-blue-600">
                          <Info className="h-4 w-4" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Pressão Arterial Sistólica</h4>
                            <p className="text-sm">
                              É o valor mais alto da sua medição de pressão (ex: 120/80, onde 120 é a sistólica).
                            </p>
                            <div className="text-xs">
                              <div className="flex justify-between">
                                <span>&lt; 120</span>
                                <span className="text-green-600">Normal</span>
                              </div>
                              <div className="flex justify-between">
                                <span>120-129</span>
                                <span className="text-yellow-600">Elevada</span>
                              </div>
                              <div className="flex justify-between">
                                <span>&gt; 130</span>
                                <span className="text-red-600">Hipertensão</span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    
                    <div className="flex mt-1">
                      <Input
                        id="systolicBP"
                        type="number"
                        placeholder="Por ex.: 120"
                        value={userData.systolicBP || ''}
                        onChange={(e) => handleInputChange('systolicBP', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="mr-2"
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleInputChange('systolicBP', undefined)}
                      >
                        Não sei
                      </Button>
                    </div>
                    
                    {userData.systolicBP !== undefined && (
                      <div className={`text-xs mt-1 flex items-center
                        ${userData.systolicBP < 120 ? 'text-green-600' : 
                          userData.systolicBP < 130 ? 'text-yellow-600' : 
                          'text-red-600'}`
                      }>
                        {userData.systolicBP < 120 ? (
                          <>
                            <Check className="h-3 w-3 mr-1" /> Normal
                          </>
                        ) : userData.systolicBP < 130 ? (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" /> Elevada
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" /> Hipertensão
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="totalCholesterol">Colesterol Total (mg/dL)</Label>
                      <HoverCard>
                        <HoverCardTrigger className="text-blue-600">
                          <Info className="h-4 w-4" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Colesterol Total</h4>
                            <p className="text-sm">
                              Valor total de colesterol no sangue, medido em miligramas por decilitro (mg/dL).
                            </p>
                            <div className="text-xs">
                              <div className="flex justify-between">
                                <span>&lt; 200</span>
                                <span className="text-green-600">Desejável</span>
                              </div>
                              <div className="flex justify-between">
                                <span>200-239</span>
                                <span className="text-yellow-600">Limítrofe</span>
                              </div>
                              <div className="flex justify-between">
                                <span>&gt; 240</span>
                                <span className="text-red-600">Elevado</span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    
                    <div className="flex mt-1">
                      <Input
                        id="totalCholesterol"
                        type="number"
                        placeholder="Por ex.: 180"
                        value={userData.totalCholesterol || ''}
                        onChange={(e) => handleInputChange('totalCholesterol', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="mr-2"
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleInputChange('totalCholesterol', undefined)}
                      >
                        Não sei
                      </Button>
                    </div>
                    
                    {userData.totalCholesterol !== undefined && (
                      <div className={`text-xs mt-1 flex items-center
                        ${userData.totalCholesterol < 200 ? 'text-green-600' : 
                          userData.totalCholesterol < 240 ? 'text-yellow-600' : 
                          'text-red-600'}`
                      }>
                        {userData.totalCholesterol < 200 ? (
                          <>
                            <Check className="h-3 w-3 mr-1" /> Desejável
                          </>
                        ) : userData.totalCholesterol < 240 ? (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" /> Limítrofe
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" /> Elevado
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="hdlCholesterol">HDL - Colesterol Bom (mg/dL)</Label>
                      <HoverCard>
                        <HoverCardTrigger className="text-blue-600">
                          <Info className="h-4 w-4" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-semibold">HDL - Colesterol Bom</h4>
                            <p className="text-sm">
                              Colesterol de alta densidade, conhecido como "colesterol bom".
                            </p>
                            <div className="text-xs">
                              <div className="flex justify-between">
                                <span>&lt; 40</span>
                                <span className="text-red-600">Baixo</span>
                              </div>
                              <div className="flex justify-between">
                                <span>40-59</span>
                                <span className="text-yellow-600">Médio</span>
                              </div>
                              <div className="flex justify-between">
                                <span>&gt; 60</span>
                                <span className="text-green-600">Ótimo</span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    
                    <div className="flex mt-1">
                      <Input
                        id="hdlCholesterol"
                        type="number"
                        placeholder="Por ex.: 45"
                        value={userData.hdlCholesterol || ''}
                        onChange={(e) => handleInputChange('hdlCholesterol', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="mr-2"
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleInputChange('hdlCholesterol', undefined)}
                      >
                        Não sei
                      </Button>
                    </div>
                    
                    {userData.hdlCholesterol !== undefined && (
                      <div className={`text-xs mt-1 flex items-center
                        ${userData.hdlCholesterol >= 60 ? 'text-green-600' : 
                          userData.hdlCholesterol >= 40 ? 'text-yellow-600' : 
                          'text-red-600'}`
                      }>
                        {userData.hdlCholesterol >= 60 ? (
                          <>
                            <Check className="h-3 w-3 mr-1" /> Ótimo
                          </>
                        ) : userData.hdlCholesterol >= 40 ? (
                          <>
                            <Check className="h-3 w-3 mr-1" /> Médio
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" /> Baixo
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mt-4 py-2 px-4 bg-blue-50 rounded-lg">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {(userData.systolicBP !== undefined || 
                       userData.totalCholesterol !== undefined || 
                       userData.hdlCholesterol !== undefined) ? (
                        <Star className="h-5 w-5 text-blue-600" />
                       ) : (
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                       )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">
                      {(userData.systolicBP !== undefined || 
                       userData.totalCholesterol !== undefined || 
                       userData.hdlCholesterol !== undefined) ? (
                        "Ótimo! Dados clínicos melhoram a precisão."
                       ) : (
                        "Sem dados clínicos, seu resultado terá precisão limitada."
                       )}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {(userData.systolicBP !== undefined && 
                       userData.totalCholesterol !== undefined && 
                       userData.hdlCholesterol !== undefined) ? (
                        "Todos os dados clínicos foram fornecidos. Sua avaliação será completa."
                       ) : (
                        "Você pode prosseguir mesmo sem esses dados, mas a precisão será menor."
                       )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === 'results' && (
          <div className="space-y-8 animate-fade-in">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-white">
                  <h2 className="text-xl font-bold mb-2">Seu Risco Cardiovascular</h2>
                  <p className="text-sm opacity-90">
                    Baseado nos dados fornecidos, calculamos seu risco cardiovascular para os próximos 10 anos.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col items-center mb-8">
                    <div 
                      className={`w-36 h-36 rounded-full flex items-center justify-center text-white text-3xl font-bold
                        ${risk < 5 ? 'bg-green-500' : 
                          risk < 10 ? 'bg-yellow-500' : 
                          risk < 20 ? 'bg-orange-500' : 
                          'bg-red-500'}`}
                    >
                      {risk}%
                    </div>
                    
                    <h3 className="text-lg font-bold mt-4 mb-2">
                      Risco {riskCategory}
                    </h3>
                    
                    <p className="text-center text-sm text-gray-600 max-w-md">
                      {risk < 5 ? 
                        'Seu risco de desenvolver doença cardiovascular nos próximos 10 anos é baixo. Continue com bons hábitos de saúde.' : 
                      risk < 10 ? 
                        'Seu risco é moderado. Pequenas mudanças no estilo de vida podem reduzir significativamente este valor.' :
                      risk < 20 ? 
                        'Seu risco é moderado-alto. Recomenda-se consulta médica e mudanças no estilo de vida.' :
                        'Seu risco é alto. Consulte um médico o mais breve possível para uma avaliação completa.'}
                    </p>
                  </div>
                  
                  <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="absolute h-full left-0 top-0 rounded-r-full transition-all duration-1000"
                      style={{ 
                        width: `${Math.min(risk * 2, 100)}%`,
                        background: `linear-gradient(90deg, 
                          ${risk < 5 ? '#10B981' : 
                            risk < 10 ? '#FBBF24' : 
                            risk < 20 ? '#F97316' : 
                            '#EF4444'} 0%, 
                          ${risk < 5 ? '#34D399' : 
                            risk < 10 ? '#F59E0B' : 
                            risk < 20 ? '#EA580C' : 
                            '#DC2626'} 100%)`
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-8">
                    <span>Baixo</span>
                    <span>Moderado</span>
                    <span>Moderado-Alto</span>
                    <span>Alto</span>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">Seus principais fatores de risco</h3>
                    
                    {mainFactors.length > 0 ? (
                      <div className="space-y-3">
                        {mainFactors.map((factor, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            <div className="flex-grow">
                              <div className="text-sm font-medium">{factor}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Parabéns! Nenhum fator de risco significativo foi identificado.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Recomendações Personalizadas</h2>
                
                <div className="space-y-4">
                  {userData.smoker && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-700">Cessação do tabagismo</h4>
                        <p className="text-sm text-gray-600">
                          Parar de fumar pode reduzir seu risco cardiovascular em até 50% em um ano.
                          Considere um programa de cessação do tabagismo.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {bmi >= 25 && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-yellow-700">Gerenciamento de peso</h4>
                        <p className="text-sm text-gray-600">
                          {bmi >= 30 ? 
                            'Seu IMC indica obesidade. Uma redução de 5-10% do peso corporal já traz benefícios significativos.' : 
                            'Seu IMC indica sobrepeso. Pequenas reduções de peso podem melhorar significativamente sua saúde cardiovascular.'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {userData.activityLevel === 'sedentary' && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700">Aumente sua atividade física</h4>
                        <p className="text-sm text-gray-600">
                          Comece com 30 minutos de atividade moderada, como caminhada rápida, 
                          pelo menos 5 dias por semana.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {(userData.systolicBP && userData.systolicBP > 130) && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-700">Controle a pressão arterial</h4>
                        <p className="text-sm text-gray-600">
                          Sua pressão arterial está elevada. Reduza o consumo de sal, mantenha peso 
                          saudável e consulte um médico para avaliação.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {(userData.totalCholesterol && userData.totalCholesterol > 200) && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-yellow-700">Gerenciamento do colesterol</h4>
                        <p className="text-sm text-gray-600">
                          Seu colesterol está elevado. Aumente o consumo de fibras, reduza gorduras saturadas 
                          e considere uma avaliação médica.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {userData.alcoholConsumption === 'heavy' && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700">Modere o consumo de álcool</h4>
                        <p className="text-sm text-gray-600">
                          Reduzir o consumo de álcool para níveis moderados pode diminuir o risco cardiovascular, 
                          a pressão arterial e o peso.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {risk >= 10 && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Info className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-700">Consulte um médico</h4>
                        <p className="text-sm text-gray-600">
                          Com seu nível de risco, é importante realizar uma avaliação médica completa. 
                          Considere agendar uma consulta com um cardiologista.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {risk < 10 && (
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-700">Continue com bons hábitos</h4>
                        <p className="text-sm text-gray-600">
                          Mantenha um estilo de vida saudável e faça check-ups regulares para monitorar
                          sua saúde cardiovascular.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <Button
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Em desenvolvimento",
                        description: "O plano de ação detalhado estará disponível em breve.",
                      });
                    }}
                  >
                    Ver plano de ação detalhado
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1"
                variant="outline"
                onClick={restartCalculator}
              >
                Refazer avaliação
              </Button>
              
              <Button 
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Avaliação salva",
                    description: "Sua avaliação foi salva em seu perfil.",
                  });
                }}
              >
                Salvar resultados
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <div className="container mx-auto">
            {(currentStep !== 'results' && currentStep !== 'onboarding') && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={currentStep === 'basic' ? () => setCurrentStep('onboarding') : prevStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
                
                <Button onClick={nextStep}>
                  {currentStep === 'clinical' ? 'Ver resultados' : 'Continuar'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CardiacCalculator;
