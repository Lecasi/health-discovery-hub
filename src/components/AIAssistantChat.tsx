
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Clock, ThumbsUp, ThumbsDown, Loader, ArrowRight, AlertTriangle, Download, Plus, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

// Types for our conversation
type MessageType = 'user' | 'ai' | 'system' | 'urgency';
type RecommendationType = 'article' | 'doctor' | 'widget';

interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  specialty?: string;
  availability?: string;
}

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  recommendations?: Recommendation[];
  liked?: boolean;
  disliked?: boolean;
  isUrgent?: boolean;
}

const mockDoctors = [
  {
    id: 'd1',
    type: 'doctor' as RecommendationType,
    title: 'Dra. Carla Mendes',
    description: 'Neurologista especializada em cefaleias e enxaquecas',
    imageUrl: 'https://ui-avatars.com/api/?name=Carla+Mendes&background=0D8ABC&color=fff',
    specialty: 'Neurologia',
    availability: 'Hoje, 15:30',
    link: '/consulta/agendar/d1',
  },
  {
    id: 'd2',
    type: 'doctor' as RecommendationType,
    title: 'Dr. Ricardo Almeida',
    description: 'Clínico geral com 15 anos de experiência',
    imageUrl: 'https://ui-avatars.com/api/?name=Ricardo+Almeida&background=0D8ABC&color=fff',
    specialty: 'Clínica Médica',
    availability: 'Amanhã, 10:00',
    link: '/consulta/agendar/d2',
  },
];

const mockArticles = [
  {
    id: 'a1',
    type: 'article' as RecommendationType,
    title: 'Entendendo as enxaquecas: causas e tratamentos',
    description: 'Artigo completo sobre causas, sintomas e tratamentos para enxaquecas e dores de cabeça frequentes.',
    imageUrl: '/placeholder.svg',
    link: '/artigos/entendendo-enxaquecas',
  },
  {
    id: 'a2',
    type: 'article' as RecommendationType,
    title: 'Dores de cabeça: quando se preocupar?',
    description: 'Aprenda a identificar sinais de alerta em dores de cabeça que exigem atenção médica imediata.',
    imageUrl: '/placeholder.svg',
    link: '/artigos/dores-cabeca-sinais-alerta',
  },
  {
    id: 'a3',
    type: 'article' as RecommendationType,
    title: 'Alimentação e dores de cabeça: qual a relação?',
    description: 'Descubra como sua dieta pode influenciar na frequência e intensidade das dores de cabeça.',
    imageUrl: '/placeholder.svg',
    link: '/artigos/alimentacao-dores-cabeca',
  },
];

const mockWidgets = [
  {
    id: 'w1',
    type: 'widget' as RecommendationType,
    title: 'Diário de dores de cabeça',
    description: 'Registre frequência, intensidade e gatilhos para identificar padrões',
    link: '/ferramentas/diario-dores',
  },
];

