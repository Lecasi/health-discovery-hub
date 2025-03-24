
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Share, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductBadge from './ProductBadge';

type NutrientType = {
  name: string;
  value: number; 
  max: number;
  unit: string;
  warning?: boolean;
};

type IngredientType = {
  name: string;
  concern: 'high' | 'medium' | 'low' | 'none';
  description: string;
};

type AlternativeProductType = {
  id: string;
  name: string;
  price: number;
  score: number;
  image: string;
  savingsPercent?: number;
  healthImprovement?: number;
};

type ProductAnalysisCardProps = {
  productName: string;
  productImage: string;
  productPrice: number;
  score: number;
  nutrients: NutrientType[];
  ingredients: IngredientType[];
  alternatives: AlternativeProductType[];
  onClose: () => void;
};

const ProductAnalysisCard = ({
  productName,
  productImage,
  productPrice,
  score,
  nutrients,
  ingredients,
  alternatives,
  onClose
}: ProductAnalysisCardProps) => {
  const getConcernColor = (concern: IngredientType['concern']) => {
    switch (concern) {
      case 'high': return 'text-[#EF4444]';
      case 'medium': return 'text-[#FBBF24]';
      case 'low': return 'text-[#10B981]';
      default: return 'text-gray-500';
    }
  };

  const getNutrientProgressColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage > 80) return 'bg-[#EF4444]';
    if (percentage > 50) return 'bg-[#FBBF24]';
    return 'bg-[#10B981]';
  };

  return (
    <Card className="w-full max-w-3xl shadow-lg animate-fade-in">
      <CardHeader className="bg-doctordicas-blue text-white relative">
        <Button 
          variant="ghost" 
          className="absolute right-2 top-2 text-white hover:bg-blue-600" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4">
          <ProductBadge score={score} size="lg" />
          <div>
            <CardTitle>{productName}</CardTitle>
            <CardDescription className="text-gray-100">
              Análise de saúde doctordicas
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="analise">
        <TabsList className="w-full justify-start px-6 pt-4">
          <TabsTrigger value="analise">Análise</TabsTrigger>
          <TabsTrigger value="ingredientes">Ingredientes</TabsTrigger>
          <TabsTrigger value="alternativas">Alternativas</TabsTrigger>
        </TabsList>

        <CardContent className="p-6">
          <TabsContent value="analise">
            <div className="flex gap-4 mb-6">
              <img 
                src={productImage} 
                alt={productName} 
                className="w-24 h-24 object-contain border rounded"
              />
              <div>
                <h3 className="font-medium">{productName}</h3>
                <p className="text-lg font-bold">R$ {productPrice.toFixed(2)}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Analisado</Badge>
                  {score < 5 && <Badge variant="destructive">Alerta de Saúde</Badge>}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Informação Nutricional</h3>
              {nutrients.map((nutrient, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{nutrient.name}</span>
                    <span className={nutrient.warning ? 'text-[#EF4444] font-medium' : ''}>
                      {nutrient.value}{nutrient.unit} / {nutrient.max}{nutrient.unit}
                    </span>
                  </div>
                  <Progress 
                    value={(nutrient.value / nutrient.max) * 100} 
                    className="h-2"
                    indicatorClassName={getNutrientProgressColor(nutrient.value, nutrient.max)}
                  />
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Avaliação Geral</h3>
              <p className="text-sm text-gray-700">
                {score >= 7 ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981]" />
                    Este produto é uma boa escolha nutricional! 
                  </span>
                ) : score >= 4 ? (
                  <span className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-[#FBBF24]" />
                    Este produto tem alguns pontos de atenção. Verifique os ingredientes.
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-[#EF4444]" />
                    Este produto contém elementos potencialmente prejudiciais. Considere alternativas.
                  </span>
                )}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="ingredientes">
            <div className="space-y-4">
              <h3 className="font-semibold">Lista de Ingredientes</h3>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{ingredient.name}</h4>
                    <span className={`text-sm font-medium ${getConcernColor(ingredient.concern)}`}>
                      {ingredient.concern === 'high' ? 'Alto Risco' : 
                       ingredient.concern === 'medium' ? 'Moderado' : 
                       ingredient.concern === 'low' ? 'Baixo Risco' : 'Seguro'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{ingredient.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alternativas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternatives.map((alt) => (
                <div key={alt.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex gap-3">
                    <img src={alt.image} alt={alt.name} className="w-16 h-16 object-contain" />
                    <div>
                      <h4 className="font-medium text-sm">{alt.name}</h4>
                      <p className="font-bold">R$ {alt.price.toFixed(2)}</p>
                      <div className="flex gap-2 mt-1">
                        <ProductBadge score={alt.score} size="sm" />
                        {alt.savingsPercent && (
                          <Badge className="bg-[#10B981]">
                            Economia de {alt.savingsPercent}%
                          </Badge>
                        )}
                        {alt.healthImprovement && (
                          <Badge className="bg-[#2563EB]">
                            +{alt.healthImprovement}% mais saudável
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex gap-1">
            <Heart className="h-4 w-4" />
            Favoritar
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1">
            <Share className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>
        <p className="text-xs text-gray-500">Desenvolvido por doctordicas.com</p>
      </CardFooter>
    </Card>
  );
};

export default ProductAnalysisCard;
