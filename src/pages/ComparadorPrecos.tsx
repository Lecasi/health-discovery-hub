
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, Search, Star, StarHalf, DollarSign, Percent, Bell, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

const ComparadorPrecos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [monitoredProducts, setMonitoredProducts] = useState<string[]>([]);
  const { toast } = useToast();

  // Dados mockados para demonstração
  const pharmacies = [
    { id: 1, name: 'Farmácia Popular', logo: '🏥', rating: 4.8, distance: 0.7, inStock: true, price: 25.90, discount: 10, partner: true, value: 9.5 },
    { id: 2, name: 'Drogasil', logo: '💊', rating: 4.5, distance: 1.2, inStock: true, price: 28.50, discount: 0, partner: true, value: 8.7 },
    { id: 3, name: 'Pacheco', logo: '🏥', rating: 4.2, distance: 2.3, inStock: true, price: 23.75, discount: 5, partner: false, value: 9.1 },
    { id: 4, name: 'Raia', logo: '💊', rating: 4.6, distance: 0.9, inStock: false, price: 26.99, discount: 0, partner: true, value: 8.9 },
    { id: 5, name: 'Pague Menos', logo: '🏥', rating: 4.3, distance: 1.8, inStock: true, price: 22.99, discount: 15, partner: true, value: 9.3 },
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de busca seria implementada aqui
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

  const sortedPharmacies = [...pharmacies].sort((a, b) => a.price - b.price);
  const bestDeal = sortedPharmacies[0];

  // Função para exibir ratings com estrelas
  const displayRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <span className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="text-yellow-500" size={16} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf className="text-yellow-500" size={16} fill="currentColor" />}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </span>
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
        
        {/* Barra de pesquisa */}
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
              <Button type="submit">Buscar</Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Melhor oferta destacada */}
        {bestDeal && (
          <Card className="mb-8 border-2 border-doctordicas-blue shadow-lg animate-pulse">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Melhor Oferta</CardTitle>
                  <CardDescription>Economia baseada no preço médio do mercado</CardDescription>
                </div>
                <div className="flex items-center bg-doctordicas-blue text-white px-3 py-1 rounded-full">
                  <Percent size={16} className="mr-1" />
                  <span className="font-semibold">Economia de 15%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-3">
                    {bestDeal.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{bestDeal.name}</h3>
                    <div className="flex items-center">
                      {displayRating(bestDeal.rating)}
                      <span className="mx-2">•</span>
                      <span className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" /> {bestDeal.distance} km
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline">
                    {bestDeal.discount > 0 && (
                      <span className="line-through text-gray-400 mr-2">R$ {(bestDeal.price / (1 - bestDeal.discount/100)).toFixed(2)}</span>
                    )}
                    <span className="text-2xl font-bold text-doctordicas-blue">R$ {bestDeal.price.toFixed(2)}</span>
                  </div>
                  {bestDeal.discount > 0 && (
                    <span className="text-sm font-medium text-green-600">-{bestDeal.discount}% OFF</span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => toggleMonitor("Dipirona 500mg")}>
                <Bell size={18} className="mr-2" />
                {monitoredProducts.includes("Dipirona 500mg") ? "Parar monitoramento" : "Monitorar preço"}
              </Button>
              <Button>
                <ShoppingCart size={18} className="mr-2" />
                Comprar agora
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Tabela de comparação */}
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
                  <TableHead>Preço</TableHead>
                  <TableHead className="hidden md:table-cell">Distância</TableHead>
                  <TableHead className="hidden md:table-cell">Disponibilidade</TableHead>
                  <TableHead className="hidden md:table-cell">Índice de Valor</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPharmacies.map((pharmacy) => (
                  <TableRow key={pharmacy.id} className={pharmacy.id === bestDeal.id ? "bg-blue-50" : ""}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xl mr-2">
                          {pharmacy.logo}
                        </div>
                        <div>
                          <div className="font-medium">{pharmacy.name}</div>
                          <div className="hidden md:block">{displayRating(pharmacy.rating)}</div>
                        </div>
                        {pharmacy.partner && (
                          <span className="ml-2 bg-blue-100 text-doctordicas-blue text-xs px-2 py-0.5 rounded-full">Verificado</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
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
                      <Button 
                        size="sm" 
                        disabled={!pharmacy.inStock}
                        variant={pharmacy.id === bestDeal.id ? "default" : "outline"}
                      >
                        <ShoppingCart size={14} className="mr-1" />
                        Comprar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Histórico de Preços */}
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
                    stroke="#4682B4" 
                    activeDot={{ r: 8 }} 
                    name="Preço (R$)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Dicas de economia */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dicas para economizar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <DollarSign className="text-doctordicas-blue mr-2 mt-0.5 shrink-0" size={18} />
                <span>Compare entre genéricos, similares e de referência para encontrar a melhor opção.</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="text-doctordicas-blue mr-2 mt-0.5 shrink-0" size={18} />
                <span>Monitore preços sazonais - muitos medicamentos variam conforme a época do ano.</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="text-doctordicas-blue mr-2 mt-0.5 shrink-0" size={18} />
                <span>Verifique programas de desconto das farmácias e laboratórios para medicamentos contínuos.</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="text-doctordicas-blue mr-2 mt-0.5 shrink-0" size={18} />
                <span>Assine alertas de preço para ser notificado quando houver redução significativa.</span>
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
