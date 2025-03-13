
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, UserRound, CalendarClock, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type UserInsight = {
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  ageGroup?: 'under-18' | '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';
  searchIntent?: 'information' | 'diagnosis' | 'treatment' | 'prevention' | 'other';
  searchIntentOther?: string;
  interactionTime?: number; // Time in seconds user spent on site
  visitedPages?: string[];
  hasSubmitted?: boolean;
};

const InsightStep = ({ 
  title, 
  children, 
  onComplete, 
  onSkip,
  canSkip = true
}: { 
  title: string; 
  children: React.ReactNode; 
  onComplete: () => void;
  onSkip?: () => void;
  canSkip?: boolean;
}) => (
  <div className="animate-fade-in">
    <h4 className="font-medium text-doctordicas-text-dark text-lg mb-3 flex items-center">
      {title}
    </h4>
    <div className="mb-4">
      {children}
    </div>
    <div className="flex justify-between">
      {canSkip && onSkip && (
        <button 
          onClick={onSkip}
          className="text-doctordicas-text-medium hover:text-doctordicas-text-dark text-sm transition-colors"
        >
          Pular esta etapa
        </button>
      )}
      <button
        onClick={onComplete}
        className="ml-auto bg-doctordicas-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center group"
      >
        Continuar
        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);