const COMMON_TOPICS = {
  'Dor de cabeça': {
    response: 'Dores de cabeça são muito comuns e podem ter diversas causas. As mais frequentes são tensionais (relacionadas ao estresse e tensão muscular), enxaquecas (dores pulsáteis, geralmente de um lado da cabeça) e cefaleias em salvas (dores intensas geralmente ao redor de um olho).\n\nPara dores de cabeça ocasionais, recomenda-se repouso em ambiente tranquilo, hidratação adequada e, se necessário, analgésicos de venda livre. Técnicas de relaxamento e compressas frias também podem ajudar.\n\nSe as dores forem frequentes (mais de 2 vezes por semana) ou acompanhadas de outros sintomas como febre, rigidez no pescoço, confusão mental ou fraqueza em um lado do corpo, é importante consultar um médico urgentemente.',
    articles: mockArticles,
    doctors: [mockDoctors[0]],
    widgets: [mockWidgets[0]],
  },
  'Baixar o colesterol': {
    response: 'O colesterol alto (hipercolesterolemia) é um importante fator de risco para doenças cardiovasculares. Para reduzir o colesterol de forma natural, recomenda-se: aumentar a ingestão de fibras solúveis (aveia, legumes, frutas), incluir gorduras saudáveis na dieta (azeite, peixes, oleaginosas), praticar exercícios físicos regularmente (30 minutos, 5 vezes por semana) e reduzir alimentos ultraprocessados.\n\nAlgumas mudanças dietéticas específicas incluem: substituir carnes vermelhas por peixes e aves, preferir laticínios desnatados, aumentar consumo de vegetais e reduzir açúcares refinados.\n\nQuando as mudanças no estilo de vida não são suficientes, seu médico pode prescrever medicamentos como estatinas, que ajudam a controlar o colesterol. É importante fazer exames regulares para monitorar seus níveis.',
    articles: [],
    doctors: [mockDoctors[1]],
    widgets: [],
  },
  'Cansaço constante': {
    response: 'Sentir-se constantemente cansado pode ser sinal de diversos problemas de saúde. Causas comuns incluem: falta de sono de qualidade, estresse crônico, sedentarismo, alimentação inadequada e desidratação. Condições médicas como anemia, hipotireoidismo, diabetes e depressão também podem manifestar-se como fadiga persistente.\n\nAções iniciais recomendadas: estabelecer rotina regular de sono (7-8 horas), praticar atividade física moderada regularmente, manter hidratação adequada e adotar alimentação balanceada com ênfase em alimentos não processados.\n\nSe o cansaço persistir por mais de duas semanas mesmo com mudanças no estilo de vida, é recomendável consultar um médico para investigação. Exames de sangue para verificar função da tireoide, níveis de ferro e glicose podem identificar causas tratáveis.',
    articles: [],
    doctors: [mockDoctors[1]],
    widgets: [],
  },
  'Vitamina D baixa': {
    response: 'A deficiência de vitamina D é extremamente comum, afetando cerca de 1 bilhão de pessoas globalmente. Esta vitamina é essencial para a saúde óssea, função imunológica e saúde cardiovascular. Os principais sintomas de deficiência incluem fadiga, dores musculares e ósseas, maior suscetibilidade a infecções e, em casos graves, osteoporose.\n\nA principal fonte natural de vitamina D é a exposição solar (15-30 minutos diários, preferencialmente antes das 10h ou após as 16h). Fontes alimentares incluem peixes gordurosos (salmão, sardinha), gema de ovo e alimentos fortificados como leites vegetais.\n\nQuando diagnosticada a deficiência, geralmente são recomendados suplementos na forma de colecalciferol (D3). A dosagem e duração do tratamento variam conforme a gravidade da deficiência e devem ser determinadas pelo médico após exame de sangue específico (25-hidroxivitamina D).',
    articles: [],
    doctors: [mockDoctors[1]],
    widgets: [],
  },
};

