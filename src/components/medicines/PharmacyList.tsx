
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PharmacyListProps {
  toggleSelectedItem: (id: string) => void;
  selectedItems: string[];
}

const PharmacyList = ({ toggleSelectedItem, selectedItems }: PharmacyListProps) => {
  const { toast } = useToast();
  
  // Dados mockados para demonstração
  const pharmacies = [
    { 
      id: '1', 
      name: 'Drogasil',
      initial: 'D',
      rating: 4.9,
      reviews: 543,
      partner: true,
      distance: 650,
      price: 18.90,
      originalPrice: 25.90,
      discount: 27,
      freeShipping: true,
      sponsored: true 
    },
    { 
      id: '2', 
      name: 'FarmaSaúde',
      initial: 'F',
      rating: 4.8,
      reviews: 412,
      partner: true,
      distance: 1200,
      price: 19.90,
      originalPrice: 23.50,
      discount: 15,
      freeShipping: false,
      pickupOption: true,
      sponsored: false
    },
    { 
      id: '3', 
      name: 'Ultrafarma',
      initial: 'U',
      rating: 4.7,
      reviews: 325,
      partner: true,
      distance: 2100,
      price: 21.50,
      originalPrice: 24.99,
      discount: 14,
      shippingCost: 6.99,
      sponsored: false
    },
  ];
  
  const handlePurchase = (pharmacyId: string) => {
    const pharmacy = pharmacies.find(p => p.id === pharmacyId);
    if (pharmacy) {
      toast({
        title: "Compra iniciada!",
        description: `Redirecionando para ${pharmacy.name}...`,
      });
    }
  };
  
  const displayRating = (rating: number, reviews: number) => {
    return (
      <div className="flex items-center">
        <div className="flex mr-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="text-yellow-400" 
              fill={i < Math.floor(rating) ? "currentColor" : "none"}
              size={14}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">({reviews} avaliações)</span>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {pharmacies.map((pharmacy) => (
        <div 
          key={pharmacy.id} 
          className={`rounded-lg border ${pharmacy.sponsored ? 'border-orange-200' : 'border-gray-200'} overflow-hidden`}
        >
          {pharmacy.sponsored && (
            <div className="bg-orange-50 px-4 py-1 text-xs font-medium text-orange-600">
              PATROCINADO
            </div>
          )}
          
          <div className="p-4">
            <div className="flex">
              {/* Checkbox */}
              <div className="mr-4 flex items-start pt-1">
                <Checkbox 
                  checked={selectedItems.includes(pharmacy.id)} 
                  onCheckedChange={() => toggleSelectedItem(pharmacy.id)}
                  className="mt-1"
                />
              </div>
              
              {/* Pharmacy info */}
              <div className="flex-1">
                <div className="flex mb-3">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mr-3`}>
                    {pharmacy.initial}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{pharmacy.name}</h3>
                        {displayRating(pharmacy.rating, pharmacy.reviews)}
                      </div>
                      
                      {pharmacy.partner && (
                        <Badge className="bg-green-100 text-green-600 border-green-200 whitespace-nowrap">
                          Parceiro Oficial
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <Badge className="bg-blue-100 text-blue-600 border-blue-200 flex items-center gap-1">
                        <MapPin size={12} />
                        {pharmacy.distance < 1000 
                          ? `${pharmacy.distance}m` 
                          : `${(pharmacy.distance / 1000).toFixed(1)}km`}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Preço:</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">R$ {pharmacy.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-400 line-through mr-1">
                          R$ {pharmacy.originalPrice.toFixed(2)}
                        </span>
                        <Badge className="bg-orange-100 text-orange-600 border-orange-200">
                          {pharmacy.discount}% OFF
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {pharmacy.freeShipping && (
                      <Badge className="bg-green-50 text-green-600 border-green-200">
                        Frete Grátis
                      </Badge>
                    )}
                    {pharmacy.pickupOption && (
                      <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                        Retirada
                      </Badge>
                    )}
                    {pharmacy.shippingCost && (
                      <Badge className="bg-red-50 text-red-600 border-red-200">
                        R$ {pharmacy.shippingCost.toFixed(2)}
                      </Badge>
                    )}
                    <Button 
                      onClick={() => handlePurchase(pharmacy.id)}
                      className={`${pharmacy.id === '1' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'}`}
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PharmacyList;
