
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, MapPin } from 'lucide-react';

const FeaturedPharmacies = () => {
  // Dados mockados para demonstração
  const pharmacies = [
    { 
      id: 1, 
      name: 'Farmácia Popular', 
      logo: '🏥', 
      rating: 4.8, 
      distance: '0.7 km',
      address: 'Av. Brasil, 1500',
      partnerLevel: 'premium',
      categories: ['Medicamentos', 'Dermocosméticos', 'Vitaminas'],
      delivery: true,
      pickup: true
    },
    { 
      id: 2, 
      name: 'Drogasil', 
      logo: '💊', 
      rating: 4.5, 
      distance: '1.2 km',
      address: 'Rua das Flores, 123',
      partnerLevel: 'premium',
      categories: ['Medicamentos', 'Beleza', 'Higiene'],
      delivery: true,
      pickup: true
    },
    { 
      id: 3, 
      name: 'Pacheco', 
      logo: '🏥', 
      rating: 4.2, 
      distance: '2.3 km',
      address: 'Av. Central, 456',
      partnerLevel: 'basic',
      categories: ['Medicamentos', 'Perfumaria'],
      delivery: true,
      pickup: false
    },
    { 
      id: 4, 
      name: 'Raia', 
      logo: '💊', 
      rating: 4.6, 
      distance: '0.9 km',
      address: 'Rua do Comércio, 789',
      partnerLevel: 'premium',
      categories: ['Medicamentos', 'Saúde', 'Beleza'],
      delivery: true,
      pickup: true
    },
    { 
      id: 5, 
      name: 'Pague Menos', 
      logo: '🏥', 
      rating: 4.3, 
      distance: '1.8 km',
      address: 'Av. Principal, 321',
      partnerLevel: 'standard',
      categories: ['Medicamentos', 'Suplementos'],
      delivery: true,
      pickup: true
    },
  ];
  
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
  
  const getPartnerBadge = (partnerLevel: string) => {
    switch(partnerLevel) {
      case 'premium':
        return <Badge className="bg-yellow-500">Premium</Badge>;
      case 'standard':
        return <Badge className="bg-blue-500">Verificado</Badge>;
      default:
        return <Badge variant="outline">Parceiro</Badge>;
    }
  };
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pharmacies.map(pharmacy => (
        <Card key={pharmacy.id} className="overflow-hidden">
          <div className={`h-2 ${pharmacy.partnerLevel === 'premium' ? 'bg-yellow-500' : pharmacy.partnerLevel === 'standard' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg text-2xl flex items-center justify-center">
                {pharmacy.logo}
              </div>
              <div>
                <CardTitle>{pharmacy.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {displayRating(pharmacy.rating)}
                  <span className="inline-flex items-center">
                    <MapPin size={12} className="mr-1" /> 
                    {pharmacy.distance}
                  </span>
                </CardDescription>
              </div>
              {getPartnerBadge(pharmacy.partnerLevel)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">{pharmacy.address}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Especialidades:</h4>
              <div className="flex flex-wrap gap-1">
                {pharmacy.categories.map((category, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {pharmacy.delivery && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                  <Check size={12} className="mr-1" />
                  Entrega
                </span>
              )}
              
              {pharmacy.pickup && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                  <Check size={12} className="mr-1" />
                  Retirada
                </span>
              )}
            </div>
            
            <div className="pt-2">
              <Button className="w-full" size="sm">Ver medicamentos</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedPharmacies;
