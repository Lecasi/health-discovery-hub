
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const MedicineFilters = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Preço</h3>
        <div className="space-y-3">
          <Slider defaultValue={[0, 50]} max={100} step={1} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>R$ 0</span>
            <span>R$ 50</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Farmácias</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="drogasil" defaultChecked />
            <Label htmlFor="drogasil">Drogasil</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="farmaSaude" />
            <Label htmlFor="farmaSaude">FarmaSaúde</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ultrafarma" />
            <Label htmlFor="ultrafarma">Ultrafarma</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="drogariaSP" />
            <Label htmlFor="drogariaSP">Drogaria SP</Label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Distância</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="1km" />
            <Label htmlFor="1km">Até 1km</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="3km" />
            <Label htmlFor="3km">Até 3km</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="5km" />
            <Label htmlFor="5km">Até 5km</Label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Entrega</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="freteGratis" />
            <Label htmlFor="freteGratis">Frete Grátis</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="entregaExpressa" />
            <Label htmlFor="entregaExpressa">Entrega Expressa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="retiradaLoja" />
            <Label htmlFor="retiradaLoja">Retirada na Loja</Label>
          </div>
        </div>
      </div>
      
      <div className="pt-2 space-y-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Aplicar Filtros
        </Button>
        <Button variant="outline" className="w-full">
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};

export default MedicineFilters;
