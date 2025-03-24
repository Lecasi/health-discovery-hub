
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle } from 'lucide-react';
import ProductBadge from './ProductBadge';
import ProductAnalysisCard from './ProductAnalysisCard';

// Placeholder data for demo
const mockProductData = {
  name: "Cereal Matinal Tradicional",
  image: "/placeholder.svg",
  price: 12.99,
  score: 5,
  nutrients: [
    { name: "Açúcar", value: 18, max: 25, unit: "g", warning: true },
    { name: "Sódio", value: 210, max: 500, unit: "mg" },
    { name: "Gorduras Saturadas", value: 3, max: 5, unit: "g" },
    { name: "Fibras", value: 2, max: 8, unit: "g" },
  ],
  ingredients: [
    { 
      name: "Açúcar Refinado", 
      concern: "high" as const, 
      description: "Alto teor de açúcar refinado, associado a aumento de risco cardiovascular e diabetes" 
    },
    { 
      name: "Farinha de Trigo Enriquecida", 
      concern: "medium" as const, 
      description: "Carboidrato refinado com pouco valor nutricional" 
    },
    { 
      name: "Sal", 
      concern: "medium" as const, 
      description: "Níveis moderados de sódio" 
    },
    { 
      name: "Vitaminas B1, B2 e B6", 
      concern: "none" as const, 
      description: "Adição de vitaminas benéficas para o metabolismo" 
    },
  ],
  alternatives: [
    {
      id: "alt1",
      name: "Cereal Integral Zero Açúcar",
      price: 14.99,
      score: 9,
      image: "/placeholder.svg",
      healthImprovement: 45
    },
    {
      id: "alt2",
      name: "Cereal Orgânico Natural",
      price: 11.49,
      score: 8,
      image: "/placeholder.svg",
      savingsPercent: 12,
      healthImprovement: 35
    },
    {
      id: "alt3",
      name: "Granola Premium Sem Conservantes",
      price: 13.99,
      score: 7,
      image: "/placeholder.svg",
      healthImprovement: 25
    },
    {
      id: "alt4",
      name: "Mix de Cereais Integrais",
      price: 10.99,
      score: 8,
      image: "/placeholder.svg",
      savingsPercent: 15,
      healthImprovement: 30
    }
  ]
};

const BrowserExtensionDemo = () => {
  const [showCard, setShowCard] = useState(false);
  const [showInstallInstructions, setShowInstallInstructions] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doctordicas-blue mb-2">Extensão de Navegador "Análise doctordicas"</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compre mais inteligente com nossa extensão que analisa alimentos e medicamentos em tempo real enquanto você navega.
        </p>
      </div>

      <Tabs defaultValue="demo" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="demo">Demonstração</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="demo" className="mt-6">
          <div className="bg-white rounded-lg border p-6 relative">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative border p-4 rounded-lg bg-gray-50 flex-shrink-0">
                <img 
                  src="/placeholder.svg" 
                  alt="Produto de exemplo" 
                  className="w-48 h-48 object-contain"
                />
                
                {/* Badge over product */}
                <div className="absolute top-2 right-2">
                  <ProductBadge score={mockProductData.score} onClick={() => setShowCard(true)} />
                </div>
              </div>
              
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-xl font-bold">{mockProductData.name}</h3>
                <p className="text-2xl font-bold">R$ {mockProductData.price.toFixed(2)}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="outline">Cereal</Badge>
                  <Badge variant="outline">Café da manhã</Badge>
                </div>
                <p className="text-gray-600">
                  Clique no badge azul com o score para ver a análise completa do produto.
                </p>
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button onClick={() => setShowCard(true)}>Ver análise</Button>
                  <Button variant="outline" onClick={() => setShowInstallInstructions(true)}>
                    <Download className="mr-2 h-4 w-4" /> Instalar Extensão
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product Analysis Card */}
            {showCard && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="max-w-3xl w-full">
                  <ProductAnalysisCard 
                    productName={mockProductData.name}
                    productImage={mockProductData.image}
                    productPrice={mockProductData.price}
                    score={mockProductData.score}
                    nutrients={mockProductData.nutrients}
                    ingredients={mockProductData.ingredients}
                    alternatives={mockProductData.alternatives}
                    onClose={() => setShowCard(false)}
                  />
                </div>
              </div>
            )}
            
            {/* Installation Instructions Modal */}
            {showInstallInstructions && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-md">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">Instalar Extensão</h3>
                        <p className="text-gray-600">Em breve disponível para Chrome, Firefox e Edge</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={() => setShowInstallInstructions(false)}
                      >
                        ✕
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-sm">
                        A extensão "Análise doctordicas" está em fase final de desenvolvimento 
                        e será lançada oficialmente em breve. Cadastre-se para ser notificado quando estiver disponível:
                      </p>
                      
                      <div className="flex gap-2">
                        <input 
                          type="email" 
                          placeholder="Seu e-mail" 
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Button>Notificar</Button>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-[#10B981]" />
                        <div className="text-sm">
                          <p className="font-medium">Cadastro na lista de espera</p>
                          <p className="text-gray-600">Você receberá acesso antecipado</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-doctordicas-blue" />
                  </div>
                  <h3 className="font-bold">Análise Nutricional Instantânea</h3>
                </div>
                <p className="text-gray-600">
                  Receba um score de saúde de 0-10 para cada produto, com análise detalhada de 
                  macro e micronutrientes, aditivos e ingredientes controversos.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-doctordicas-blue" />
                  </div>
                  <h3 className="font-bold">Alternativas Mais Saudáveis</h3>
                </div>
                <p className="text-gray-600">
                  Descubra opções similares mais saudáveis ou econômicas na mesma categoria, 
                  com comparação detalhada e avaliação de custo-benefício.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-doctordicas-blue" />
                  </div>
                  <h3 className="font-bold">Perfil de Saúde Personalizado</h3>
                </div>
                <p className="text-gray-600">
                  Análises adaptadas ao seu perfil de saúde, considerando alergias, 
                  condições médicas, objetivos nutricionais e preferências alimentares.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-doctordicas-blue" />
                  </div>
                  <h3 className="font-bold">Histórico e Favoritos</h3>
                </div>
                <p className="text-gray-600">
                  Mantenha um histórico dos produtos analisados, crie listas de favoritos 
                  e receba alertas quando eles estiverem em promoção.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 p-6 border rounded-lg bg-blue-50">
            <h3 className="text-xl font-bold mb-4">Cronograma de Desenvolvimento</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Badge className="bg-[#10B981]">MVP - 4 semanas</Badge>
                <p>Versão básica para Chrome com análise nutricional simplificada</p>
              </div>
              <div className="flex gap-3">
                <Badge className="bg-[#FBBF24]">Fase 2 - 8 semanas</Badge>
                <p>Expansão para Firefox/Edge, personalização, favoritos e listas</p>
              </div>
              <div className="flex gap-3">
                <Badge className="bg-[#2563EB]">Fase 3 - 12 semanas</Badge>
                <p>Personalização avançada, notificações inteligentes e recursos premium</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrowserExtensionDemo;
