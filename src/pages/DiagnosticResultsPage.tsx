
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle, HelpCircle, CalendarClock, ArrowRight, FileText, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DiagnosticData {
  id: string;
  categoryId: string;
  categoryName: string;
  symptoms: string;
  date: string;
}

interface Condition {
  name: string;
  probability: number;
  description: string;
  recommendation: string;
  urgency: 'high' | 'medium' | 'low';
}

const DiagnosticResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [diagnostic, setDiagnostic] = useState<DiagnosticData | null>(null);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be a fetch to your API
    const fetchDiagnostic = () => {
      setLoading(true);
      const allDiagnostics: DiagnosticData[] = JSON.parse(localStorage.getItem('diagnostics') || '[]');
      const foundDiagnostic = allDiagnostics.find(d => d.id === id);
      
      if (foundDiagnostic) {
        setDiagnostic(foundDiagnostic);
        
        // Simulate API call to get diagnostic results
        setTimeout(() => {
          // Generate mock conditions based on category
          const mockConditions: Condition[] = generateMockConditions(foundDiagnostic.categoryId);
          setConditions(mockConditions);
          setLoading(false);
        }, 1000);
      } else {
        // No diagnostic found
        setLoading(false);
      }
    };
    
    fetchDiagnostic();
  }, [id]);

  // Helper function to generate mock conditions for demo
  const generateMockConditions = (categoryId: string): Condition[] => {
    // This would be replaced by actual AI analysis in a real system
    const mockResults: Record<string, Condition[]> = {
      'cardiovascular': [
        {
          name: 'Ansiedade',
          probability: 0.72,
          description: 'Sintomas como palpitações e dor no peito podem estar relacionados a episódios de ansiedade.',
          recommendation: 'Técnicas de respiração e relaxamento podem ajudar. Considere consulta com psicólogo.',
          urgency: 'low'
        },
        {
          name: 'Refluxo Gastroesofágico',
          probability: 0.45,
          description: 'Ácido estomacal pode causar dor que se assemelha a problemas cardíacos.',
          recommendation: 'Evite alimentos picantes e café. Consulte um gastroenterologista se persistir.',
          urgency: 'low'
        },
        {
          name: 'Arritmia Cardíaca',
          probability: 0.35,
          description: 'Batimentos cardíacos irregulares podem causar sensação de palpitação.',
          recommendation: 'Consulte um cardiologista para avaliação e possível eletrocardiograma.',
          urgency: 'medium'
        }
      ],
      'respiratory': [
        {
          name: 'Infecção Respiratória',
          probability: 0.68,
          description: 'Sintomas como tosse e dificuldade respiratória sugerem possível infecção viral ou bacteriana.',
          recommendation: 'Descanso, hidratação e consulta médica para avaliação adequada.',
          urgency: 'medium'
        },
        {
          name: 'Asma',
          probability: 0.41,
          description: 'Chiado e falta de ar, especialmente em certas situações ou momentos do dia.',
          recommendation: 'Consulte um pneumologista para testes de função pulmonar.',
          urgency: 'medium'
        }
      ],
      // Add more categories as needed
    };
    
    // Return default conditions if category not found
    return mockResults[categoryId] || [
      {
        name: 'Condição não específica',
        probability: 0.5,
        description: 'Baseado nos sintomas informados, não foi possível determinar uma condição específica.',
        recommendation: 'Recomendamos consulta com médico para avaliação presencial.',
        urgency: 'medium'
      }
    ];
  };

  const getUrgencyIcon = (urgency: string) => {
    switch(urgency) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <HelpCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-doctordicas-blue animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-doctordicas-text-dark">Analisando resultados</h2>
            <p className="text-doctordicas-text-medium">Nossa IA está processando seus sintomas...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!diagnostic) {
    return (
      <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-doctordicas-blue mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-doctordicas-text-dark mb-2">Diagnóstico não encontrado</h1>
            <p className="text-doctordicas-text-medium mb-8">Não foi possível encontrar o diagnóstico solicitado.</p>
            <Button asChild>
              <Link to="/diagnostico">Iniciar novo diagnóstico</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/diagnostico" className="text-doctordicas-blue flex items-center gap-1 hover:underline">
            ← Voltar para Diagnóstico
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-2xl font-bold text-doctordicas-text-dark">Resultados do Diagnóstico</h1>
            <div className="flex items-center gap-2 text-sm text-doctordicas-text-medium">
              <CalendarClock className="h-4 w-4" />
              <span>{formatDate(diagnostic.date)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-doctordicas-blue-light p-4 rounded-lg">
                <h2 className="font-semibold text-doctordicas-blue mb-2">Detalhes do diagnóstico</h2>
                <div className="text-sm">
                  <div className="mb-2">
                    <span className="font-medium">Categoria:</span> {diagnostic.categoryName}
                  </div>
                  <div>
                    <span className="font-medium">Sintomas relatados:</span>
                    <p className="mt-1 text-doctordicas-text-medium">{diagnostic.symptoms}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Aviso importante</h3>
                      <p className="text-sm text-yellow-700">
                        Este diagnóstico é apenas uma orientação preliminar baseada nos sintomas relatados.
                        Não substitui a avaliação médica profissional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-4">Possíveis condições</h2>
              
              <div className="space-y-4">
                {conditions.map((condition, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {getUrgencyIcon(condition.urgency)}
                          <CardTitle className="text-lg">{condition.name}</CardTitle>
                        </div>
                        <div className="bg-doctordicas-blue-light text-doctordicas-blue px-2 py-1 rounded-full text-sm">
                          {Math.round(condition.probability * 100)}% provável
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-doctordicas-text-medium mb-2">{condition.description}</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex gap-2 items-start">
                          <FileText className="h-4 w-4 text-doctordicas-blue mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-doctordicas-text-dark">Recomendação</div>
                            <p className="text-sm text-doctordicas-text-medium">{condition.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-doctordicas-text-dark mb-2">Próximos passos recomendados:</h3>
                <div className="bg-white border border-gray-200 rounded-lg divide-y">
                  <div className="p-4 flex items-center gap-4">
                    <div className="bg-doctordicas-blue-light p-2 rounded-full">
                      <Clock className="h-5 w-5 text-doctordicas-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-doctordicas-text-dark">Agende uma consulta</h4>
                      <p className="text-sm text-doctordicas-text-medium">
                        Converse com um médico especialista para uma avaliação completa
                      </p>
                    </div>
                    <Button asChild>
                      <Link to="/consultas" className="flex items-center gap-1">
                        Agendar <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticResultsPage;
