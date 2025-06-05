
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Stethoscope, 
  Heart, 
  Brain, 
  Baby, 
  Ear, 
  Users, 
  Syringe,
  User,
  Eye,
  Pill,
  Bone,
  Clock,
  Calendar,
  ChevronDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SpecialtiesPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const navigate = useNavigate();

  const specialties = [
    {
      id: 'otorrino',
      name: 'Otorrinolaringologia',
      description: 'Ouvido, nariz e garganta',
      icon: <Ear className="text-doctordicas-blue" size={20} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Hoje às 15:30',
      price: 'R$ 89,90',
    },
    {
      id: 'geriatria',
      name: 'Geriatria',
      description: 'Saúde do idoso',
      icon: <Users className="text-doctordicas-blue" size={20} />,
      availability: '2 médicos disponíveis',
      nextAvailable: 'Amanhã às 10:00',
      price: 'R$ 95,90',
    },
    {
      id: 'cardiologia',
      name: 'Cardiologia',
      description: 'Coração e sistema cardiovascular',
      icon: <Heart className="text-doctordicas-blue" size={20} />,
      availability: '4 médicos disponíveis',
      nextAvailable: 'Hoje às 16:45',
      price: 'R$ 99,90',
    },
    {
      id: 'dermatologia',
      name: 'Dermatologia',
      description: 'Pele, cabelo e unhas',
      icon: <Eye className="text-doctordicas-blue" size={20} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Amanhã às 14:15',
      price: 'R$ 85,90',
    },
    {
      id: 'urologia',
      name: 'Urologia',
      description: 'Sistema urinário e reprodutor masculino',
      icon: <User className="text-doctordicas-blue" size={20} />,
      availability: '2 médicos disponíveis',
      nextAvailable: 'Amanhã às 11:30',
      price: 'R$ 92,90',
    },
    {
      id: 'pediatria',
      name: 'Pediatria',
      description: 'Saúde infantil',
      icon: <Baby className="text-doctordicas-blue" size={20} />,
      availability: '5 médicos disponíveis',
      nextAvailable: 'Hoje às 17:00',
      price: 'R$ 79,90',
    },
    {
      id: 'endocrinologia',
      name: 'Endocrinologia',
      description: 'Hormônios e metabolismo',
      icon: <Syringe className="text-doctordicas-blue" size={20} />,
      availability: '2 médicos disponíveis',
      nextAvailable: 'Amanhã às 09:45',
      price: 'R$ 97,90',
    },
    {
      id: 'ginecologia',
      name: 'Ginecologia',
      description: 'Saúde da mulher',
      icon: <User className="text-doctordicas-blue" size={20} />,
      availability: '4 médicos disponíveis',
      nextAvailable: 'Hoje às 18:30',
      price: 'R$ 89,90',
    },
    {
      id: 'neurologia',
      name: 'Neurologia',
      description: 'Sistema nervoso',
      icon: <Brain className="text-doctordicas-blue" size={20} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Amanhã às 13:15',
      price: 'R$ 105,90',
    },
    {
      id: 'psiquiatria',
      name: 'Psiquiatria',
      description: 'Saúde mental',
      icon: <Brain className="text-doctordicas-blue" size={20} />,
      availability: '6 médicos disponíveis',
      nextAvailable: 'Hoje às 19:00',
      price: 'R$ 120,90',
    },
    {
      id: 'ortopedia',
      name: 'Ortopedia e Traumatologia',
      description: 'Ossos, músculos e articulações',
      icon: <Bone className="text-doctordicas-blue" size={20} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Amanhã às 15:45',
      price: 'R$ 94,90',
    }
  ];

  const getSelectedSpecialtyData = () => {
    return specialties.find(spec => spec.id === selectedSpecialty);
  };

  const handleSchedule = () => {
    if (selectedSpecialty) {
      navigate(`/agendamento/${selectedSpecialty}`);
    }
  };

  const selectedData = getSelectedSpecialtyData();

  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-doctordicas-text-dark mb-4">
              Escolha sua Especialidade
            </h1>
            <p className="text-doctordicas-text-medium text-lg">
              Selecione a especialidade médica para agendar sua consulta
            </p>
          </div>

          {/* Clínico Geral em destaque */}
          <div className="bg-gradient-to-r from-doctordicas-green to-green-600 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Stethoscope size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Clínico Geral</h2>
                  <p className="text-green-100">Atendimento imediato</p>
                  <p className="text-2xl font-bold mt-1">R$ 49,90</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/consulta')}
                className="bg-white text-doctordicas-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                CONSULTAR AGORA
              </button>
            </div>
          </div>

          {/* Seletor de Especialidade */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-doctordicas-text-dark mb-3">
                Ou escolha uma especialidade para agendamento:
              </label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full h-14 text-left bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors">
                  <SelectValue placeholder="Selecione uma especialidade médica" />
                </SelectTrigger>
                <SelectContent className="max-h-64 bg-white">
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.id} value={specialty.id} className="py-3">
                      <div className="flex items-center gap-3">
                        {specialty.icon}
                        <div>
                          <div className="font-medium">{specialty.name}</div>
                          <div className="text-sm text-gray-500">{specialty.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Informações da especialidade selecionada */}
            {selectedData && (
              <div className="border-t pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {selectedData.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-doctordicas-text-dark">
                      {selectedData.name}
                    </h3>
                    <p className="text-doctordicas-text-medium">{selectedData.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-doctordicas-text-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{selectedData.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-doctordicas-text-medium">
                    <Clock size={14} />
                    <span>Próximo horário: {selectedData.nextAvailable}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-doctordicas-text-dark">
                    {selectedData.price}
                  </div>
                  <button 
                    onClick={handleSchedule}
                    className="bg-doctordicas-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Calendar size={18} />
                    Agendar Consulta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialtiesPage;
