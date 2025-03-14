
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, User, Calendar, MapPin, Phone, Shield } from 'lucide-react';

const ProfileInfo = () => {
  const { user } = useAuth();

  // Mock data for profile info
  const userInfo = {
    name: user?.name || 'Nome do Usuário',
    email: user?.email || 'email@exemplo.com',
    birthDate: '15/05/1985',
    address: 'São Paulo, SP',
    phone: '(11) 98765-4321',
    joinDate: '05/01/2023',
    dataProtection: 'Ativa'
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-doctordicas-text-dark mb-4">Informações Pessoais</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4 border-b">
              <User className="h-5 w-5 text-doctordicas-blue mr-3" />
              <div>
                <p className="text-sm text-doctordicas-text-medium">Nome Completo</p>
                <p className="font-medium text-doctordicas-text-dark">{userInfo.name}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border-b">
              <Mail className="h-5 w-5 text-doctordicas-blue mr-3" />
              <div>
                <p className="text-sm text-doctordicas-text-medium">Email</p>
                <p className="font-medium text-doctordicas-text-dark">{userInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <Calendar className="h-5 w-5 text-doctordicas-blue mr-3" />
              <div>
                <p className="text-sm text-doctordicas-text-medium">Data de Nascimento</p>
                <p className="font-medium text-doctordicas-text-dark">{userInfo.birthDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4 border-b">
              <MapPin className="h-5 w-5 text-doctordicas-blue mr-3" />
              <div>
                <p className="text-sm text-doctordicas-text-medium">Localização</p>
                <p className="font-medium text-doctordicas-text-dark">{userInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border-b">
              <Phone className="h-5 w-5 text-doctordicas-blue mr-3" />
              <div>
                <p className="text-sm text-doctordicas-text-medium">Telefone</p>
                <p className="font-medium text-doctordicas-text-dark">{userInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4">
              <Shield className="h-5 w-5 text-doctordicas-blue mr-3" />
              <div>
                <p className="text-sm text-doctordicas-text-medium">Proteção de Dados</p>
                <p className="font-medium text-doctordicas-text-dark">{userInfo.dataProtection}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 bg-doctordicas-blue-light p-4 rounded-lg">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-doctordicas-blue mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-doctordicas-text-dark mb-1">Seus dados estão protegidos</h3>
            <p className="text-sm text-doctordicas-text-medium">
              Respeitamos sua privacidade e mantemos seus dados médicos e pessoais seguros e criptografados.
              Você pode gerenciar suas preferências de privacidade a qualquer momento nas configurações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
