
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, MapPin, Bell, ShoppingCart, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PharmacyListProps {
  monitoredProducts: string[];
  onToggleMonitor: (productName: string) => void;
}

const PharmacyList = ({ monitoredProducts, onToggleMonitor }: PharmacyListProps) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);
  const { toast } = useToast();
  
  // Dados mockados para demonstração
  const pharmacies = [
    { id: 1, name: 'Farmácia Popular', logo: '🏥', rating: 4.8, distance: 0.7, inStock: true, price: 25.90, originalPrice: 32.50, discount: 20, partner: true, value: 9.5, delivery: '30min', streak: 3 },
    { id: 2, name: 'Drogasil', logo: '💊', rating: 4.5, distance: 1.2, inStock: true, price: 28.50, originalPrice: 28.50, discount: 0, partner: true, value: 8.7, delivery: '1h', streak: 0 },
    { id: 3, name: 'Pacheco', logo: '🏥', rating: 4.2, distance: 2.3, inStock: true, price: 23.75, originalPrice: 25.00, discount: 5, partner: false, value: 9.1, delivery: '45min', streak: 1 },
    { id: 4, name: 'Raia', logo: '💊', rating: 4.6, distance: 0.9, inStock: false, price: 26.99, originalPrice: 26.99, discount: 0, partner: true, value: 8.9, delivery: '2h', streak: 0 },
    { id: 5, name: 'Pague Menos', logo: '🏥', rating: 4.3, distance: 1.8, inStock: true, price: 22.99, originalPrice: 27.00, discount: 15, partner: true, value: 9.3, delivery: '1h', streak: 2 },
  ];
  
  const sortedPharmacies = [...pharmacies].sort((a, b) => a.price - b.price);
  const bestDeal = sortedPharmacies[0];
  
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
  
  const displayRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <span className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="text-yellow-500" size={14} fill="currentColor" />
        ))}
        {hasHalfStar && <Star className="text-yellow-500" size={14} fill="currentColor" />}
        <span className="ml-1 text-xs text-gray-600">{rating}</span>
      </span>
    );
  };
  
  return (
    <Card>
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
                className={`${pharmacy.id === bestDeal.id ? "bg-blue-50" : ""} ${pharmacy.id === selectedPharmacy ? "bg-gray-50" : ""} transition-colors cursor-pointer`}
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
                          <Badge variant="outline" className={`ml-2 ${index === 0 ? 'border-doctordicas-blue text-doctordicas-blue' : index === 1 ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-500'}`}>
                            {index + 1}º
                          </Badge>
                        )}
                        {pharmacy.partner && (
                          <span className="ml-2 bg-blue-100 text-doctordicas-blue text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Check size={10} className="mr-0.5" />
                            Verificado
                          </span>
                        )}
                      </div>
                      <div className="hidden md:block">{displayRating(pharmacy.rating)}</div>
                    </div>
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
                    {pharmacy.discount > 0 && (
                      <div className="text-xs line-through text-gray-400">
                        R$ {pharmacy.originalPrice.toFixed(2)}
                      </div>
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
                    <Progress value={pharmacy.value * 10} className="h-1.5 w-16 mr-2" />
                    <span className={`font-medium ${pharmacy.value >= 9 ? "text-green-600" : pharmacy.value >= 8 ? "text-yellow-600" : "text-red-600"}`}>
                      {pharmacy.value.toFixed(1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMonitor("Dipirona 500mg");
                      }}
                    >
                      <Bell size={14} className="md:mr-1" />
                      <span className="hidden md:inline">
                        {monitoredProducts.includes("Dipirona 500mg") ? "Monitorando" : "Monitorar"}
                      </span>
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
  );
};

export default PharmacyList;
