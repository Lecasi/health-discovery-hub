
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Utensils } from "lucide-react";
import { UserNutritionalProfile } from './NutritionalPlanTool';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  age: z.number().min(18, { message: "Idade deve ser pelo menos 18 anos" }).max(100, { message: "Idade deve ser no máximo 100 anos" }),
  gender: z.enum(["masculino", "feminino"], { required_error: "Selecione o gênero" }),
  weight: z.number().min(30, { message: "Peso deve ser pelo menos 30 kg" }).max(200, { message: "Peso deve ser no máximo 200 kg" }),
  height: z.number().min(120, { message: "Altura deve ser pelo menos 120 cm" }).max(220, { message: "Altura deve ser no máximo 220 cm" }),
  activityLevel: z.enum(["sedentario", "leve", "moderado", "intenso", "muito_intenso"], { required_error: "Selecione o nível de atividade física" }),
  goal: z.enum(["perda_peso", "manutencao", "ganho_massa", "saude"], { required_error: "Selecione seu objetivo" }),
  restrictions: z.array(z.string()).optional().default([]),
  preferences: z.array(z.string()).optional().default([]),
  medicalConditions: z.array(z.string()).optional().default([]),
});

// Lista de restrições alimentares comuns
const DIETARY_RESTRICTIONS = [
  { id: "vegetariano", label: "Vegetariano" },
  { id: "vegano", label: "Vegano" },
  { id: "sem_gluten", label: "Sem Glúten" },
  { id: "sem_lactose", label: "Sem Lactose" },
  { id: "low_carb", label: "Low Carb" },
];

// Lista de preferências alimentares
const FOOD_PREFERENCES = [
  { id: "frutas", label: "Frutas" },
  { id: "vegetais", label: "Vegetais" },
  { id: "carnes_magras", label: "Carnes Magras" },
  { id: "peixes", label: "Peixes" },
  { id: "graos_integrais", label: "Grãos Integrais" },
];

// Lista de condições médicas comuns
const MEDICAL_CONDITIONS = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hipertensao", label: "Hipertensão" },
  { id: "colesterol_alto", label: "Colesterol Alto" },
  { id: "doenca_celiaca", label: "Doença Celíaca" },
  { id: "intolerancia_lactose", label: "Intolerância à Lactose" },
];

type NutritionalFormProps = {
  onSubmit: (data: UserNutritionalProfile) => void;
};

const NutritionalForm = ({ onSubmit }: NutritionalFormProps) => {
  const form = useForm<UserNutritionalProfile>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: "masculino",
      weight: 70,
      height: 170,
      activityLevel: "moderado",
      goal: "saude",
      restrictions: [],
      preferences: [],
      medicalConditions: [],
    },
  });

  const handleSubmit = (data: UserNutritionalProfile) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Utensils className="text-doctordicas-blue h-6 w-6" />
          <h2 className="text-xl font-semibold text-doctordicas-text-dark">Informações Pessoais</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Digite sua idade" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Digite seu peso" 
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Digite sua altura" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível de Atividade Física</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de atividade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário</SelectItem>
                    <SelectItem value="leve">Atividade Leve (1-3x/semana)</SelectItem>
                    <SelectItem value="moderado">Atividade Moderada (3-5x/semana)</SelectItem>
                    <SelectItem value="intenso">Atividade Intensa (5-7x/semana)</SelectItem>
                    <SelectItem value="muito_intenso">Atleta/Muito Intenso</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivo Principal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu objetivo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="perda_peso">Perda de Peso</SelectItem>
                    <SelectItem value="manutencao">Manutenção do Peso</SelectItem>
                    <SelectItem value="ganho_massa">Ganho de Massa Muscular</SelectItem>
                    <SelectItem value="saude">Saúde Geral</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className="text-md font-medium text-doctordicas-text-dark mb-2">Restrições Alimentares</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {DIETARY_RESTRICTIONS.map((restriction) => (
              <FormField
                key={restriction.id}
                control={form.control}
                name="restrictions"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(restriction.id)}
                          onCheckedChange={(checked) => {
                            const updatedRestrictions = checked
                              ? [...field.value || [], restriction.id]
                              : field.value?.filter((value) => value !== restriction.id) || [];
                            field.onChange(updatedRestrictions);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{restriction.label}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-doctordicas-text-dark mb-2">Preferências Alimentares</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {FOOD_PREFERENCES.map((preference) => (
              <FormField
                key={preference.id}
                control={form.control}
                name="preferences"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(preference.id)}
                          onCheckedChange={(checked) => {
                            const updatedPreferences = checked
                              ? [...field.value || [], preference.id]
                              : field.value?.filter((value) => value !== preference.id) || [];
                            field.onChange(updatedPreferences);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{preference.label}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-doctordicas-text-dark mb-2">Condições Médicas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {MEDICAL_CONDITIONS.map((condition) => (
              <FormField
                key={condition.id}
                control={form.control}
                name="medicalConditions"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(condition.id)}
                          onCheckedChange={(checked) => {
                            const updatedConditions = checked
                              ? [...field.value || [], condition.id]
                              : field.value?.filter((value) => value !== condition.id) || [];
                            field.onChange(updatedConditions);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{condition.label}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-doctordicas-blue hover:bg-blue-700 transition-colors"
        >
          Gerar Plano Nutricional
        </Button>
      </form>
    </Form>
  );
};

export default NutritionalForm;
