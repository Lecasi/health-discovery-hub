import React from 'react';
import { Link } from 'react-router-dom';
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
  Clock
} from 'lucide-react';

const SpecialtiesPage = () => {
  const specialties = [
    {
      id: 'otorrino',
      name: 'Otorrinolaringologia',
      description: 'Ouvido, nariz e garganta',
      icon: <Ear className="text-white" size={28} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Hoje às 15:30',
      price: 'R$ 89,90',
      gradient: 'from-purple-500 to-purple-600',
      path: '/agendamento/otorrino'
    },
    {
      id: 'geriatria',
      name: 'Geriatria',
      description: 'Saúde do idoso',
      icon: <Users className="text-white" size={28} />,
      availability: '2 médicos disponíveis',
      nextAvailable: 'Amanhã às 10:00',
      price: 'R$ 95,90',
      gradient: 'from-amber-500 to-orange-500',
      path: '/agendamento/geriatria'
    },
    {
      id: 'cardiologia',
      name: 'Cardiologia',
      description: 'Coração e sistema cardiovascular',
      icon: <Heart className="text-white" size={28} />,
      availability: '4 médicos disponíveis',
      nextAvailable: 'Hoje às 16:45',
      price: 'R$ 99,90',
      gradient: 'from-red-500 to-pink-500',
      path: '/agendamento/cardiologia'
    },
    {
      id: 'dermatologia',
      name: 'Dermatologia',
      description: 'Pele, cabelo e unhas',
      icon: <Eye className="text-white" size={28} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Amanhã às 14:15',
      price: 'R$ 85,90',
      gradient: 'from-green-500 to-emerald-500',
      path: '/agendamento/dermatologia'
    },
    {
      id: 'urologia',
      name: 'Urologia',
      description: 'Sistema urinário e reprodutor masculino',
      icon: <User className="text-white" size={28} />,
      availability: '2 médicos disponíveis',
      nextAvailable: 'Amanhã às 11:30',
      price: 'R$ 92,90',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/agendamento/urologia'
    },
    {
      id: 'pediatria',
      name: 'Pediatria',
      description: 'Saúde infantil',
      icon: <Baby className="text-white" size={28} />,
      availability: '5 médicos disponíveis',
      nextAvailable: 'Hoje às 17:00',
      price: 'R$ 79,90',
      gradient: 'from-pink-500 to-rose-500',
      path: '/agendamento/pediatria'
    },
    {
      id: 'endocrinologia',
      name: 'Endocrinologia',
      description: 'Hormônios e metabolismo',
      icon: <Syringe className="text-white" size={28} />,
      availability: '2 médicos disponíveis',
      nextAvailable: 'Amanhã às 09:45',
      price: 'R$ 97,90',
      gradient: 'from-indigo-500 to-purple-500',
      path: '/agendamento/endocrinologia'
    },
    {
      id: 'ginecologia',
      name: 'Ginecologia',
      description: 'Saúde da mulher',
      icon: <User className="text-white" size={28} />,
      availability: '4 médicos disponíveis',
      nextAvailable: 'Hoje às 18:30',
      price: 'R$ 89,90',
      gradient: 'from-rose-500 to-pink-500',
      path: '/agendamento/ginecologia'
    },
    {
      id: 'neurologia',
      name: 'Neurologia',
      description: 'Sistema nervoso',
      icon: <Brain className="text-white" size={28} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Amanhã às 13:15',
      price: 'R$ 105,90',
      gradient: 'from-violet-500 to-purple-500',
      path: '/agendamento/neurologia'
    },
    {
      id: 'psiquiatria',
      name: 'Psiquiatria',
      description: 'Saúde mental',
      icon: <Brain className="text-white" size={28} />,
      availability: '6 médicos disponíveis',
      nextAvailable: 'Hoje às 19:00',
      price: 'R$ 120,90',
      gradient: 'from-teal-500 to-cyan-500',
      path: '/agendamento/psiquiatria'
    },
    {
      id: 'ortopedia',
      name: 'Ortopedia e Traumatologia',
      description: 'Ossos, músculos e articulações',
      icon: <Bone className="text-white" size={28} />,
      availability: '3 médicos disponíveis',
      nextAvailable: 'Amanhã às 15:45',
      price: 'R$ 94,90',
      gradient: 'from-slate-500 to-gray-600',
      path: '/agendamento/ortopedia'
    }
  ];

  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-doctordicas-text-dark mb-4">
              Escolha sua Especialidade
            </h1>
            <p className="text-doctordicas-text-medium text-lg max-w-2xl mx-auto">
              Agende uma consulta com nossos especialistas. Atendimento online com médicos qualificados.
            </p>
          </div>

          {/* Opção Clínico Geral em destaque */}
          <div className="bg-gradient-to-r from-doctordicas-green to-green-600 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Stethoscope size={32} />
                  <h2 className="text-2xl font-bold">Clínico Geral</h2>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">IMEDIATO</span>
                </div>
                <p className="text-green-100 mb-3">Atendimento geral imediato • Tempo médio de espera: 8 min</p>
                <p className="text-2xl font-bold">R$ 49,90</p>
              </div>
              <Link to="/consulta">
                <button className="bg-white text-doctordicas-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  CONSULTAR AGORA
                </button>
              </Link>
            </div>
          </div>

          {/* Grid de Especialidades */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <Link 
                key={specialty.id}
                to={specialty.path}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {/* Header com gradiente */}
                  <div className={`bg-gradient-to-r ${specialty.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-lg">
                        {specialty.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{specialty.price}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{specialty.name}</h3>
                    <p className="text-white/90 text-sm">{specialty.description}</p>
                  </div>
                  
                  {/* Informações de disponibilidade */}
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-doctordicas-text-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{specialty.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-doctordicas-text-medium">
                        <Clock size={14} />
                        <span>Próximo horário: {specialty.nextAvailable}</span>
                      </div>
                      <button className="w-full bg-doctordicas-blue text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors group-hover:shadow-md">
                        Agendar Consulta
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialtiesPage;
