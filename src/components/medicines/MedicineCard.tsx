
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Search } from 'lucide-react';

interface MedicineCardProps {
  productName: string;
  description: string;
  imageUrl: string;
}

const MedicineCard = ({ productName, description, imageUrl }: MedicineCardProps) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-white">
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
              <img src={imageUrl} alt={productName} className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-doctordicas-text-dark">{productName}</h2>
              <p className="text-doctordicas-text-medium">{description}</p>
              <div className="mt-1 flex items-center text-xs text-doctordicas-text-medium">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Medicamento</span>
                <span className="mx-2">•</span>
                <span>Genérico disponível</span>
              </div>
            </div>
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm">
                <Search size={14} className="mr-1" /> 
                Ver detalhes
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">{productName}</h4>
                <p className="text-sm">
                  Analgésico e antipirético para alívio de dores e febre. 
                  Uso adulto e pediátrico acima de 15 anos.
                </p>
                <div className="text-sm text-gray-500">
                  Consulte seu médico antes de usar este medicamento.
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
