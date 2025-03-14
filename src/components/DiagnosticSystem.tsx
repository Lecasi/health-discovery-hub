
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Stethoscope, Heart, Brain, Thermometer, Activity } from 'lucide-react';

const symptomGroups = [
  {
    id: 'respiratory',
    title: 'Sintomas Respiratórios',
    icon: <Stethoscope className="h-5 w-5" />,
    symptoms: [
      { id: 'cough', label: 'Tosse' },
      { id: 'shortnessOfBreath', label: 'Falta de ar' },
      { id: 'soreThroat', label: 'Dor de garganta' },
      { id: 'nasalCongestion', label: 'Congestão nasal' },
      { id: 'runnyNose', label: 'Coriza' },
    ]
  },
  {
    id: 'cardiac',
    title: 'Sintomas Cardíacos',
    icon: <Heart className="h-5 w-5" />,
    symptoms: [
      { id: 'chestPain', label: 'Dor no peito' },
      { id: 'palpitations', label: 'Palpitações' },
      { id: 'dizziness', label: 'Tontura' },
      { id: 'fainting', label: 'Desmaio ou quase desmaio' },
    ]
  },
  {
    id: 'neurological',
    title: 'Sintomas Neurológicos',
    icon: <Brain className="h-5 w-5" />,
    symptoms: [
      { id: 'headache', label: 'Dor de cabeça' },
      { id: 'confusion', label: 'Confusão mental' },
      { id: 'memoryIssues', label: 'Problemas de memória' },
      { id: 'difficultyConcentrating', label: 'Dificuldade de concentração' },
    ]
  },
  {
    id: 'general',
    title: 'Sintomas Gerais',
    icon: <Thermometer className="h-5 w-5" />,
    symptoms: [
      { id: 'fever', label: 'Febre' },
      { id: 'fatigue', label: 'Fadiga' },
      { id: 'bodyAches', label: 'Dores no corpo' },
      { id: 'chills', label: 'Calafrios' },
      { id: 'weightLoss', label: 'Perda de peso inexplicada' },
    ]
  },
  {
    id: 'digestive',
    title: 'Sintomas Digestivos',
    icon: <Activity className="h-5 w-5" />,
    symptoms: [
      { id: 'nausea', label: 'Náusea' },
      { id: 'vomiting', label: 'Vômito' },
      { id: 'diarrhea', label: 'Diarreia' },
      { id: 'constipation', label: 'Constipação' },
      { id: 'abdominalPain', label: 'Dor abdominal' },
    ]
  }
];

