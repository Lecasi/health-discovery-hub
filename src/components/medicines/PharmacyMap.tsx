
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

const PharmacyMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa de Preços</CardTitle>
        <CardDescription>Farmácias próximas a você</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center p-8">
            <MapPin size={48} className="mx-auto mb-4 text-doctordicas-blue" />
            <h3 className="text-lg font-semibold mb-2">Visualização em Mapa</h3>
            <p className="text-sm text-gray-500 mb-4">Encontre farmácias próximas a você com os melhores preços</p>
            <Button variant="outline">Permitir acesso à localização</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyMap;