const UserInsightCollector: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInsights, setUserInsights] = useState<UserInsight>({});
  const [showPrompt, setShowPrompt] = useState(false);
  const { toast } = useToast();

  // Check if user has already provided insights in this session
  useEffect(() => {
    const hasProvidedInsights = localStorage.getItem('userInsightsProvided');
    const interactionTimer = setTimeout(() => {
      if (!hasProvidedInsights) {
        setShowPrompt(true);
      }
    }, 30000); // Show after 30 seconds of interaction
    
    return () => clearTimeout(interactionTimer);
  }, []);

  const openInsightCollector = () => {
    setIsVisible(true);
    setShowPrompt(false);
  };

  const closeInsightCollector = () => {
    setIsVisible(false);
  };

  const saveInsights = () => {
    // In a real app, you'd send this to your backend/analytics
    console.log('User insights collected:', userInsights);
    
    // Mark as provided in localStorage
    localStorage.setItem('userInsightsProvided', 'true');
    
    // Save locally for this session
    localStorage.setItem('userInsights', JSON.stringify(userInsights));
    
    setUserInsights({
      ...userInsights,
      hasSubmitted: true
    });
    
    toast({
      title: "Obrigado pelas informações!",
      description: "Agora podemos personalizar melhor sua experiência.",
      duration: 5000,
    });
    
    setTimeout(() => {
      closeInsightCollector();
    }, 500);
  };

  const updateInsight = (key: keyof UserInsight, value: any) => {
    setUserInsights(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      saveInsights();
    }
  };

  const handleSkip = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      closeInsightCollector();
    }
  };

  // Simple dot indicator for current step
  const StepIndicator = () => (
    <div className="flex justify-center gap-1 my-2">
      {[0, 1, 2].map((step) => (
        <div 
          key={step} 
          className={`w-2 h-2 rounded-full ${
            step === currentStep ? 'bg-doctordicas-blue' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );

  // Subtle prompt that appears after some time
  if (showPrompt) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 max-w-xs">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-doctordicas-text-dark">
              Ajude-nos a personalizar sua experiência
            </h4>
            <button 
              onClick={() => setShowPrompt(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-doctordicas-text-medium mb-3">
            Forneça algumas informações rápidas para melhorarmos seu atendimento e resultados.
          </p>
          <button
            onClick={openInsightCollector}
            className="w-full bg-doctordicas-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Personalizar minha experiência
          </button>
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-5 flex justify-between items-center border-b">
          <h3 className="font-semibold text-doctordicas-text-dark">
            {currentStep === 0 ? 'Sobre você' : 
             currentStep === 1 ? 'Faixa etária' : 'Motivo da busca'}
          </h3>
          <button 
            onClick={closeInsightCollector}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-5">
          <p className="text-doctordicas-text-medium mb-4">
            Suas respostas nos ajudam a personalizar nosso conteúdo e ferramentas para melhor atender às suas necessidades.
          </p>
          
          <StepIndicator />
          
          {currentStep === 0 && (
            <InsightStep 
              title="Como você se identifica?" 
              onComplete={handleNextStep}
              onSkip={handleSkip}
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'male', label: 'Masculino', icon: UserRound },
                  { value: 'female', label: 'Feminino', icon: UserRound },
                  { value: 'non-binary', label: 'Não-binário', icon: UserRound },
                  { value: 'prefer-not-to-say', label: 'Prefiro não dizer', icon: UserRound }
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`border rounded-lg p-3 flex flex-col items-center justify-center transition-colors ${
                      userInsights.gender === option.value
                        ? 'border-doctordicas-blue bg-doctordicas-blue/5 text-doctordicas-blue'
                        : 'border-gray-200 hover:border-gray-300 text-doctordicas-text-dark'
                    }`}
                    onClick={() => updateInsight('gender', option.value)}
                  >
                    <option.icon size={20} className="mb-1" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </InsightStep>
          )}
          
          {currentStep === 1 && (
            <InsightStep 
              title="Qual sua faixa etária?" 
              onComplete={handleNextStep}
              onSkip={handleSkip}
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'under-18', label: 'Menos de 18' },
                  { value: '18-24', label: '18-24 anos' },
                  { value: '25-34', label: '25-34 anos' },
                  { value: '35-44', label: '35-44 anos' },
                  { value: '45-54', label: '45-54 anos' },
                  { value: '55-64', label: '55-64 anos' },
                  { value: '65+', label: '65+ anos' }
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`border rounded-lg p-3 flex items-center justify-between transition-colors ${
                      userInsights.ageGroup === option.value
                        ? 'border-doctordicas-blue bg-doctordicas-blue/5 text-doctordicas-blue'
                        : 'border-gray-200 hover:border-gray-300 text-doctordicas-text-dark'
                    }`}
                    onClick={() => updateInsight('ageGroup', option.value)}
                  >
                    <span className="text-sm">{option.label}</span>
                    {userInsights.ageGroup === option.value && (
                      <div className="w-4 h-4 rounded-full bg-doctordicas-blue flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </InsightStep>
          )}
          
          {currentStep === 2 && (
            <InsightStep 
              title="O que você está buscando hoje?" 
              onComplete={handleNextStep}
              onSkip={handleSkip}
            >
              <div className="space-y-2">
                {[
                  { value: 'information', label: 'Informação geral sobre saúde' },
                  { value: 'diagnosis', label: 'Entender sintomas ou possível diagnóstico' },
                  { value: 'treatment', label: 'Opções de tratamento para uma condição' },
                  { value: 'prevention', label: 'Dicas de prevenção e bem-estar' },
                  { value: 'other', label: 'Outro motivo' }
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`w-full border rounded-lg p-3 flex items-center justify-between transition-colors ${
                      userInsights.searchIntent === option.value
                        ? 'border-doctordicas-blue bg-doctordicas-blue/5 text-doctordicas-blue'
                        : 'border-gray-200 hover:border-gray-300 text-doctordicas-text-dark'
                    }`}
                    onClick={() => updateInsight('searchIntent', option.value)}
                  >
                    <div className="flex items-center">
                      <Search size={16} className="mr-2" />
                      <span>{option.label}</span>
                    </div>
                    {userInsights.searchIntent === option.value && (
                      <div className="w-4 h-4 rounded-full bg-doctordicas-blue flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </button>
                ))}
                
                {userInsights.searchIntent === 'other' && (
                  <div className="mt-3 pl-2">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Conte-nos mais (opcional)"
                      value={userInsights.searchIntentOther || ''}
                      onChange={(e) => updateInsight('searchIntentOther', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </InsightStep>
          )}
          
          <div className="text-xs text-doctordicas-text-medium mt-4 text-center">
            Suas informações são confidenciais e usadas apenas para melhorar sua experiência
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInsightCollector;