const DiagnosticSystem = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomsIntensity, setSymptomsIntensity] = useState<{[key: string]: number}>({});
  const [symptomsFrequency, setSymptomsFrequency] = useState<{[key: string]: string}>({});
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        const newSelectedSymptoms = prev.filter(id => id !== symptomId);
        // Also remove intensity and frequency
        const newIntensity = { ...symptomsIntensity };
        delete newIntensity[symptomId];
        setSymptomsIntensity(newIntensity);
        
        const newFrequency = { ...symptomsFrequency };
        delete newFrequency[symptomId];
        setSymptomsFrequency(newFrequency);
        
        return newSelectedSymptoms;
      } else {
        return [...prev, symptomId];
      }
    });
  };

  const handleIntensityChange = (symptomId: string, value: number[]) => {
    setSymptomsIntensity(prev => ({
      ...prev,
      [symptomId]: value[0]
    }));
  };

  const handleFrequencyChange = (symptomId: string, value: string) => {
    setSymptomsFrequency(prev => ({
      ...prev,
      [symptomId]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit the diagnostic information
      const diagnosisId = `diag-${Date.now()}`;
      navigate(`/diagnostico/resultados/${diagnosisId}`);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleHistoryToggle = (condition: string) => {
    setMedicalHistory(prev => {
      if (prev.includes(condition)) {
        return prev.filter(c => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sistema de Diagnóstico Preliminar</CardTitle>
          <CardDescription>
            Esta ferramenta oferece uma análise preliminar com base nos seus sintomas. 
            Não substitui uma consulta médica profissional.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Selecione seus sintomas</h3>
              
              <div className="space-y-6">
                {symptomGroups.map(group => (
                  <div key={group.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      {group.icon}
                      <h4 className="font-medium">{group.title}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {group.symptoms.map(symptom => (
                        <div key={symptom.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={symptom.id}
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={() => handleSymptomToggle(symptom.id)}
                          />
                          <Label
                            htmlFor={symptom.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {symptom.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && selectedSymptoms.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Detalhe seus sintomas</h3>
              
              <div className="space-y-6">
                {selectedSymptoms.map(symptomId => {
                  const symptomGroup = symptomGroups.find(group => 
                    group.symptoms.some(s => s.id === symptomId)
                  );
                  const symptom = symptomGroup?.symptoms.find(s => s.id === symptomId);
                  
                  return (
                    <div key={symptomId} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">{symptom?.label}</h4>
                      
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label>Intensidade</Label>
                          <div className="px-1">
                            <Slider 
                              defaultValue={[symptomsIntensity[symptomId] || 5]} 
                              max={10} 
                              step={1}
                              onValueChange={(value) => handleIntensityChange(symptomId, value)}
                            />
                            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                              <span>Leve</span>
                              <span>Moderada</span>
                              <span>Severa</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Label>Frequência</Label>
                          <RadioGroup 
                            defaultValue={symptomsFrequency[symptomId] || "occasional"} 
                            onValueChange={(value) => handleFrequencyChange(symptomId, value)}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="rarely" id={`${symptomId}-rarely`} />
                              <Label htmlFor={`${symptomId}-rarely`}>Raramente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="occasional" id={`${symptomId}-occasional`} />
                              <Label htmlFor={`${symptomId}-occasional`}>Ocasionalmente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="frequent" id={`${symptomId}-frequent`} />
                              <Label htmlFor={`${symptomId}-frequent`}>Frequentemente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="constant" id={`${symptomId}-constant`} />
                              <Label htmlFor={`${symptomId}-constant`}>Constantemente</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Informações Pessoais</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <select 
                      id="age" 
                      className="w-full p-2 border rounded-md" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="0-12">0-12 anos</option>
                      <option value="13-18">13-18 anos</option>
                      <option value="19-29">19-29 anos</option>
                      <option value="30-39">30-39 anos</option>
                      <option value="40-49">40-49 anos</option>
                      <option value="50-59">50-59 anos</option>
                      <option value="60-69">60-69 anos</option>
                      <option value="70+">70+ anos</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gênero</Label>
                    <select 
                      id="gender" 
                      className="w-full p-2 border rounded-md"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="male">Masculino</option>
                      <option value="female">Feminino</option>
                      <option value="other">Outro</option>
                      <option value="prefer-not-to-say">Prefiro não informar</option>
                    </select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Histórico Médico (selecione todas que se aplicam)</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'diabetes', label: 'Diabetes' },
                      { id: 'hypertension', label: 'Hipertensão' },
                      { id: 'heartDisease', label: 'Doença cardíaca' },
                      { id: 'asthma', label: 'Asma' },
                      { id: 'cancer', label: 'Câncer' },
                      { id: 'autoimmune', label: 'Doença autoimune' },
                      { id: 'thyroid', label: 'Problemas de tireoide' },
                      { id: 'depression', label: 'Depressão ou ansiedade' }
                    ].map(condition => (
                      <div key={condition.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={condition.id}
                          checked={medicalHistory.includes(condition.id)}
                          onCheckedChange={() => handleHistoryToggle(condition.id)}
                        />
                        <Label
                          htmlFor={condition.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {condition.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            Voltar
          </Button>
          
          <Button
            onClick={handleNextStep}
            disabled={currentStep === 1 && selectedSymptoms.length === 0}
          >
            {currentStep < 3 ? 'Próximo' : 'Finalizar'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DiagnosticSystem;
