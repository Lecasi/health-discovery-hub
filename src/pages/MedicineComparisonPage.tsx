
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, CheckCircle, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PharmacyMap from '@/components/medicines/PharmacyMap';
import MedicineFilters from '@/components/medicines/MedicineFilters';
import PharmacyList from '@/components/medicines/PharmacyList';
import PriceHistoryChart from '@/components/medicines/PriceHistoryChart';
import ComparisonChart from '@/components/medicines/ComparisonChart';

const MedicineComparisonPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Busca realizada",
      description: `Resultados para: ${searchTerm}`,
    });
  };

  const toggleSelectedItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleCompareSelected = () => {
    toast({
      title: "Comparação iniciada",
      description: `Comparando ${selectedItems.length} item(s) selecionados`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <span>Home</span>
          <ChevronRight size={14} />
          <span>Medicamentos</span>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-800">Paracetamol 750mg</span>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input 
              type="text" 
              placeholder="Buscar medicamentos, sintomas..." 
              className="w-full pl-4 pr-10 py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-1 top-1 bg-doctordicas-blue text-white p-2 rounded-full cursor-pointer">
              <Plus size={18} />
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          {/* Left Column - Filters */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <MedicineFilters />
              </CardContent>
            </Card>
          </div>
          
          {/* Center Column - Medicine List */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-lg p-5 mb-6">
              <div className="flex items-start mb-3">
                <div className="bg-blue-50 rounded-full p-3 mr-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">Paracetamol 750mg</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-600">20 comprimidos</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">Genérico</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">EMS</span>
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 ml-1">
                      Receita Necessária
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1">
                      <CheckCircle size={12} />
                      Aprovado doctordicas
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Ordenar por:</span>
                  <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
                    Melhor preço
                  </Badge>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Mostrar:</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Todos
                  </Badge>
                </div>
              </div>
              
              <PharmacyList 
                toggleSelectedItem={toggleSelectedItem}
                selectedItems={selectedItems}
              />
            </div>
            
            {/* Comparison Bar */}
            {selectedItems.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg border-t flex items-center justify-between z-50">
                <div className="flex items-center">
                  <div className="bg-doctordicas-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {selectedItems.length}
                  </div>
                  <span>{selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selecionado{selectedItems.length > 1 ? 's' : ''} para comparação</span>
                </div>
                <Button onClick={handleCompareSelected}>
                  Comparar Selecionados
                </Button>
              </div>
            )}
          </div>
          
          {/* Right Column - Map */}
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Mapa de Farmácias</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <PharmacyMap />
                <div className="p-3 pt-0">
                  <Button variant="outline" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                    Ver Mapa Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 mb-6">
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-green-800 mb-2">Economia Potencial</h3>
                <div className="text-green-700 mb-2">
                  Comprando na Drogasil
                </div>
                <div className="text-3xl font-bold text-green-800 mb-1">
                  R$ 7,00
                </div>
                <div className="text-green-700 text-sm">
                  -27% do preço médio
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200">
              <CardHeader className="pb-2 border-b">
                <h3 className="text-xs font-bold text-orange-500">PATROCINADO</h3>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">Cadastre-se para alertas</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Seja notificado quando o preço deste medicamento cair
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Ativar Alerta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="history">Histórico de Preços</TabsTrigger>
              <TabsTrigger value="comparison">Comparação Visual</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <Card>
                <CardContent className="pt-6 h-80">
                  <PriceHistoryChart />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comparison">
              <Card>
                <CardContent className="pt-6 h-80">
                  <ComparisonChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MedicineComparisonPage;
