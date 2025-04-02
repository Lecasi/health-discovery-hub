
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UserNutritionalProfile } from './NutritionalPlanTool';

interface NutritionalTipsProps {
  userProfile: UserNutritionalProfile | null;
}

const NutritionalTips: React.FC<NutritionalTipsProps> = ({ userProfile }) => {
  return (
    <div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="general">Dicas Gerais</TabsTrigger>
          <TabsTrigger value="specific">Para Seu Objetivo</TabsTrigger>
          <TabsTrigger value="recipes">Receitas Saudáveis</TabsTrigger>
          <TabsTrigger value="myths">Mitos & Verdades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-doctordicas-blue">Princípios de Alimentação Saudável</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Uma alimentação balanceada é a base de uma vida saudável. Confira princípios que podem transformar sua relação com os alimentos:</p>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Coma alimentos naturais e pouco processados</AccordionTrigger>
                    <AccordionContent>
                      Alimentos in natura ou minimamente processados devem ser a base da sua alimentação. Frutas, legumes, verduras, grãos e proteínas magras devem compor a maior parte das refeições.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Consuma gorduras boas</AccordionTrigger>
                    <AccordionContent>
                      Nem todas as gorduras são ruins. Gorduras boas, presentes em azeites, castanhas, abacate e peixes, são essenciais para o bom funcionamento do corpo e absorção de vitaminas.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Limite açúcares adicionados</AccordionTrigger>
                    <AccordionContent>
                      O consumo excessivo de açúcar está associado a diversas doenças crônicas. Reduza alimentos e bebidas com açúcar adicionado e prefira o sabor natural dos alimentos.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Mantenha-se hidratado</AccordionTrigger>
                    <AccordionContent>
                      A água é essencial para todas as funções do corpo. Beba pelo menos 2 litros por dia, distribuídos ao longo do dia, mesmo quando não estiver sentindo sede.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Pratique a alimentação consciente</AccordionTrigger>
                    <AccordionContent>
                      Preste atenção ao que você come, desacelere durante as refeições, mastigue bem os alimentos e perceba os sinais de fome e saciedade do seu corpo.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-doctordicas-green">Nutrientes Essenciais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Conhecer os nutrientes fundamentais para o corpo e suas fontes é importante para garantir uma alimentação completa:</p>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Proteínas</AccordionTrigger>
                    <AccordionContent>
                      <p>Essenciais para construção e manutenção muscular.</p>
                      <p className="mt-2 font-medium">Fontes principais:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Carnes magras</li>
                        <li>Ovos</li>
                        <li>Leite e derivados</li>
                        <li>Leguminosas (feijão, lentilha)</li>
                        <li>Tofu e outras fontes vegetais</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Carboidratos</AccordionTrigger>
                    <AccordionContent>
                      <p>Principal fonte de energia para o corpo e cérebro.</p>
                      <p className="mt-2 font-medium">Fontes principais:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Grãos integrais</li>
                        <li>Tubérculos (batata, mandioca)</li>
                        <li>Frutas</li>
                        <li>Leguminosas</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Gorduras</AccordionTrigger>
                    <AccordionContent>
                      <p>Fornecem energia concentrada e auxiliam na absorção de vitaminas.</p>
                      <p className="mt-2 font-medium">Fontes principais:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Azeite de oliva</li>
                        <li>Abacate</li>
                        <li>Peixes gordurosos (salmão, sardinha)</li>
                        <li>Oleaginosas (castanhas, nozes, amêndoas)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Vitaminas e Minerais</AccordionTrigger>
                    <AccordionContent>
                      <p>Essenciais para o funcionamento adequado do organismo.</p>
                      <p className="mt-2 font-medium">Fontes principais:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Frutas e vegetais coloridos</li>
                        <li>Vegetais verde-escuros</li>
                        <li>Cereais integrais</li>
                        <li>Carnes (para minerais como ferro e zinco)</li>
                        <li>Laticínios (para cálcio)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Fibras</AccordionTrigger>
                    <AccordionContent>
                      <p>Essenciais para saúde intestinal e controle do açúcar no sangue.</p>
                      <p className="mt-2 font-medium">Fontes principais:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Cereais integrais</li>
                        <li>Frutas com casca</li>
                        <li>Vegetais crus</li>
                        <li>Leguminosas</li>
                        <li>Sementes (chia, linhaça)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="specific">
          <Card>
            <CardHeader>
              <CardTitle className="text-doctordicas-blue">
                {userProfile ? `Dicas Para ${getGoalText(userProfile.goal)}` : 'Dicas Personalizadas'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!userProfile ? (
                <div className="text-center py-8">
                  <p className="text-doctordicas-text-medium">
                    Complete seu perfil nutricional primeiro para receber dicas personalizadas
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userProfile.goal === 'perda_peso' && (
                    <>
                      <h3 className="font-medium text-lg">Dicas para Perda de Peso</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Priorize alimentos com baixa densidade calórica e alto poder de saciedade, como vegetais, frutas e proteínas magras.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Reduza o consumo de carboidratos refinados e açúcares, que podem causar picos de insulina e aumento da fome.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Consuma proteínas em todas as refeições para aumentar a saciedade e preservar a massa muscular durante o processo de emagrecimento.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Beba água antes das refeições para ajudar a controlar o apetite.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Pratique o controle de porções, mesmo com alimentos saudáveis, pois o balanço calórico ainda é importante.</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 p-4 rounded-lg mt-4">
                        <h4 className="font-medium text-doctordicas-blue mb-2">Alimentos Recomendados</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>• Vegetais folhosos</div>
                          <div>• Frutas com baixo índice glicêmico</div>
                          <div>• Proteínas magras</div>
                          <div>• Grãos integrais</div>
                          <div>• Chás sem açúcar</div>
                          <div>• Laticínios desnatados</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {userProfile.goal === 'ganho_massa' && (
                    <>
                      <h3 className="font-medium text-lg">Dicas para Ganho de Massa Muscular</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Mantenha um superávit calórico moderado, consumindo cerca de 300-500 calorias a mais do que seu gasto diário.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Aumente o consumo de proteínas para aproximadamente 1,6-2,2g por kg de peso corporal para facilitar a recuperação e construção muscular.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Consuma carboidratos complexos para fornecer energia para os treinos e auxiliar na recuperação muscular.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Não negligencie as gorduras saudáveis, que são importantes para a produção hormonal.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Consuma proteínas e carboidratos dentro da janela anabólica (30-60 minutos após o treino).</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 p-4 rounded-lg mt-4">
                        <h4 className="font-medium text-doctordicas-blue mb-2">Alimentos Recomendados</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>• Carnes magras</div>
                          <div>• Ovos</div>
                          <div>• Leite e derivados</div>
                          <div>• Arroz, batata, aveia</div>
                          <div>• Frutas</div>
                          <div>• Oleaginosas</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {userProfile.goal === 'manutencao' && (
                    <>
                      <h3 className="font-medium text-lg">Dicas para Manutenção do Peso</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Mantenha um equilíbrio calórico, consumindo aproximadamente a mesma quantidade de calorias que você gasta diariamente.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Pratique alimentação intuitiva, aprendendo a reconhecer os sinais de fome e saciedade do seu corpo.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Faça refeições balanceadas, incluindo todos os grupos alimentares em proporções adequadas.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Mantenha consistência nos horários das refeições para estabilizar o metabolismo.</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 p-4 rounded-lg mt-4">
                        <h4 className="font-medium text-doctordicas-blue mb-2">Alimentos Recomendados</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>• Variedade de vegetais</div>
                          <div>• Frutas frescas</div>
                          <div>• Proteínas magras</div>
                          <div>• Grãos integrais</div>
                          <div>• Gorduras saudáveis</div>
                          <div>• Laticínios</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {userProfile.goal === 'saude' && (
                    <>
                      <h3 className="font-medium text-lg">Dicas para Saúde Geral</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Priorize a diversidade alimentar, consumindo uma ampla variedade de alimentos para obter todos os nutrientes necessários.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Inclua alimentos anti-inflamatórios em sua dieta, como peixes ricos em ômega-3, frutas vermelhas e vegetais coloridos.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Mantenha o consumo adequado de fibras para a saúde intestinal e microbiota.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Controle o consumo de sódio, açúcares e gorduras saturadas, associados a doenças crônicas.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block bg-doctordicas-blue rounded-full h-2 w-2 mt-2 mr-2"></span>
                          <span>Mantenha-se bem hidratado ao longo do dia.</span>
                        </li>
                      </ul>

                      <div className="bg-blue-50 p-4 rounded-lg mt-4">
                        <h4 className="font-medium text-doctordicas-blue mb-2">Alimentos Recomendados</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>• Vegetais de todas as cores</div>
                          <div>• Frutas variadas</div>
                          <div>• Leguminosas</div>
                          <div>• Peixes e frutos do mar</div>
                          <div>• Azeite de oliva extra virgem</div>
                          <div>• Oleaginosas e sementes</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Dicas específicas para condições médicas, se aplicável */}
                  {userProfile.medicalConditions && userProfile.medicalConditions.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-medium text-lg text-doctordicas-red">Considerações para Suas Condições Médicas</h3>
                      {userProfile.medicalConditions.includes('diabetes') && (
                        <div className="mt-3">
                          <h4 className="font-medium text-doctordicas-text-dark">Diabetes</h4>
                          <ul className="space-y-2 mt-1">
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Monitore cuidadosamente a ingestão de carboidratos e prefira fontes com baixo índice glicêmico.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Distribua os carboidratos ao longo do dia para evitar picos de glicose.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Aumente o consumo de fibras solúveis que ajudam no controle glicêmico.</span>
                            </li>
                          </ul>
                        </div>
                      )}
                      
                      {userProfile.medicalConditions.includes('hipertensao') && (
                        <div className="mt-3">
                          <h4 className="font-medium text-doctordicas-text-dark">Hipertensão</h4>
                          <ul className="space-y-2 mt-1">
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Reduza significativamente o consumo de sódio, limite a 2g por dia.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Aumente o consumo de alimentos ricos em potássio, magnésio e cálcio.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Evite alimentos processados e industrializados, ricos em sódio oculto.</span>
                            </li>
                          </ul>
                        </div>
                      )}
                      
                      {userProfile.medicalConditions.includes('colesterol_alto') && (
                        <div className="mt-3">
                          <h4 className="font-medium text-doctordicas-text-dark">Colesterol Alto</h4>
                          <ul className="space-y-2 mt-1">
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Limite o consumo de gorduras saturadas e trans, presentes em alimentos de origem animal e industrializados.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Aumente o consumo de gorduras monoinsaturadas e poli-insaturadas, encontradas em azeite, abacate e peixes.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block bg-doctordicas-red rounded-full h-2 w-2 mt-2 mr-2"></span>
                              <span>Inclua fibras solúveis, encontradas em aveia, leguminosas e frutas, que ajudam a reduzir o colesterol.</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recipes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-doctordicas-green text-lg">Café da Manhã Nutritivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium">Bowl de Aveia Proteico</h4>
                    <p className="text-sm text-doctordicas-text-medium mb-2">Rica em fibras e proteínas para começar o dia</p>
                    <h5 className="text-sm font-medium mt-3 mb-1">Ingredientes:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 40g de aveia em flocos</li>
                      <li>• 1 colher de sopa de sementes de chia</li>
                      <li>• 180ml de leite (vegetal ou animal)</li>
                      <li>• 1 banana madura</li>
                      <li>• 1 colher de sopa de pasta de amendoim</li>
                      <li>• Canela a gosto</li>
                    </ul>
                    <h5 className="text-sm font-medium mt-3 mb-1">Modo de Preparo:</h5>
                    <p className="text-sm">Misture a aveia, chia e leite. Deixe hidratar por 5 minutos. Adicione a banana amassada, pasta de amendoim e canela. Sirva com frutas frescas por cima.</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium">Omelete de Vegetais</h4>
                    <p className="text-sm text-doctordicas-text-medium mb-2">Proteína de qualidade com baixo carboidrato</p>
                    <h5 className="text-sm font-medium mt-3 mb-1">Ingredientes:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 2 ovos</li>
                      <li>• 1/4 de cebola picada</li>
                      <li>• 1/4 de pimentão picado</li>
                      <li>• 1 punhado de espinafre</li>
                      <li>• Sal e pimenta a gosto</li>
                    </ul>
                    <h5 className="text-sm font-medium mt-3 mb-1">Modo de Preparo:</h5>
                    <p className="text-sm">Bata os ovos, adicione os vegetais picados e temperos. Cozinhe em frigideira antiaderente até dourar e virar.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-doctordicas-blue text-lg">Almoço Equilibrado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium">Salada de Quinoa e Frango</h4>
                    <p className="text-sm text-doctordicas-text-medium mb-2">Rica em proteínas e carboidratos complexos</p>
                    <h5 className="text-sm font-medium mt-3 mb-1">Ingredientes:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 100g de quinoa cozida</li>
                      <li>• 120g de peito de frango grelhado</li>
                      <li>• 1/2 abacate em cubos</li>
                      <li>• Tomate cereja cortados ao meio</li>
                      <li>• Folhas verdes variadas</li>
                      <li>• Azeite, limão, sal e pimenta</li>
                    </ul>
                    <h5 className="text-sm font-medium mt-3 mb-1">Modo de Preparo:</h5>
                    <p className="text-sm">Misture todos os ingredientes em uma tigela. Tempere com azeite, limão, sal e pimenta a gosto.</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium">Peixe ao Forno com Legumes</h4>
                    <p className="text-sm text-doctordicas-text-medium mb-2">Fonte de proteína magra e ômega-3</p>
                    <h5 className="text-sm font-medium mt-3 mb-1">Ingredientes:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 150g de filé de peixe branco</li>
                      <li>• 1 batata doce em rodelas</li>
                      <li>• 1 abobrinha em rodelas</li>
                      <li>• 1/2 cebola em fatias</li>
                      <li>• 1 colher de sopa de azeite</li>
                      <li>• Ervas, sal e limão a gosto</li>
                    </ul>
                    <h5 className="text-sm font-medium mt-3 mb-1">Modo de Preparo:</h5>
                    <p className="text-sm">Coloque os legumes em uma forma, adicione o peixe por cima. Tempere com azeite, ervas, sal e limão. Asse em forno preaquecido por 25 minutos.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-doctordicas-yellow text-lg">Lanches Saudáveis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium">Smoothie Verde Energético</h4>
                    <p className="text-sm text-doctordicas-text-medium mb-2">Rico em vitaminas, minerais e antioxidantes</p>
                    <h5 className="text-sm font-medium mt-3 mb-1">Ingredientes:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 1 banana</li>
                      <li>• 1 punhado de couve ou espinafre</li>
                      <li>• 1 colher de sopa de sementes de linhaça</li>
                      <li>• 200ml de leite vegetal ou água de coco</li>
                      <li>• Gengibre a gosto (opcional)</li>
                    </ul>
                    <h5 className="text-sm font-medium mt-3 mb-1">Modo de Preparo:</h5>
                    <p className="text-sm">Bata todos os ingredientes no liquidificador até obter uma mistura homogênea. Sirva gelado.</p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium">Mix de Oleaginosas e Frutas Secas</h4>
                    <p className="text-sm text-doctordicas-text-medium mb-2">Lanche prático rico em gorduras boas</p>
                    <h5 className="text-sm font-medium mt-3 mb-1">Ingredientes:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 15g de castanhas (do Brasil, caju ou amêndoas)</li>
                      <li>• 10g de nozes</li>
                      <li>• 20g de frutas secas (damasco, tâmaras)</li>
                      <li>• 5g de sementes de abóbora</li>
                    </ul>
                    <h5 className="text-sm font-medium mt-3 mb-1">Modo de Preparo:</h5>
                    <p className="text-sm">Misture todos os ingredientes e armazene em um recipiente hermético. Consuma como lanche entre as refeições principais.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="myths">
          <Card>
            <CardHeader>
              <CardTitle className="text-doctordicas-blue">Mitos e Verdades da Nutrição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="border-b pb-4">
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Mito</span>
                    <h3 className="font-medium">Ovo aumenta o colesterol ruim.</h3>
                  </div>
                  <p className="text-sm mt-2">Estudos recentes mostram que o colesterol alimentar tem pouca influência no colesterol sanguíneo para a maioria das pessoas. Ovos são alimentos nutritivos, ricos em proteínas de alta qualidade e outros nutrientes importantes.</p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Verdade</span>
                    <h3 className="font-medium">A qualidade das calorias importa mais que a quantidade.</h3>
                  </div>
                  <p className="text-sm mt-2">100 calorias de vegetais têm efeitos metabólicos diferentes de 100 calorias de açúcar refinado. Diferentes alimentos afetam seus hormônios, sensação de fome e como seu corpo queima calorias.</p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Mito</span>
                    <h3 className="font-medium">Gorduras são sempre prejudiciais à saúde.</h3>
                  </div>
                  <p className="text-sm mt-2">Gorduras saudáveis são essenciais para o bom funcionamento do corpo. Ômega-3, gorduras monoinsaturadas e algumas saturadas são importantes para a absorção de vitaminas lipossolúveis, saúde cerebral e hormonal.</p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Verdade</span>
                    <h3 className="font-medium">O jejum intermitente pode trazer benefícios metabólicos.</h3>
                  </div>
                  <p className="text-sm mt-2">Estudos indicam que períodos controlados de jejum podem melhorar a sensibilidade à insulina, reduzir inflamação e promover autofagia (processo de limpeza celular). No entanto, deve ser praticado com orientação profissional.</p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Mito</span>
                    <h3 className="font-medium">Suplementos são sempre necessários para uma boa nutrição.</h3>
                  </div>
                  <p className="text-sm mt-2">Uma dieta variada e balanceada fornece quase todos os nutrientes necessários para a maioria das pessoas. Suplementos devem ser usados apenas para corrigir deficiências específicas ou em situações especiais, sempre com orientação médica.</p>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Verdade</span>
                    <h3 className="font-medium">A hidratação adequada é fundamental para a saúde.</h3>
                  </div>
                  <p className="text-sm mt-2">A água está envolvida em praticamente todos os processos corporais. A desidratação pode afetar o desempenho cognitivo, função renal, digestão e até mesmo o metabolismo. O ideal é manter-se hidratado ao longo do dia.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Função para converter o código do objetivo em texto legível
function getGoalText(goal: string): string {
  const goalTexts: Record<string, string> = {
    'perda_peso': 'Perda de Peso',
    'manutencao': 'Manutenção do Peso',
    'ganho_massa': 'Ganho de Massa Muscular',
    'saude': 'Saúde Geral'
  };
  
  return goalTexts[goal] || 'Seu Objetivo';
}

export default NutritionalTips;
