
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProfileHistory = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Saúde</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="diagnostics">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="diagnostics">Diagnósticos</TabsTrigger>
              <TabsTrigger value="exams">Exames</TabsTrigger>
              <TabsTrigger value="medications">Medicamentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="diagnostics" className="mt-6">
              <div className="space-y-4">
                {/* Exemplo de entrada de diagnóstico */}
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Sintomas Respiratórios</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>24/08/2023</span>
                        <Clock className="ml-3 mr-1 h-4 w-4" />
                        <span>15:30</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                      Possível Gripe
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="text-sm">
                    <p>Relatados sintomas de tosse, congestão nasal e febre leve. Recomendação: repouso, hidratação e acompanhamento.</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Dores Abdominais</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>10/06/2023</span>
                        <Clock className="ml-3 mr-1 h-4 w-4" />
                        <span>09:15</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      Resolvido
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="text-sm">
                    <p>Dor abdominal relacionada a intolerância alimentar. Recomendação: evitar laticínios por 2 semanas e reavaliar.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="exams" className="mt-6">
              <div className="space-y-4">
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Hemograma Completo</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>30/07/2023</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      Laboratório Central
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="text-sm">
                    <p>Resultados normais. Hemoglobina: 14.2 g/dL, Leucócitos: 7.800/mm³, Plaquetas: 245.000/mm³</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Raio-X de Tórax</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>25/08/2023</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      Hospital São Lucas
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="text-sm">
                    <p>Sem alterações significativas. Campos pulmonares limpos, sem sinais de infecção ou consolidação.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medications" className="mt-6">
              <div className="space-y-4">
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Dipirona 500mg</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Activity className="mr-1 h-4 w-4" />
                        <span>A cada 6 horas se houver dor ou febre</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                      Uso atual
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="text-sm">
                    <p>Prescrição iniciada em 24/08/2023. Uso por 5 dias ou conforme necessidade.</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Amoxicilina 500mg</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Activity className="mr-1 h-4 w-4" />
                        <span>A cada 8 horas</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                      Concluído
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="text-sm">
                    <p>Tratamento de 10/05/2023 a 17/05/2023 para infecção de garganta.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileHistory;
