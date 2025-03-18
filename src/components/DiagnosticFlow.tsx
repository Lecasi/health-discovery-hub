
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, AlertCircle, Search, ShieldCheck, RotateCcw, 
  Activity, MessageCircle, Stethoscope, Share, BookOpen, 
  Bell, Heart, Lock, Timer, ThumbsUp, ThumbsDown, AlertTriangle, User
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Types
type DiagnosticStep = 'input' | 'processing' | 'questions' | 'results' | 'recommendations' | 'feedback';
type UrgencyLevel = 'high' | 'medium' | 'low';

interface ConditionResult {
  name: string;
  match: number;
  description: string;
  specialists: string[];
}

interface Question {
  id: string;
  text: string;
  type: 'text' | 'choice';
  choices?: string[];
}

const DiagnosticFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<DiagnosticStep>('input');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [processingMessages, setProcessingMessages] = useState<string[]>([]);
  const [processingCurrentMessage, setProcessingCurrentMessage] = useState('');
  const [processingStage, setProcessingStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [diagnosesCount, setDiagnosesCount] = useState(12589);
  const [results, setResults] = useState<ConditionResult[]>([]);
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('medium');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [wasHelpful, setWasHelpful] = useState<boolean | null>(null);
  const [reminderSet, setReminderSet] = useState(false);
  
  const bodyParts = [
    'Cabeça', 'Peito', 'Abdômen', 'Costas',
    'Braços', 'Pernas', 'Geral'
  ];
  
  // Generate dynamic processing messages based on body part
  useEffect(() => {
    if (currentStep === 'processing') {
      const messages = [
        'Analisando sintomas...',
        'Consultando base médica...',
        'Comparando com casos similares...',
        'Preparando resultados preliminares...'
      ];
      
      if (selectedBodyPart === 'Cabeça') {
        messages.splice(2, 0, 'Verificando condições neurológicas...');
      } else if (selectedBodyPart === 'Peito') {
        messages.splice(2, 0, 'Analisando padrões cardiorrespiratórios...');
      } else if (selectedBodyPart === 'Abdômen') {
        messages.splice(2, 0, 'Verificando condições gastrointestinais...');
      }
      
      setProcessingMessages(messages);
      
      // Start the typing animation for the first message
      setProcessingCurrentMessage('');
      setProcessingStage(0);
    }
  }, [currentStep, selectedBodyPart]);
  
  // Typing animation effect
  useEffect(() => {
    if (currentStep === 'processing' && processingStage < processingMessages.length) {
      const targetMessage = processingMessages[processingStage];
      
      if (processingCurrentMessage.length < targetMessage.length) {
        const timer = setTimeout(() => {
          setProcessingCurrentMessage(targetMessage.substring(0, processingCurrentMessage.length + 1));
        }, 40); // Speed of typing animation
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          if (processingStage < processingMessages.length - 1) {
            setProcessingStage(prevStage => prevStage + 1);
            setProcessingCurrentMessage('');
          } else {
            // Move to questions after processing is complete
            setQuestions(generateQuestions());
            setCurrentStep('questions');
          }
        }, 800); // Pause between messages
        return () => clearTimeout(timer);
      }
    }
  }, [processingCurrentMessage, processingStage, processingMessages, currentStep]);
  
  // Simulate increasing diagnoses count
  useEffect(() => {
    const interval = setInterval(() => {
      setDiagnosesCount(prev => prev + 1);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Generate contextual questions based on body part and symptoms
  const generateQuestions = (): Question[] => {
    const commonQuestions: Question[] = [
      {
        id: 'duration',
        text: 'Há quanto tempo você está sentindo estes sintomas?',
        type: 'choice',
        choices: ['Menos de 24 horas', '1-3 dias', '4-7 dias', 'Mais de uma semana', 'Mais de um mês']
      },
      {
        id: 'intensity',
        text: 'Em uma escala de 1 a 10, qual a intensidade dos sintomas?',
        type: 'choice',
        choices: ['1-3 (Leve)', '4-6 (Moderado)', '7-8 (Forte)', '9-10 (Muito forte)']
      },
      {
        id: 'factors',
        text: 'Existe algum fator que piora ou melhora os sintomas?',
        type: 'text'
      }
    ];
    
    let specificQuestions: Question[] = [];
    
    // Add body part specific questions
    if (selectedBodyPart === 'Cabeça') {
      specificQuestions = [
        {
          id: 'headache_type',
          text: 'Como você descreveria sua dor de cabeça?',
          type: 'choice',
          choices: ['Pulsante', 'Pressão/Aperto', 'Em pontadas', 'Constante']
        },
        {
          id: 'visual_symptoms',
          text: 'Você tem algum sintoma visual associado?',
          type: 'choice',
          choices: ['Não', 'Visão embaçada', 'Sensibilidade à luz', 'Pontos cegos ou brilhantes']
        }
      ];
    } else if (selectedBodyPart === 'Peito') {
      specificQuestions = [
        {
          id: 'chest_pain_type',
          text: 'Como você descreveria a dor no peito?',
          type: 'choice',
          choices: ['Aperto', 'Queimação', 'Pontada', 'Pressão', 'Outro']
        },
        {
          id: 'breathing',
          text: 'Você está com dificuldade para respirar?',
          type: 'choice',
          choices: ['Não', 'Leve', 'Moderada', 'Severa']
        }
      ];
    } else if (selectedBodyPart === 'Abdômen') {
      specificQuestions = [
        {
          id: 'abdomen_location',
          text: 'Em qual parte do abdômen a dor está localizada?',
          type: 'choice',
          choices: ['Superior direita', 'Superior esquerda', 'Inferior direita', 'Inferior esquerda', 'Central', 'Todo o abdômen']
        },
        {
          id: 'digestion',
          text: 'Você notou alterações intestinais ou digestivas?',
          type: 'choice',
          choices: ['Não', 'Diarreia', 'Constipação', 'Náusea/Vômito', 'Azia']
        }
      ];
    }
    
    return [...specificQuestions, ...commonQuestions];
  };
  
  // Simulate API call to get diagnostic results
  const simulateDiagnosticResults = () => {
    let mockResults: ConditionResult[] = [];
    let mockUrgency: UrgencyLevel = 'low';
    
    if (selectedBodyPart === 'Cabeça') {
      if (symptoms.toLowerCase().includes('dor') || symptoms.toLowerCase().includes('forte')) {
        mockResults = [
          {
            name: 'Enxaqueca',
            match: 85,
            description: 'Dor de cabeça recorrente, geralmente em um lado, com possíveis sintomas como náusea e sensibilidade à luz.',
            specialists: ['Neurologista', 'Clínico Geral']
          },
          {
            name: 'Cefaleia Tensional',
            match: 62,
            description: 'Dor de pressão ou aperto em ambos os lados da cabeça, geralmente relacionada ao estresse.',
            specialists: ['Clínico Geral', 'Neurologista']
          },
          {
            name: 'Sinusite',
            match: 41,
            description: 'Inflamação dos seios paranasais que pode causar dor facial e de cabeça, congestionamento nasal e secreção.',
            specialists: ['Otorrinolaringologista', 'Clínico Geral']
          }
        ];
        mockUrgency = answers.intensity?.includes('9-10') ? 'medium' : 'low';
      } else {
        mockResults = [
          {
            name: 'Tontura Posicional',
            match: 78,
            description: 'Sensação de desequilíbrio ou vertigem relacionada a mudanças de posição da cabeça.',
            specialists: ['Otorrinolaringologista', 'Neurologista']
          },
          {
            name: 'Labirintite',
            match: 54,
            description: 'Inflamação do labirinto no ouvido interno que afeta o equilíbrio.',
            specialists: ['Otorrinolaringologista']
          }
        ];
        mockUrgency = 'low';
      }
    } else if (selectedBodyPart === 'Peito') {
      mockResults = [
        {
          name: 'Ansiedade',
          match: 68,
          description: 'Condição que pode causar aperto no peito, palpitações e sensação de falta de ar, frequentemente durante períodos de estresse.',
          specialists: ['Clínico Geral', 'Psiquiatra', 'Cardiologista']
        },
        {
          name: 'Refluxo Gastroesofágico',
          match: 51,
          description: 'Condição onde o ácido estomacal retorna ao esôfago, causando queimação e desconforto no peito.',
          specialists: ['Gastroenterologista', 'Clínico Geral']
        }
      ];
      
      // Check for potential emergency
      if (symptoms.toLowerCase().includes('dor intensa') || 
          symptoms.toLowerCase().includes('aperto') ||
          (answers.chest_pain_type === 'Pressão' && answers.breathing?.includes('Severa'))) {
        mockResults.unshift({
          name: 'Condição Cardíaca',
          match: 25,
          description: 'Diversos problemas cardíacos podem causar dor no peito e dificuldade para respirar.',
          specialists: ['Cardiologista', 'Emergência']
        });
        mockUrgency = 'high';
        setShowEmergencyDialog(true);
      } else {
        mockUrgency = 'medium';
      }
    } else if (selectedBodyPart === 'Abdômen') {
      mockResults = [
        {
          name: 'Síndrome do Intestino Irritável',
          match: 72,
          description: 'Distúrbio intestinal que causa dor abdominal, gases, diarreia ou constipação.',
          specialists: ['Gastroenterologista', 'Clínico Geral']
        },
        {
          name: 'Gastrite',
          match: 65,
          description: 'Inflamação do revestimento do estômago que pode causar dor abdominal, náusea e inchaço.',
          specialists: ['Gastroenterologista', 'Clínico Geral']
        },
        {
          name: 'Intolerância Alimentar',
          match: 48,
          description: 'Dificuldade em digerir certos alimentos que pode causar desconforto abdominal, gases e alterações intestinais.',
          specialists: ['Nutricionista', 'Gastroenterologista']
        }
      ];
      
      if (symptoms.toLowerCase().includes('aguda') || 
          symptoms.toLowerCase().includes('intensa') ||
          (answers.abdomen_location === 'Inferior direita')) {
        mockUrgency = 'medium';
        // Potential appendicitis warning for right lower quadrant pain
        if (answers.abdomen_location === 'Inferior direita' && (answers.intensity?.includes('7-8') || answers.intensity?.includes('9-10'))) {
          mockResults.unshift({
            name: 'Apendicite',
            match: 35,
            description: 'Inflamação do apêndice que causa dor intensa no quadrante inferior direito do abdômen.',
            specialists: ['Cirurgião Geral', 'Emergência']
          });
          mockUrgency = 'high';
          setShowEmergencyDialog(true);
        }
      } else {
        mockUrgency = 'low';
      }
    } else {
      // Generic results for other body parts
      mockResults = [
        {
          name: 'Condição Musculoesquelética',
          match: 63,
          description: 'Dores ou desconfortos relacionados aos músculos, tendões, ligamentos ou articulações.',
          specialists: ['Ortopedista', 'Fisioterapeuta', 'Clínico Geral']
        },
        {
          name: 'Processo Inflamatório',
          match: 49,
          description: 'Resposta do corpo a lesões ou irritações, causando dor, inchaço, calor e vermelhidão.',
          specialists: ['Clínico Geral', 'Reumatologista']
        }
      ];
      mockUrgency = 'low';
    }
    
    return { results: mockResults, urgency: mockUrgency };
  };
  
  const handleDiagnose = () => {
    if (!selectedBodyPart || !symptoms) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos para prosseguir com o diagnóstico.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('processing');
      
      toast({
        title: "Diagnóstico iniciado",
        description: "Nossa IA está analisando seus sintomas agora.",
        duration: 5000,
      });
    }, 1500);
  };
  
  const handleQuestionAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to results after all questions are answered
      const { results, urgency } = simulateDiagnosticResults();
      setResults(results);
      setUrgencyLevel(urgency);
      setCurrentStep('results');
    }
  };
  
  const handleTextAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const answer = formData.get('answer') as string;
    
    if (answer.trim()) {
      handleQuestionAnswer(answer);
      form.reset();
    }
  };
  
  const resetForm = () => {
    setSelectedBodyPart('');
    setSymptoms('');
    setCurrentStep('input');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults([]);
    setUrgencyLevel('medium');
    setIsDialogOpen(false);
    setShowEmergencyDialog(false);
    setWasHelpful(null);
    setIsFeedbackSubmitted(false);
    setReminderSet(false);
  };
  
  const getUrgencyColor = (level: UrgencyLevel) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };
  
  const getUrgencyText = (level: UrgencyLevel) => {
    switch (level) {
      case 'high': return 'Busque atendimento médico o mais rápido possível';
      case 'medium': return 'Consulte um médico nos próximos dias';
      case 'low': return 'Monitore seus sintomas e consulte um médico se necessário';
      default: return 'Monitore seus sintomas';
    }
  };
  
  const handleSetReminder = () => {
    setReminderSet(true);
    toast({
      title: "Lembrete configurado",
      description: "Enviaremos um lembrete em 48h para verificar se os sintomas melhoraram.",
      duration: 5000,
    });
  };
  
  const handleFeedback = (helpful: boolean) => {
    setWasHelpful(helpful);
    setIsFeedbackSubmitted(true);
    
    toast({
      title: helpful ? "Obrigado pelo feedback positivo!" : "Agradecemos seu feedback",
      description: helpful 
        ? "Ficamos felizes em ajudar com sua saúde."
        : "Vamos trabalhar para melhorar nossos diagnósticos.",
      duration: 5000,
    });
  };
  
  const handleShareWithDoctor = () => {
    toast({
      title: "Relatório gerado",
      description: "Um PDF com seu diagnóstico foi gerado para compartilhar com seu médico.",
      duration: 5000,
    });
  };
  
  const handleSaveDiagnosis = () => {
    toast({
      title: "Diagnóstico salvo",
      description: "Este diagnóstico foi salvo em seu histórico de saúde.",
      duration: 5000,
    });
  };
  
  const handleConsultSpecialist = () => {
    navigate('/consulta');
  };
  
  const handleReadMore = (condition: string) => {
    // Navigate to article about the condition
    navigate(`/artigos?search=${encodeURIComponent(condition)}`);
  };
  
  // Render the current step of the diagnostic flow
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'input':
        return (
          <>
            <div className="mb-4 relative">
              <Select 
                value={selectedBodyPart} 
                onValueChange={setSelectedBodyPart}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a região do corpo" />
                </SelectTrigger>
                <SelectContent>
                  {bodyParts.map((part) => (
                    <SelectItem key={part} value={part}>{part}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Descreva o que está sentindo"
                className="resize-none h-24"
              />
            </div>
            
            <div className="flex items-center text-xs text-doctordicas-text-medium mb-4 gap-1">
              <Lock size={14} className="text-doctordicas-green" />
              <span>Seus dados são protegidos e analisados com segurança</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleDiagnose}
                disabled={isSubmitting}
                className="flex-1 flex justify-center items-center gap-2 bg-doctordicas-blue text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                    <span>Diagnosticar</span>
                  </>
                )}
              </Button>
              
              {(selectedBodyPart || symptoms) && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="px-3 py-2.5 rounded-lg border border-gray-200 text-doctordicas-text-medium"
                >
                  <RotateCcw size={16} className="mr-1" />
                  Limpar
                </Button>
              )}
            </div>
          </>
        );
        
      case 'processing':
        return (
          <div className="flex flex-col items-center py-4">
            <div className="animate-pulse bg-doctordicas-blue-light text-doctordicas-blue p-4 rounded-full mb-6">
              <Activity size={36} />
            </div>
            
            <div className="flex flex-col space-y-3 w-full">
              {processingMessages.slice(0, processingStage).map((message, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">{message}</span>
                </div>
              ))}
              
              {processingStage < processingMessages.length && (
                <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                  <span className="text-sm">{processingCurrentMessage}</span>
                  <span className="animate-pulse ml-0.5">|</span>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'questions':
        return (
          <div className="py-2">
            <div className="mb-4">
              <div className="text-sm text-doctordicas-text-medium mb-2">
                Pergunta {currentQuestionIndex + 1} de {questions.length}
              </div>
              <h3 className="text-lg font-medium text-doctordicas-text-dark mb-4">
                {questions[currentQuestionIndex]?.text}
              </h3>
              
              {questions[currentQuestionIndex]?.type === 'choice' && (
                <div className="space-y-2">
                  {questions[currentQuestionIndex]?.choices?.map((choice) => (
                    <Button
                      key={choice}
                      variant="outline"
                      className="w-full justify-start text-left py-3 h-auto"
                      onClick={() => handleQuestionAnswer(choice)}
                    >
                      {choice}
                    </Button>
                  ))}
                </div>
              )}
              
              {questions[currentQuestionIndex]?.type === 'text' && (
                <form onSubmit={handleTextAnswer} className="space-y-3">
                  <Textarea
                    name="answer"
                    placeholder="Digite sua resposta aqui..."
                    className="w-full resize-none h-24"
                    required
                  />
                  <Button type="submit" className="w-full">
                    Responder e Continuar
                  </Button>
                </form>
              )}
            </div>
            
            <div className="flex justify-between items-center text-sm text-doctordicas-text-medium mt-6">
              <div className="flex items-center">
                <MessageCircle size={14} className="mr-1 text-doctordicas-blue" />
                <span>Suas respostas melhoram a precisão</span>
              </div>
              <div>
                {currentQuestionIndex + 1}/{questions.length}
              </div>
            </div>
          </div>
        );
        
      case 'results':
        return (
          <div className="space-y-4 py-2">
            <div className={`p-3 rounded-lg border ${getUrgencyColor(urgencyLevel)} flex items-center`}>
              <AlertTriangle size={18} className="mr-2" />
              <span className="font-medium">{getUrgencyText(urgencyLevel)}</span>
            </div>
            
            <div className="space-y-4 mt-3">
              <h3 className="font-semibold text-doctordicas-text-dark">Possíveis condições:</h3>
              
              {results.map((condition, index) => (
                <div key={index} className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-doctordicas-text-dark">{condition.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      condition.match > 70 ? 'bg-blue-100 text-blue-800' : 
                      condition.match > 50 ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {condition.match}% correspondência
                    </span>
                  </div>
                  <p className="text-sm text-doctordicas-text-medium mb-2">
                    {condition.description}
                  </p>
                  <div className="flex flex-wrap gap-1 text-xs">
                    {condition.specialists.map((specialist, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-0.5 rounded-full">
                        {specialist}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <Button 
                variant="default" 
                className="flex-1 bg-doctordicas-blue hover:bg-blue-600"
                onClick={handleConsultSpecialist}
              >
                <Stethoscope size={16} className="mr-1" />
                Consultar especialista
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 text-doctordicas-blue border-doctordicas-blue hover:bg-blue-50"
                onClick={() => handleReadMore(results[0]?.name || '')}
              >
                <BookOpen size={16} className="mr-1" />
                Ler mais
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleSaveDiagnosis}
              >
                <Heart size={16} className="mr-1" />
                Salvar
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleShareWithDoctor}
              >
                <Share size={16} className="mr-1" />
                Compartilhar
              </Button>
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-doctordicas-text-dark">Este diagnóstico foi útil para você?</p>
                
                {!isFeedbackSubmitted ? (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleFeedback(true)}
                    >
                      <ThumbsUp size={14} className="mr-1" />
                      Sim
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleFeedback(false)}
                    >
                      <ThumbsDown size={14} className="mr-1" />
                      Não
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-green-600">
                    Feedback enviado! Obrigado.
                  </span>
                )}
              </div>
              
              {!reminderSet ? (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-doctordicas-text-medium hover:text-doctordicas-blue"
                  onClick={handleSetReminder}
                >
                  <Bell size={16} className="mr-1" />
                  Receber lembrete em 48h para verificar melhora
                </Button>
              ) : (
                <div className="flex items-center text-sm text-green-600">
                  <Bell size={14} className="mr-1" />
                  Lembrete configurado para daqui 48 horas
                </div>
              )}
              
              <div className="flex justify-center pt-2">
                <Button variant="link" size="sm" onClick={resetForm}>
                  Iniciar novo diagnóstico
                </Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      <Card 
        className="bg-white rounded-2xl card-shadow transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-doctordicas-text-dark">
              Precisa de um diagnóstico rápido?
            </CardTitle>
            <div className="bg-doctordicas-blue-light rounded-full p-1.5 text-doctordicas-blue text-xs font-medium">
              {diagnosesCount.toLocaleString()} diagnósticos
            </div>
          </div>
          <p className="text-doctordicas-text-medium text-sm">
            Descreva seus sintomas e nossa IA conectará você com orientações personalizadas.
          </p>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>
      
      {/* Emergency Warning Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="bg-red-50 border-red-200">
          <DialogHeader>
            <DialogTitle className="text-red-700 flex items-center">
              <AlertTriangle className="mr-2" size={20} />
              Atenção: Possível Emergência Médica
            </DialogTitle>
          </DialogHeader>
          <p className="text-red-700">
            Baseado nos sintomas descritos, você pode estar enfrentando uma condição que requer atenção médica imediata.
          </p>
          <p className="font-medium text-red-800">
            Por favor considere:
          </p>
          <ul className="list-disc pl-5 text-red-700 space-y-1">
            <li>Ligar para serviços de emergência (192 - SAMU)</li>
            <li>Dirigir-se ao pronto-socorro mais próximo</li>
            <li>Contatar seu médico imediatamente</li>
          </ul>
          <p className="text-sm text-red-600 mt-2">
            Este é apenas um sistema automatizado de triagem e não substitui a avaliação médica profissional.
          </p>
          <DialogFooter>
            <Button onClick={() => setShowEmergencyDialog(false)} className="bg-red-600 hover:bg-red-700">
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiagnosticFlow;
