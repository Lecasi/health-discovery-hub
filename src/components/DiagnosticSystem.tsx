
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ChevronRight, Stethoscope, 
  HeartPulse, Thermometer, Pill, Brain, 
  Lungs, Bone, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";

// Define the diagnostic category type
interface DiagnosticCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  commonSymptoms: string[];
}

// Define the diagnostic categories
const diagnosticCategories: DiagnosticCategory[] = [
  {
    id: 'cardiovascular',
    name: 'Cardiovascular',
    description: 'Problemas relacionados ao coração e sistema circulatório',
    icon: HeartPulse,
    commonSymptoms: ['Dor no peito', 'Falta de ar', 'Palpitações', 'Desmaios']
  },
  {
    id: 'respiratory',
    name: 'Respiratório',
    description: 'Problemas relacionados aos pulmões e vias respiratórias',
    icon: Lungs,
    commonSymptoms: ['Tosse', 'Falta de ar', 'Chiado no peito', 'Dor ao respirar']
  },
  {
    id: 'digestive',
    name: 'Digestivo',
    description: 'Problemas relacionados ao sistema digestivo',
    icon: Pill,
    commonSymptoms: ['Dor abdominal', 'Náusea', 'Vômito', 'Diarreia', 'Constipação']
  },
  {
    id: 'nervous',
    name: 'Sistema Nervoso',
    description: 'Problemas relacionados ao cérebro e sistema nervoso',
    icon: Brain,
    commonSymptoms: ['Dor de cabeça', 'Tontura', 'Formigamento', 'Fraqueza', 'Confusão']
  },
  {
    id: 'musculoskeletal',
    name: 'Músculo-Esquelético',
    description: 'Problemas relacionados aos músculos, ossos e articulações',
    icon: Bone,
    commonSymptoms: ['Dor nas articulações', 'Inchaço', 'Rigidez', 'Dificuldade para mover']
  },
  {
    id: 'vision',
    name: 'Visão',
    description: 'Problemas relacionados aos olhos e visão',
    icon: Eye,
    commonSymptoms: ['Visão borrada', 'Dor nos olhos', 'Olho seco', 'Ver flashes de luz']
  },
];

const DiagnosticSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState<DiagnosticCategory | null>(null);
  const [symptoms, setSymptoms] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCategorySelect = (category: DiagnosticCategory) => {
    setSelectedCategory(category);
  };

  const handleDiagnosticSubmit = () => {
    if (!selectedCategory || !symptoms.trim()) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, selecione uma categoria e descreva seus sintomas",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate diagnostic processing
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store diagnostic in localStorage (in a real app, this would go to a database)
      const diagnosticData = {
        id: `diag-${Date.now()}`,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        symptoms: symptoms,
        date: new Date().toISOString(),
      };
      
      const existingDiagnostics = JSON.parse(localStorage.getItem('diagnostics') || '[]');
      localStorage.setItem('diagnostics', JSON.stringify([...existingDiagnostics, diagnosticData]));
      
      toast({
        title: "Diagnóstico iniciado",
        description: "Seus sintomas estão sendo analisados pelo nosso sistema",
      });
      
      // Navigate to results page (would be implemented in a real system)
      navigate(`/diagnostico/resultados/${diagnosticData.id}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-doctordicas-text-dark mb-2">Sistema de Diagnóstico</h1>
          <p className="text-doctordicas-text-medium">
            Nosso sistema de IA analisa seus sintomas e fornece orientações preliminares sobre possíveis condições.
            Lembre-se que este não é um substituto para consulta médica profissional.
          </p>
        </div>
        
        {!selectedCategory ? (
          <div>
            <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-4">Selecione a categoria de sintomas:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diagnosticCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="bg-doctordicas-blue-light p-2 rounded-full">
                      <category.icon className="text-doctordicas-blue h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{category.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 border-t flex justify-between items-center">
                    <div className="text-xs text-doctordicas-text-medium">Sintomas comuns</div>
                    <ChevronRight className="h-4 w-4 text-doctordicas-text-medium" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Voltar
              </Button>
              <h2 className="text-xl font-semibold text-doctordicas-text-dark">
                {selectedCategory.name}
              </h2>
            </div>
            
            <div className="mb-6">
              <div className="text-sm text-doctordicas-text-medium mb-2">Sintomas comuns nesta categoria:</div>
              <div className="flex flex-wrap gap-2">
                {selectedCategory.commonSymptoms.map((symptom, index) => (
                  <div 
                    key={index} 
                    className="bg-doctordicas-blue-light text-doctordicas-blue px-3 py-1 rounded-full text-sm"
                  >
                    {symptom}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="symptoms" className="block text-sm font-medium text-doctordicas-text-dark mb-2">
                Descreva detalhadamente seus sintomas:
              </label>
              <textarea
                id="symptoms"
                rows={6}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-doctordicas-blue focus:border-doctordicas-blue"
                placeholder="Exemplo: Tenho sentido dor no peito que piora quando respiro fundo, começou há 3 dias e está acompanhada de uma leve tosse seca..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              ></textarea>
              <p className="text-xs text-doctordicas-text-medium mt-1">
                Quanto mais detalhes você fornecer, mais precisa será nossa análise.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                className="flex items-center gap-2" 
                onClick={handleDiagnosticSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Stethoscope className="h-4 w-4" />
                    <span>Iniciar Diagnóstico</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticSystem;
