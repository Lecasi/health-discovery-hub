
import React from 'react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/card';
import { 
  Heart, Activity, Weight, Ruler, 
  Thermometer, Droplets, EyeOff, Plus, CloudRain, Wind 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileHistory = () => {
  // Mock health data
  const vitalSigns = [
    { 
      id: 'pressure', 
      name: 'Pressão Arterial', 
      value: '120/80 mmHg', 
      status: 'normal',
      date: '15/05/2023',
      icon: Activity 
    },
    { 
      id: 'heart-rate', 
      name: 'Frequência Cardíaca', 
      value: '72 bpm', 
      status: 'normal',
      date: '15/05/2023',
      icon: Heart 
    },
    { 
      id: 'temperature', 
      name: 'Temperatura', 
      value: '36.5 °C', 
      status: 'normal',
      date: '15/05/2023',
      icon: Thermometer 
    },
    { 
      id: 'weight', 
      name: 'Peso', 
      value: '75 kg', 
      status: 'normal',
      date: '10/05/2023',
      icon: Weight 
    },
    { 
      id: 'height', 
      name: 'Altura', 
      value: '175 cm', 
      status: 'normal',
      date: '10/05/2023',
      icon: Ruler 
    },
    { 
      id: 'glucose', 
      name: 'Glicose', 
      value: '95 mg/dL', 
      status: 'normal',
      date: '12/05/2023',
      icon: Droplets 
    },
  ];

  const conditions = [
    {
      id: '1',
      name: 'Rinite Alérgica',
      status: 'Crônica',
      since: '2018',
      icon: CloudRain,
      description: 'Sensibilidade a pólen e poeira',
      medication: 'Loratadina 10mg quando necessário'
    },
    {
      id: '2',
      name: 'Asma leve',
      status: 'Controlada',
      since: '2020',
      icon: Wind,
      description: 'Episódios ocasionais',
      medication: 'Salbutamol em caso de crise'
    }
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'elevado':
        return 'text-amber-600 bg-amber-50';
      case 'baixo':
        return 'text-blue-600 bg-blue-50';
      case 'crítico':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-4">Histórico de Saúde</h2>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r mb-6">
        <div className="flex">
          <EyeOff className="h-5 w-5 text-yellow-500 mr-3 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Privacidade dos dados</h3>
            <p className="text-sm text-yellow-700">
              Seus dados de saúde são confidenciais e criptografados. Somente você e os profissionais 
              de saúde que você autorizar podem acessá-los.
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="vitals" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="vitals" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            Sinais Vitais
          </TabsTrigger>
          <TabsTrigger value="conditions" className="flex items-center gap-1">
            <CloudRain className="h-4 w-4" />
            Condições
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vitals">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vitalSigns.map((sign) => (
              <div key={sign.id} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-doctordicas-blue-light p-2 rounded-full mr-3">
                    <sign.icon className="h-5 w-5 text-doctordicas-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-doctordicas-text-dark">{sign.name}</h3>
                    <p className="text-xs text-doctordicas-text-medium">Atualizado em {sign.date}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold text-doctordicas-text-dark">{sign.value}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(sign.status)}`}>
                    {sign.status}
                  </span>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="border-dashed h-full min-h-[120px] flex flex-col items-center justify-center">
              <Plus className="h-6 w-6 mb-2" />
              <span>Adicionar novo registro</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="conditions">
          {conditions.length > 0 ? (
            <div className="space-y-4">
              {conditions.map((condition) => (
                <div key={condition.id} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-doctordicas-blue-light p-2 rounded-full">
                        <condition.icon className="h-5 w-5 text-doctordicas-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-doctordicas-text-dark">{condition.name}</h3>
                        <p className="text-xs text-doctordicas-text-medium">Desde {condition.since}</p>
                      </div>
                    </div>
                    <div>
                      <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full">
                        {condition.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pl-12">
                    <p className="text-sm text-doctordicas-text-medium">
                      <span className="font-medium">Descrição:</span> {condition.description}
                    </p>
                    <p className="text-sm text-doctordicas-text-medium">
                      <span className="font-medium">Medicação:</span> {condition.medication}
                    </p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full border-dashed">
                <Plus className="h-4 w-4 mr-2" />
                <span>Adicionar condição</span>
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CloudRain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-doctordicas-text-dark mb-1">
                Nenhuma condição registrada
              </h3>
              <p className="text-sm text-doctordicas-text-medium mb-4">
                Registre suas condições de saúde para um melhor acompanhamento.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                <span>Adicionar condição</span>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div>
        <h3 className="font-semibold text-doctordicas-text-dark mb-3">Dicas para um histórico completo</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <li className="flex items-start">
            <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
              <Activity className="h-3.5 w-3.5 text-green-600" />
            </div>
            <span className="text-doctordicas-text-medium">Atualize seus sinais vitais regularmente</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
              <Activity className="h-3.5 w-3.5 text-green-600" />
            </div>
            <span className="text-doctordicas-text-medium">Registre todas as condições de saúde</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
              <Activity className="h-3.5 w-3.5 text-green-600" />
            </div>
            <span className="text-doctordicas-text-medium">Adicione medicamentos que usa regularmente</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
              <Activity className="h-3.5 w-3.5 text-green-600" />
            </div>
            <span className="text-doctordicas-text-medium">Mantenha histórico familiar atualizado</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileHistory;
