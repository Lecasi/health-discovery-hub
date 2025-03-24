
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MapPin, Search, Star, StarHalf, DollarSign, Percent, Bell, ShoppingCart, Check, Clock, Award, Trophy, ThumbsUp } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

const ComparadorPrecos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [monitoredProducts, setMonitoredProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"carousel" | "list" | "map">("carousel");
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);
  const { toast } = useToast();
  const carouselRef = useRef(null);

  // Dados mockados para demonstração
  const pharmacies = [
    { id: 1, name: 'Farmácia Popular', logo: '🏥', rating: 4.8, distance: 0.7, inStock: true, price: 25.90, originalPrice: 32.50, discount: 20, partner: true, value: 9.5, delivery: '30min', streak: 3 },
    { id: 2, name: 'Drogasil', logo: '💊', rating: 4.5, distance: 1.2, inStock: true, price: 28.50, originalPrice: 28.50, discount: 0, partner: true, value: 8.7, delivery: '1h', streak: 0 },
    { id: 3, name: 'Pacheco', logo: '🏥', rating: 4.2, distance: 2.3, inStock: true, price: 23.75, originalPrice: 25.00, discount: 5, partner: false, value: 9.1, delivery: '45min', streak: 1 },
    { id: 4, name: 'Raia', logo: '💊', rating: 4.6, distance: 0.9, inStock: false, price: 26.99, originalPrice: 26.99, discount: 0, partner: true, value: 8.9, delivery: '2h', streak: 0 },
    { id: 5, name: 'Pague Menos', logo: '🏥', rating: 4.3, distance: 1.8, inStock: true, price: 22.99, originalPrice: 27.00, discount: 15, partner: true, value: 9.3, delivery: '1h', streak: 2 },
  ];
  
  const priceHistory = [
    { date: '01/05', price: 28.99 },
    { date: '08/05', price: 27.50 },
    { date: '15/05', price: 27.99 },
    { date: '22/05', price: 25.99 },
    { date: '29/05', price: 24.50 },
    { date: '05/06', price: 23.99 },
    { date: '12/06', price: 24.99 },
  ];

  const compareData = pharmacies.map(pharmacy => ({
    name: pharmacy.name,
    price: pharmacy.price
  }));

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

  const handlePurchase = (pharmacyId: number) => {
    const pharmacy = pharmacies.find(p => p.id === pharmacyId);
    if (pharmacy) {
      toast({
        title: "Compra iniciada!",
        description: `Redirecionando para ${pharmacy.name}...`,
      });
    }
  };

  const selectPharmacy = (id: number) => {
    setSelectedPharmacy(id === selectedPharmacy ? null : id);
  };

  const sortedPharmacies = [...pharmacies].sort((a, b) => a.price - b.price);
  const bestDeal = sortedPharmacies[0];

  const displayRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <span className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="text-yellow-500" size={14} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf className="text-yellow-500" size={14} fill="currentColor" />}
        <span className="ml-1 text-xs text-gray-600">{rating}</span>
      </span>
    );
  };

  const renderPharmacyCard = (pharmacy: any, index: number) => {
    const isBest = pharmacy.id === bestDeal.id;
    const isSelected = pharmacy.id === selectedPharmacy;
    
    return (
      <div 
        key={pharmacy.id}
        className={`relative bg-white rounded-xl p-3 transition-all duration-300 h-full ${isSelected ? 'scale-102' : 'hover:scale-102'} card-shadow cursor-pointer ${isBest ? 'border-2 border-doctordicas-blue' : ''}`}
        onClick={() => selectPharmacy(pharmacy.id)}
      >
        {isBest && (
          <div className="absolute -top-2 -right-2 bg-doctordicas-blue text-white rounded-full p-1 shadow-md">
            <Trophy size={14} />
          </div>
        )}
        
        {index < 3 && (
          <div className={`absolute -top-2 -left-2 ${index === 0 ? 'bg-doctordicas-blue' : index === 1 ? 'bg-doctordicas-green' : 'bg-doctordicas-yellow'} text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md`}>
            {index + 1}º
          </div>
        )}
        
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg mr-2 shadow-inner">
            {pharmacy.logo}
          </div>
          <div>
            <h3 className="font-bold text-sm">{pharmacy.name}</h3>
            <div className="flex items-center">
              {displayRating(pharmacy.rating)}
              <div className="flex items-center text-xs text-gray-600 ml-1">
                <MapPin size={10} className="mr-0.5" /> {pharmacy.distance} km
              </div>
            </div>
          </div>
          {pharmacy.partner && (
            <Badge variant="outline" className="ml-auto bg-blue-50 text-doctordicas-blue border-blue-200 text-[10px] px-1 py-0">
              <Check size={8} className="mr-0.5" /> Verificado
            </Badge>
          )}
        </div>
        
        <div className="flex flex-col items-center mb-2">
          {pharmacy.discount > 0 && (
            <div className="text-xs line-through text-gray-400">
              R$ {pharmacy.originalPrice.toFixed(2)}
            </div>
          )}
          <div className={`text-lg font-bold ${isBest ? 'text-doctordicas-blue' : 'text-doctordicas-text-dark'}`}>
            R$ {pharmacy.price.toFixed(2)}
          </div>
          {pharmacy.discount > 0 && (
            <Badge className="mt-1 bg-green-500 text-[10px] px-1 py-0">
              <Percent size={8} className="mr-0.5" /> {pharmacy.discount}% OFF
            </Badge>
          )}
        </div>
        
        <div className="mb-2">
          <div className="text-xs text-gray-600 mb-0.5">Índice de valor:</div>
          <div className="flex items-center">
            <Progress value={pharmacy.value * 10} className="h-1.5 mr-2" />
            <span className={`text-xs font-medium ${pharmacy.value >= 9 ? 'text-green-600' : pharmacy.value >= 8 ? 'text-yellow-600' : 'text-red-600'}`}>
              {pharmacy.value.toFixed(1)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
          <Clock size={10} className="text-gray-400" />
          <span>Entrega: {pharmacy.delivery}</span>
          
          {pharmacy.streak > 0 && (
            <div className="ml-auto flex items-center">
              <Award size={10} className="text-doctordicas-yellow mr-0.5" />
              <span>{pharmacy.streak}x</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs py-1 h-7"
            onClick={(e) => {
              e.stopPropagation();
              toggleMonitor("Dipirona 500mg");
            }}
          >
            <Bell size={10} className="mr-1" />
            {monitoredProducts.includes("Dipirona 500mg") ? "Monitorando" : "Monitorar"}
          </Button>
          <Button 
            size="sm" 
            className={`flex-1 text-xs py-1 h-7 ${!pharmacy.inStock ? 'opacity-50' : ''} ${isBest ? 'bg-doctordicas-blue hover:bg-doctordicas-blue/90' : ''}`}
            disabled={!pharmacy.inStock}
            onClick={(e) => {
              e.stopPropagation();
              handlePurchase(pharmacy.id);
            }}
          >
            <ShoppingCart size={10} className="mr-1" />
            Comprar
          </Button>
        </div>
        
        {isSelected && (
          <div className="mt-3 pt-2 border-t border-gray-200 animate-fade-in">
            <h4 className="font-semibold text-xs mb-1">Detalhes adicionais</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-start">
                <ThumbsUp size={10} className="text-doctordicas-green mr-1 mt-0.5" />
                <span>98% dos clientes recomendam</span>
              </li>
              <li className="flex items-start">
                <Clock size={10} className="text-doctordicas-blue mr-1 mt-0.5" />
                <span>Entregas realizadas em até {pharmacy.delivery} (média)</span>
              </li>
              {pharmacy.discount > 0 && (
                <li className="flex items-start">
                  <Percent size={10} className="text-doctordicas-red mr-1 mt-0.5" />
                  <span>Economia de R$ {(pharmacy.originalPrice - pharmacy.price).toFixed(2)}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-doctordicas-bg-light">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-doctordicas-text-dark mb-2">Comparador de Preços</h1>
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
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            <Button 
              variant={viewMode === "carousel" ? "default" : "ghost"} 
              className={viewMode === "carousel" ? "bg-doctordicas-blue" : ""}
              onClick={() => setViewMode("carousel")}
              size="sm"
            >
              Carrossel
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              className={viewMode === "list" ? "bg-doctordicas-blue" : ""}
              onClick={() => setViewMode("list")}
              size="sm"
            >
              Lista
            </Button>
            <Button 
              variant={viewMode === "map" ? "default" : "ghost"} 
              className={viewMode === "map" ? "bg-doctordicas-blue" : ""}
              onClick={() => setViewMode("map")}
              size="sm"
            >
              Mapa
            </Button>
          </div>
        </div>
        
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-doctordicas-text-dark">Dipirona 500mg</h2>
                <p className="text-doctordicas-text-medium">Analgésico e antipirético - 20 comprimidos</p>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                    <Search size={14} className="mr-1" /> 
                    Ver detalhes
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Dipirona 500mg</h4>
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
        
        {viewMode === "carousel" && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Melhores ofertas</CardTitle>
                <CardDescription>
                  Comparativo de preços em farmácias - Dipirona 500mg
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel 
                  opts={{ align: "start", loop: false }}
                  className="w-full"
                  ref={carouselRef}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {sortedPharmacies.map((pharmacy, index) => (
                      <CarouselItem key={pharmacy.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                        {renderPharmacyCard(pharmacy, index)}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-2 mt-4">
                    <CarouselPrevious className="relative static md:absolute" />
                    <CarouselNext className="relative static md:absolute" />
                  </div>
                </Carousel>
              </CardContent>
            </Card>
          </div>
        )}
        
        {viewMode === "list" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Comparativo de Preços</CardTitle>
              <CardDescription>Dipirona 500mg - 20 comprimidos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmácia</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="hidden md:table-cell">Distância</TableHead>
                    <TableHead className="hidden md:table-cell">Disponibilidade</TableHead>
                    <TableHead className="hidden md:table-cell">Índice</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPharmacies.map((pharmacy, index) => (
                    <TableRow 
                      key={pharmacy.id} 
                      className={`${pharmacy.id === bestDeal.id ? "bg-blue-50" : ""} ${pharmacy.id === selectedPharmacy ? "bg-gray-50" : ""} transition-colors`}
                      onClick={() => selectPharmacy(pharmacy.id)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xl mr-2">
                            {pharmacy.logo}
                          </div>
                          <div>
                            <div className="font-medium flex items-center">
                              {pharmacy.name}
                              {index < 3 && (
                                <Badge variant="outline" className={`ml-2 ${index === 0 ? 'border-doctordicas-blue text-doctordicas-blue' : index === 1 ? 'border-doctordicas-green text-doctordicas-green' : 'border-doctordicas-yellow text-doctordicas-yellow'}`}>
                                  {index + 1}º
                                </Badge>
                              )}
                            </div>
                            <div className="hidden md:block">{displayRating(pharmacy.rating)}</div>
                          </div>
                          {pharmacy.partner && (
                            <span className="ml-2 bg-blue-100 text-doctordicas-blue text-xs px-2 py-0.5 rounded-full">Verificado</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-bold text-doctordicas-text-dark">
                          R$ {pharmacy.price.toFixed(2)}
                          {pharmacy.discount > 0 && (
                            <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                              -{pharmacy.discount}%
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-500" />
                          <span>{pharmacy.distance} km</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs ${pharmacy.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {pharmacy.inStock ? "Em estoque" : "Indisponível"}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <span className={`font-medium ${pharmacy.value >= 9 ? "text-green-600" : pharmacy.value >= 8 ? "text-yellow-600" : "text-red-600"}`}>
                            {pharmacy.value.toFixed(1)}
                          </span>
                          <span className="ml-1 text-xs text-gray-500">/10</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMonitor("Dipirona 500mg");
                            }}
                          >
                            <Bell size={14} className="md:mr-1" />
                            <span className="hidden md:inline">Monitorar</span>
                          </Button>
                          <Button 
                            size="sm" 
                            disabled={!pharmacy.inStock}
                            variant={pharmacy.id === bestDeal.id ? "default" : "outline"}
                            className={pharmacy.id === bestDeal.id ? "bg-doctordicas-blue hover:bg-doctordicas-blue/90" : ""}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePurchase(pharmacy.id);
                            }}
                          >
                            <ShoppingCart size={14} className="md:mr-1" />
                            <span className="hidden md:inline">Comprar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        {viewMode === "map" && (
          <Card className="mb-8">
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
        )}
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Histórico de Preços</CardTitle>
            <CardDescription>Últimos 30 dias - Média de mercado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={priceHistory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-sm">
                            <p className="font-medium">{`Data: ${payload[0].payload.date}`}</p>
                            <p className="text-doctordicas-blue">{`Preço: R$ ${payload[0].value}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2563eb" 
                    activeDot={{ r: 8 }} 
                    name="Preço (R$)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Comparação Visual</CardTitle>
            <CardDescription>Dipirona 500mg - preços entre farmácias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={compareData}
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit=" R$" domain={[0, 'dataMax + 5']} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip 
                    formatter={(value) => [`R$ ${value}`, 'Preço']}
                  />
                  <Bar 
                    dataKey="price" 
                    fill="#2563eb" 
                    animationDuration={1500}
                    label={{ 
                      position: 'right', 
                      formatter: (value) => `R$ ${value.toFixed(2)}` 
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
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
                <div className="mt-1 mr-4 bg-green-100 p-2 rounded-full text-doctordicas-green">
                  <Bell size={18} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Configure alertas de preço</h3>
                  <p className="text-sm text-gray-600">Receba notificações quando medicamentos de uso contínuo ficarem mais baratos.</p>
                </div>
              </li>
              <li className="flex items-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="mt-1 mr-4 bg-yellow-100 p-2 rounded-full text-doctordicas-yellow">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default ComparadorPrecos;