const AIAssistantChat: React.FC<{ initialQuery?: string | null }> = ({ initialQuery }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeUsers, setActiveUsers] = useState(486);
  const [remainingQuestions, setRemainingQuestions] = useState(user ? 15 : 5);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  // Scroll to bottom effect
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set initial message
  useEffect(() => {
    const initialMessage: Message = {
      id: 'initial',
      type: 'ai',
      content: 'Olá! Como posso ajudar você hoje? Estou aqui para responder suas dúvidas de saúde e bem-estar.',
      timestamp: new Date(),
      recommendations: []
    };
    setMessages([initialMessage]);

    // Simulate fluctuations in active users
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 10) - 4; // Between -4 and +5
        return Math.max(450, prev + change);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle initial query if provided
  useEffect(() => {
    if (initialQuery) {
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleInitialQuery = (query: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    processAIResponse(query);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Don't allow new messages while AI is typing
    if (isTyping) return;

    // Check remaining questions
    if (remainingQuestions <= 0) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de perguntas. Faça login para continuar.",
        duration: 5000,
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    processAIResponse(query);
    setQuery('');
    setRemainingQuestions(prev => prev - 1);
  };

  const processAIResponse = (userQuery: string) => {
    setIsTyping(true);
    
    // Show the typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };
    
    setMessages(prev => [...prev, typingMessage]);
    
    // Check if this is an emergency query
    const urgentKeywords = ['desmaio', 'inconsciência', 'não respira', 'parou de respirar', 'acidente grave', 'sangramento intenso', 'dor no peito forte'];
    const isUrgent = urgentKeywords.some(keyword => userQuery.toLowerCase().includes(keyword.toLowerCase()));
    
    // Simulate AI response delay (1.5-3 seconds)
    setTimeout(() => {
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      if (isUrgent) {
        // Add urgency message
        const urgencyMessage: Message = {
          id: `urgency-${Date.now()}`,
          type: 'urgency',
          content: 'Os sintomas que você mencionou podem indicar uma condição que requer atenção médica imediata. Por favor, entre em contato com serviços de emergência (SAMU 192 ou vá ao pronto-socorro mais próximo).',
          timestamp: new Date(),
          isUrgent: true,
        };
        setMessages(prev => [...prev, urgencyMessage]);
      } else {
        // Generate normal response
        let aiResponse = '';
        let recommendations: Recommendation[] = [];
        
        // Check if the query matches a common topic
        const topicMatch = Object.entries(COMMON_TOPICS).find(([topic]) => 
          userQuery.toLowerCase().includes(topic.toLowerCase())
        );
        
        if (topicMatch) {
          const [topic, content] = topicMatch;
          aiResponse = content.response;
          
          // Combine all recommendations
          if (content.articles) recommendations = [...recommendations, ...content.articles];
          if (content.doctors) recommendations = [...recommendations, ...content.doctors];
          if (content.widgets) recommendations = [...recommendations, ...content.widgets];
        } else {
          // Generic response for unmatched topics
          aiResponse = `Entendo sua questão sobre "${userQuery}". \n\nEmbora não tenha informações específicas sobre este tópico em minha base de conhecimento atual, posso recomendar que você consulte um de nossos especialistas que poderão fornecer orientação personalizada. \n\nAlternativamente, você pode reformular sua pergunta ou escolher um tópico relacionado à saúde para que eu possa ajudá-lo melhor.`;
          
          // Add some generic recommendations
          recommendations = [mockDoctors[1]]; // Generic doctor recommendation
        }
        
        // Add AI response message
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: aiResponse,
          timestamp: new Date(),
          recommendations: recommendations,
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // Show feedback prompt after delay
        setTimeout(() => {
          setShowFeedback(true);
        }, 2000);
      }
      
      setIsTyping(false);
    }, isUrgent ? 1000 : Math.random() * 1500 + 1500); // Faster response for urgent cases
  };

  const handleFeedback = (liked: boolean) => {
    // Update the last AI message with feedback
    setMessages(prev => {
      const newMessages = [...prev];
      const lastAiMessageIndex = [...newMessages].reverse().findIndex(msg => msg.type === 'ai');
      if (lastAiMessageIndex !== -1) {
        const actualIndex = newMessages.length - 1 - lastAiMessageIndex;
        newMessages[actualIndex] = {
          ...newMessages[actualIndex],
          liked: liked,
          disliked: !liked,
        };
      }
      return newMessages;
    });
    
    setShowFeedback(false);
    
    toast({
      title: liked ? "Feedback positivo" : "Feedback negativo",
      description: liked ? "Obrigado pelo seu feedback positivo!" : "Lamentamos que a resposta não tenha sido útil.",
      duration: 3000,
    });
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuerySubmit(e);
    }
  };

  const submitDetailedFeedback = () => {
    if (!feedbackMessage.trim()) return;
    
    toast({
      title: "Feedback enviado",
      description: "Obrigado por ajudar a melhorar nosso assistente!",
      duration: 3000,
    });
    
    setFeedbackMessage('');
    setShowFeedback(false);
  };

  const exportConversation = () => {
    // Create text version of conversation
    let conversationText = "Histórico de Conversa - Assistente de Saúde DoctorDicas\n\n";
    
    messages.forEach(msg => {
      if (msg.type === 'user') {
        conversationText += `Você (${new Date(msg.timestamp).toLocaleString()}):\n${msg.content}\n\n`;
      } else if (msg.type === 'ai') {
        conversationText += `Assistente (${new Date(msg.timestamp).toLocaleString()}):\n${msg.content}\n\n`;
        
        if (msg.recommendations && msg.recommendations.length > 0) {
          conversationText += "Recomendações:\n";
          msg.recommendations.forEach(rec => {
            conversationText += `- ${rec.title}: ${rec.description}\n`;
          });
          conversationText += "\n";
        }
      } else if (msg.type === 'urgency') {
        conversationText += `ALERTA (${new Date(msg.timestamp).toLocaleString()}):\n${msg.content}\n\n`;
      }
    });
    
    // Create blob and download
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-saude-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversa exportada",
      description: "Seu histórico foi salvo como arquivo de texto.",
      duration: 3000,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-[70vh] md:h-[80vh]">
      {/* Header with stats */}
      <div className="bg-doctordicas-blue-light p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-doctordicas-blue rounded-full p-2 mr-3">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-doctordicas-text-dark">Assistente de Saúde</h3>
              <div className="flex items-center text-xs text-doctordicas-text-medium">
                <Clock size={12} className="mr-1" />
                <span>{new Date().toLocaleString('pt-BR', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center text-xs bg-green-100 text-doctordicas-green px-2 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-doctordicas-green mr-1 animate-pulse"></div>
              <span>{activeUsers} usuários ativos</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs" 
              onClick={exportConversation}
            >
              <Download size={14} className="mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="message-container">
        {messages.map((message, index) => (
          <div key={message.id} className={`${message.type === 'user' ? 'ml-auto' : 'mr-auto'} ${message.type === 'user' ? 'max-w-[80%] md:max-w-[70%]' : 'max-w-[90%] md:max-w-[80%]'}`}>
            {message.type === 'user' ? (
              <div className="flex items-start justify-end mb-2">
                <div className="bg-doctordicas-blue-light text-doctordicas-text-dark p-3 rounded-lg rounded-tr-none">
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
                <div className="bg-blue-500 rounded-full p-1 ml-2 flex-shrink-0">
                  <User size={16} className="text-white" />
                </div>
              </div>
            ) : message.type === 'urgency' ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-2">
                <div className="flex items-start">
                  <AlertTriangle size={20} className="text-red-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-red-700 mb-1">ATENÇÃO - SITUAÇÃO DE EMERGÊNCIA</h4>
                    <p className="text-red-700">{message.content}</p>
                    <div className="mt-3 bg-red-100 p-3 rounded flex items-center justify-between">
                      <span className="font-medium text-red-700">SAMU: 192</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Ligar agora
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : message.isTyping ? (
              <div className="flex items-start mb-2">
                <div className="bg-doctordicas-blue rounded-full p-1 mr-2 flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-gray-100 text-doctordicas-text-dark p-3 rounded-lg rounded-tl-none flex items-center">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start mb-2">
                  <div className="bg-doctordicas-blue rounded-full p-1 mr-2 flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 text-doctordicas-text-dark p-3 rounded-lg rounded-tl-none">
                    <p className="whitespace-pre-line">{message.content}</p>
                    
                    {/* Feedback buttons */}
                    {(message.liked !== undefined || message.disliked !== undefined) && (
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        {message.liked ? 
                          <span className="flex items-center text-green-600">
                            <ThumbsUp size={12} className="mr-1" /> Feedback positivo
                          </span> : 
                          message.disliked ? 
                          <span className="flex items-center text-red-600">
                            <ThumbsDown size={12} className="mr-1" /> Feedback negativo
                          </span> : null
                        }
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Recommendations section */}
                {message.recommendations && message.recommendations.length > 0 && (
                  <div className="pl-8">
                    {/* Articles */}
                    {message.recommendations.filter(r => r.type === 'article').length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-doctordicas-text-dark mb-2">Artigos recomendados:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {message.recommendations.filter(r => r.type === 'article').map((article) => (
                            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                              <div className="flex">
                                <div className="w-1/4 bg-gray-200">
                                  {article.imageUrl && (
                                    <img 
                                      src={article.imageUrl} 
                                      alt={article.title} 
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <CardContent className="p-3 w-3/4">
                                  <h5 className="font-medium text-sm line-clamp-2">{article.title}</h5>
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.description}</p>
                                  <a 
                                    href={article.link} 
                                    className="text-xs text-doctordicas-blue flex items-center mt-2 hover:underline"
                                  >
                                    Ler artigo <ArrowRight size={12} className="ml-1" />
                                  </a>
                                </CardContent>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Doctors */}
                    {message.recommendations.filter(r => r.type === 'doctor').length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-doctordicas-text-dark mb-2">Especialistas disponíveis:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {message.recommendations.filter(r => r.type === 'doctor').map((doctor) => (
                            <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                              <div className="flex p-3">
                                <div className="mr-3">
                                  <div className="w-12 h-12 rounded-full overflow-hidden">
                                    {doctor.imageUrl && (
                                      <img 
                                        src={doctor.imageUrl} 
                                        alt={doctor.title} 
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-medium text-sm">{doctor.title}</h5>
                                  <p className="text-xs text-gray-500">{doctor.specialty}</p>
                                  <div className="flex items-center mt-1">
                                    <div className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full mr-2">
                                      {doctor.availability}
                                    </div>
                                    <a 
                                      href={doctor.link} 
                                      className="text-xs text-doctordicas-blue hover:underline"
                                    >
                                      Agendar
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Widgets */}
                    {message.recommendations.filter(r => r.type === 'widget').length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-doctordicas-text-dark mb-2">Ferramentas úteis:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {message.recommendations.filter(r => r.type === 'widget').map((widget) => (
                            <Card key={widget.id} className="overflow-hidden hover:shadow-md transition-shadow">
                              <CardContent className="p-3">
                                <h5 className="font-medium text-sm">{widget.title}</h5>
                                <p className="text-xs text-gray-500 mt-1">{widget.description}</p>
                                <a 
                                  href={widget.link} 
                                  className="text-xs bg-doctordicas-blue-light text-doctordicas-blue px-2 py-1 rounded mt-2 inline-block hover:bg-doctordicas-blue hover:text-white transition-colors"
                                >
                                  Abrir ferramenta
                                </a>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {message.type !== 'user' && !message.isTyping && (
              <p className="text-xs text-gray-400 ml-8 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            )}
          </div>
        ))}
        
        {/* Show feedback UI */}
        {showFeedback && (
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 animate-fade-in ml-8">
            <p className="text-sm text-gray-600 mb-2">Esta resposta foi útil?</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center hover:bg-green-50 hover:text-green-600 transition-colors"
                onClick={() => handleFeedback(true)}
              >
                <ThumbsUp size={14} className="mr-1" />
                Sim
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center hover:bg-red-50 hover:text-red-600 transition-colors"
                onClick={() => handleFeedback(false)}
              >
                <ThumbsDown size={14} className="mr-1" />
                Não
              </Button>
            </div>
            <div className="mt-3">
              <Textarea
                placeholder="Algum comentário adicional? (opcional)"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="text-sm w-full resize-none"
                rows={2}
              />
              <div className="flex justify-between mt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500"
                  onClick={() => setShowFeedback(false)}
                >
                  <X size={14} className="mr-1" />
                  Fechar
                </Button>
                <Button 
                  size="sm"
                  onClick={submitDetailedFeedback}
                  disabled={!feedbackMessage.trim()}
                >
                  Enviar feedback
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Element for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleQuerySubmit} className="flex items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              className="resize-none px-4 py-3 pr-10 rounded-xl border-gray-200 focus:border-doctordicas-blue focus:ring-doctordicas-blue min-h-[60px] max-h-[120px]"
              placeholder="Digite sua dúvida de saúde..."
              disabled={isTyping}
            />
            <div className="absolute right-3 bottom-3">
              <span className="text-xs text-gray-400">{remainingQuestions} perguntas restantes</span>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!query.trim() || isTyping}
            className={`rounded-xl h-[60px] w-[60px] p-0 flex items-center justify-center ${
              !query.trim() || isTyping ? 'opacity-70' : 'bg-doctordicas-blue hover:bg-blue-600'
            }`}
            aria-label="Enviar mensagem"
          >
            {isTyping ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <Send size={20} className="mr-0" />
            )}
          </Button>
        </form>
        
        {/* Suggestion chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white text-doctordicas-text-medium hover:bg-doctordicas-blue-light hover:text-doctordicas-blue transition-colors text-xs"
            onClick={() => setQuery(prev => prev ? prev + ' exercícios para dor nas costas' : 'exercícios para dor nas costas')}
          >
            <Plus size={12} className="mr-1" />
            Exercícios para dor nas costas
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white text-doctordicas-text-medium hover:bg-doctordicas-blue-light hover:text-doctordicas-blue transition-colors text-xs"
            onClick={() => setQuery(prev => prev ? prev + ' sintomas de anemia' : 'sintomas de anemia')}
          >
            <Plus size={12} className="mr-1" />
            Sintomas de anemia
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white text-doctordicas-text-medium hover:bg-doctordicas-blue-light hover:text-doctordicas-blue transition-colors text-xs"
            onClick={() => setQuery(prev => prev ? prev + ' como dormir melhor' : 'como dormir melhor')}
          >
            <Plus size={12} className="mr-1" />
            Como dormir melhor
          </Button>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-gray-50 p-3 text-xs text-center text-gray-500 border-t border-gray-200">
        Este assistente fornece informações gerais sobre saúde e não substitui consulta médica profissional.
        Em caso de emergência, procure ajuda médica imediatamente.
      </div>
    </div>
  );
};

export default AIAssistantChat;
