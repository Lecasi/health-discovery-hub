
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ExamChatProps {
  results: any;
}

const ExamChat: React.FC<ExamChatProps> = ({ results }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Estou aqui para ajudar você a entender seus resultados de exame. O que você gostaria de saber?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const suggestedQuestions = [
    "O que significa meu nível de glicose estar alto?",
    "Como posso reduzir meu colesterol LDL?",
    "Estes resultados indicam algum problema sério?",
    "Quando devo repetir estes exames?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsAiTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAiResponse(inputValue, results);
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsAiTyping(false);
    }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s for realism
  };

  const handleSuggestedQuestion = (question: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsAiTyping(true);
    
    setTimeout(() => {
      const aiResponse = generateAiResponse(question, results);
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsAiTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  const handleFeedback = (liked: boolean) => {
    toast({
      title: liked ? "Feedback positivo enviado" : "Feedback negativo enviado",
      description: liked 
        ? "Obrigado por nos informar que esta resposta foi útil!" 
        : "Agradecemos seu feedback. Vamos trabalhar para melhorar.",
    });
  };

  // Generate mock AI responses based on the question
  const generateAiResponse = (question: string, results: any): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('glicose') || lowerQuestion.includes('açúcar')) {
      return `Seu nível de glicose está em 108 mg/dL, que é levemente elevado comparado com a faixa de referência (70-99 mg/dL). Este valor é considerado como "pré-diabetes" e sugere que você pode estar em risco de desenvolver diabetes no futuro. \n\nRecomendações:\n• Reduzir o consumo de açúcares e carboidratos refinados\n• Aumentar a atividade física\n• Considerar uma avaliação com endocrinologista\n• Monitorar sua glicose regularmente`;
    }
    
    if (lowerQuestion.includes('colesterol') || lowerQuestion.includes('ldl')) {
      return `Seu colesterol LDL (o "colesterol ruim") está em 145 mg/dL, acima do valor recomendado de <130 mg/dL. O colesterol elevado aumenta o risco de doenças cardiovasculares ao longo do tempo.\n\nPara reduzir seu colesterol LDL, você pode:\n• Adotar uma dieta com menos gorduras saturadas (carnes gordas, frituras)\n• Aumentar o consumo de fibras (frutas, vegetais, grãos integrais)\n• Praticar exercícios regularmente (30 minutos, 5x por semana)\n• Perder peso, se estiver acima do ideal\n• Em alguns casos, medicamentos podem ser necessários (estatinas)`;
    }
    
    if (lowerQuestion.includes('problema') || lowerQuestion.includes('sério') || lowerQuestion.includes('grave')) {
      return `Seus resultados não indicam nenhum problema gravemente sério ou emergencial. Você tem valores levemente elevados de glicose (108 mg/dL) e colesterol LDL (145 mg/dL), que são condições comuns que podem ser gerenciadas com mudanças no estilo de vida e acompanhamento médico regular.\n\nEstes valores são sinais iniciais que seu corpo está mostrando e que merecem atenção para prevenir o desenvolvimento de condições como diabetes tipo 2 e doenças cardiovasculares no futuro.`;
    }
    
    if (lowerQuestion.includes('repetir') || lowerQuestion.includes('quando') || lowerQuestion.includes('próximo')) {
      return `Para seus níveis atuais, o recomendado seria repetir estes exames em aproximadamente 3-6 meses para monitorar se as alterações nos níveis de glicose e colesterol LDL estão respondendo a mudanças no estilo de vida ou se estão progredindo.\n\nSe você implementar mudanças significativas na dieta e exercícios, pode ser interessante verificar em 3 meses. Caso contrário, 6 meses seria um intervalo adequado para reavaliação. Sempre siga a orientação específica do seu médico, pois ele conhece seu histórico completo.`;
    }
    
    // Default response for other questions
    return `Baseado nos seus resultados, posso dizer que você tem alguns valores que merecem atenção, principalmente a glicose (108 mg/dL) e o colesterol LDL (145 mg/dL), que estão levemente acima dos valores de referência.\n\nEstes resultados sugerem que pequenas mudanças no estilo de vida podem ser benéficas, como melhorar a alimentação e aumentar a atividade física. É recomendável discutir estes resultados com seu médico na próxima consulta, mas não representam uma emergência médica.`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user' 
                    ? 'bg-doctordicas-blue text-white' 
                    : 'bg-gray-100 text-doctordicas-text-dark'
                }`}
              >
                <div className="flex items-center mb-2">
                  {message.sender === 'ai' ? (
                    <Bot className="h-5 w-5 mr-2" />
                  ) : (
                    <User className="h-5 w-5 mr-2" />
                  )}
                  <span className="font-medium">
                    {message.sender === 'ai' ? 'Assistente Médico' : 'Você'}
                  </span>
                  <span className="text-xs ml-auto opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <div className="whitespace-pre-line">
                  {message.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== message.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                
                {message.sender === 'ai' && (
                  <div className="mt-2 flex justify-end space-x-2">
                    <button 
                      onClick={() => handleFeedback(true)}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label="Resposta útil"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleFeedback(false)}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label="Resposta não útil"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  <span className="font-medium">Assistente Médico</span>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {messages.length <= 2 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium flex items-center text-doctordicas-text-dark mb-2">
            <Lightbulb className="h-4 w-4 mr-1 text-doctordicas-yellow" />
            Perguntas sugeridas
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="bg-gray-100 hover:bg-gray-200 text-doctordicas-text-dark text-sm py-2 px-3 rounded-full transition-colors"
                disabled={isAiTyping}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="mt-auto">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua pergunta sobre os exames..."
            className="flex-1"
            disabled={isAiTyping}
          />
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || isAiTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Este assistente fornece informações gerais. Para diagnósticos, consulte sempre um médico.
      </p>
    </div>
  );
};

export default ExamChat;
