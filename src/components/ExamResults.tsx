
import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Download,
  Share2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ExamParameter {
  name: string;
  value: string;
  reference: string;
  status: 'high' | 'low' | 'normal' | 'critical';
  explanation: string;
}

interface ExamResultsProps {
  results: {
    summary: string;
    parameters: ExamParameter[];
    recommendations: string[];
  };
}

const ExamResults: React.FC<ExamResultsProps> = ({ results }) => {
  const { toast } = useToast();
  const [expandedParams, setExpandedParams] = useState<Record<string, boolean>>({});
  const [detailedView, setDetailedView] = useState(false);

  const toggleExpand = (paramName: string) => {
    setExpandedParams(prev => ({
      ...prev,
      [paramName]: !prev[paramName]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'low':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'high':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'critical':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-green-50 text-green-800 border-green-200';
    }
  };

  const handleExport = () => {
    toast({
      title: "Exportando resultados",
      description: "Seu arquivo PDF será gerado em instantes",
    });
    // In a real application, this would generate and download a PDF
  };

  const handleShare = () => {
    toast({
      title: "Compartilhar resultados",
      description: "Funcionalidade em desenvolvimento",
    });
    // In a real application, this would open a share dialog
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded-lg border">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-doctordicas-text-dark">
            Resumo da Interpretação
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Compartilhar
            </Button>
          </div>
        </div>
        
        <p className="text-doctordicas-text-medium mb-4">
          {results.summary}
        </p>
        
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-doctordicas-text-dark">
            Recomendações
          </h4>
        </div>
        
        <ul className="space-y-2">
          {results.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <div className="bg-blue-50 rounded-full p-1 mr-2 mt-0.5">
                <CheckCircle className="h-4 w-4 text-doctordicas-blue" />
              </div>
              <span className="text-sm text-doctordicas-text-medium">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-doctordicas-text-dark">
            Parâmetros Analisados
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDetailedView(!detailedView)}
          >
            {detailedView ? 'Visão Simplificada' : 'Visão Detalhada'}
          </Button>
        </div>
        
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Parâmetro</TableHead>
                <TableHead>Seu Resultado</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.parameters.map((param, index) => (
                <React.Fragment key={index}>
                  <TableRow className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleExpand(param.name)}>
                    <TableCell className="font-medium">{param.name}</TableCell>
                    <TableCell>{param.value}</TableCell>
                    <TableCell className="text-gray-500">{param.reference}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(param.status)}`}>
                          {param.status === 'high' ? 'Elevado' : 
                           param.status === 'low' ? 'Baixo' : 
                           param.status === 'critical' ? 'Crítico' : 'Normal'}
                        </span>
                        <div className="text-gray-400">
                          {expandedParams[param.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {(expandedParams[param.name] || detailedView) && (
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={4} className="p-4">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(param.status)}
                          <div>
                            <h4 className="font-medium text-doctordicas-text-dark mb-1">
                              O que isso significa:
                            </h4>
                            <p className="text-sm text-doctordicas-text-medium">
                              {param.explanation}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border flex items-start space-x-3">
        <HelpCircle className="h-5 w-5 text-doctordicas-blue flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-doctordicas-text-dark mb-1">
            Como interpretar estes resultados
          </h4>
          <p className="text-sm text-doctordicas-text-medium">
            Valores fora da faixa de referência não necessariamente indicam problemas graves. 
            Muitos fatores como medicamentos, alimentação recente, exercício e até mesmo 
            o momento da coleta podem influenciar os resultados. Sempre consulte um médico 
            para uma interpretação completa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
