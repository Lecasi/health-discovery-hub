
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Bell, Percent } from 'lucide-react';

const SavingsTips = () => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-white">
      <CardHeader>
        <CardTitle>Dicas para economizar</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="mt-1 mr-4 bg-blue-100 p-2 rounded-full text-doctordicas-blue">
              <DollarSign size={18} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Compare entre genéricos e similares</h3>
              <p className="text-sm text-gray-600">Genéricos são em média 35% mais baratos que medicamentos de referência.</p>
            </div>
          </li>
          <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="mt-1 mr-4 bg-green-100 p-2 rounded-full text-green-600">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Configure alertas de preço</h3>
              <p className="text-sm text-gray-600">Receba notificações quando medicamentos de uso contínuo ficarem mais baratos.</p>
            </div>
          </li>
          <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="mt-1 mr-4 bg-yellow-100 p-2 rounded-full text-yellow-600">
              <Percent size={18} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Programas de desconto</h3>
              <p className="text-sm text-gray-600">Verifique programas de laboratórios que oferecem até 70% de desconto.</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SavingsTips;
