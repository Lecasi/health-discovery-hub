
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Star, StarHalf, Check, Clock, Bell, ShoppingCart, Trophy, Percent, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MedicineCard from '@/components/medicines/MedicineCard';
import PharmacyList from '@/components/medicines/PharmacyList';
import PharmacyMap from '@/components/medicines/PharmacyMap';
import MedicineFilters from '@/components/medicines/MedicineFilters';
import PriceHistoryChart from '@/components/medicines/PriceHistoryChart';
import ComparisonChart from '@/components/medicines/ComparisonChart';
import FeaturedPharmacies from '@/components/medicines/FeaturedPharmacies';
import SavingsTips from '@/components/medicines/SavingsTips';

const MedicineComparisonPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map" | "pharmacies">("list");
  const [monitoredProducts, setMonitoredProducts] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Busca realizada",
      description: `Resultados para: ${searchTerm}`,
    });
  };

  const toggleMonitor = (productName: string) => {
    if (monitoredProducts.includes(productName)) {
      setMonitoredProducts(monitoredProducts.filter(name => name !== productName));
      toast({
        title: "Alerta removido",
        description: `Você não receberá mais alertas de preço para ${productName}`,
      });
    } else {
      setMonitoredProducts([...monitoredProducts, productName]);
      toast({
        title: "Alerta configurado",
        description: `Você receberá alertas quando o preço de ${productName} baixar`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-doctordicas-text-dark mb-2">Comparador de Preços de Medicamentos</h1>
          <p className="text-doctordicas-text-medium">Encontre os melhores preços em medicamentos e produtos de saúde</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Digite o nome do medicamento ou produto" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-doctordicas-blue hover:bg-doctordicas-blue/90">Buscar</Button>
            </form>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="list" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list" onClick={() => setViewMode("list")}>Lista</TabsTrigger>
            <TabsTrigger value="map" onClick={() => setViewMode("map")}>Mapa</TabsTrigger>
            <TabsTrigger value="pharmacies" onClick={() => setViewMode("pharmacies")}>Farmácias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Filtros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MedicineFilters />
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-9">
                <MedicineCard 
                  productName="Dipirona 500mg"
                  description="Analgésico e antipirético - 20 comprimidos"
                  imageUrl="/placeholder.svg"
                />
                
                <PharmacyList 
                  monitoredProducts={monitoredProducts} 
                  onToggleMonitor={toggleMonitor}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Filtros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MedicineFilters />
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-9">
                <MedicineCard 
                  productName="Dipirona 500mg"
                  description="Analgésico e antipirético - 20 comprimidos"
                  imageUrl="/placeholder.svg"
                />
                
                <PharmacyMap />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pharmacies">
            <FeaturedPharmacies />
          </TabsContent>
        </Tabs>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Preços</CardTitle>
              <CardDescription>Últimos 30 dias - Média de mercado</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <PriceHistoryChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comparação Visual</CardTitle>
              <CardDescription>Dipirona 500mg - preços entre farmácias</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ComparisonChart />
            </CardContent>
          </Card>
        </div>
        
        <SavingsTips />
      </main>
      
      <Footer />
    </div>
  );
};

export default MedicineComparisonPage;
