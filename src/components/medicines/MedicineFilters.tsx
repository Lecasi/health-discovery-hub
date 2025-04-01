
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const MedicineFilters = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Faixa de Preço</h3>
        <div className="space-y-5">
          <Slider defaultValue={[0, 50]} max={100} step={1} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>R$ 0</span>
            <span>R$ 100</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Distância</h3>
        <div className="space-y-5">
          <Slider defaultValue={[5]} max={20} step={1} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0 km</span>
            <span>20 km</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Disponibilidade</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="stock" />
            <Label htmlFor="stock">Em estoque</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="delivery" />
            <Label htmlFor="delivery">Entrega disponível</Label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Tipo de Medicamento</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="generic" />
            <Label htmlFor="generic">Genérico</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="similar" />
            <Label htmlFor="similar">Similar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="reference" />
            <Label htmlFor="reference">Referência</Label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Farmácias</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="verified" defaultChecked />
            <Label htmlFor="verified">Parceiros verificados</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="popular" />
            <Label htmlFor="popular">Farmácia Popular</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="all" />
            <Label htmlFor="all">Todas as farmácias</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineFilters;
