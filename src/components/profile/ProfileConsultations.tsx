
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Exemplo de dados de consultas
const consultations = [
  {
    id: 1,
    doctor: 'Dra. Maria Santos',
    specialty: 'Cardiologia',
    date: '2023-10-15',
    time: '14:30',
    status: 'scheduled', // agendada
    notes: 'Trazer exames recentes de sangue e eletrocardiograma.'
  },
  {
    id: 2,
    doctor: 'Dr. Paulo Mendes',
    specialty: 'Neurologia',
    date: '2023-09-28',
    time: '10:15',
    status: 'completed', // concluída
    notes: 'Paciente relatou melhora nos sintomas após início da medicação.'
  },
  {
    id: 3,
    doctor: 'Dra. Carla Oliveira',
    specialty: 'Psiquiatria',
    date: '2023-08-10',
    time: '16:00',
    status: 'cancelled', // cancelada
    notes: 'Consulta cancelada pelo paciente.'
  }
];

// Componente para formatar a data no padrão brasileiro
const FormatDate = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString);
  return (
    <span>
      {date.toLocaleDateString('pt-BR')}
    </span>
  );
};

// Componente para renderizar o status da consulta
const ConsultationStatus = ({ status }: { status: string }) => {
  switch (status) {
    case 'scheduled':
      return <Badge className="bg-blue-500">Agendada</Badge>;
    case 'completed':
      return <Badge className="bg-green-500">Concluída</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500">Cancelada</Badge>;
    default:
      return <Badge>Desconhecido</Badge>;
  }
};

const ProfileConsultations = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Minhas Consultas</h2>
        <Button>Agendar Nova Consulta</Button>
      </div>

      {consultations.length > 0 ? (
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <Card key={consultation.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-doctordicas-primary" />
                      <span className="font-medium text-lg">{consultation.doctor}</span>
                    </div>
                    <p className="text-doctordicas-text-medium">{consultation.specialty}</p>
                    
                    <div className="flex items-center space-x-4 text-doctordicas-text-medium">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <FormatDate dateString={consultation.date} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{consultation.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end justify-between">
                    <ConsultationStatus status={consultation.status} />
                    
                    <div className="mt-4 md:mt-auto space-x-2">
                      {consultation.status === 'scheduled' && (
                        <>
                          <Button variant="outline" size="sm">Remarcar</Button>
                          <Button variant="destructive" size="sm">Cancelar</Button>
                        </>
                      )}
                      {consultation.status === 'completed' && (
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {consultation.notes && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm font-medium">Observações:</p>
                      <p className="text-sm text-doctordicas-text-medium">{consultation.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-doctordicas-text-medium py-8">
              Você não possui consultas registradas no momento.
            </p>
            <Button>Agendar Primeira Consulta</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileConsultations;
