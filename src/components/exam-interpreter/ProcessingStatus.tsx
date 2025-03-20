
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle } from 'lucide-react';

type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

interface ProcessingStatusProps {
  status: ProcessingStatus;
  progress: number;
  errorMessage?: string;
}

const ProcessingStatusComponent: React.FC<ProcessingStatusProps> = ({
  status,
  progress,
  errorMessage = "Ocorreu um erro ao processar os exames."
}) => {
  return (
    <div className="mt-6 p-6 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-3">
        {status === 'idle' && 'Pronto para análise de exames'}
        {status === 'uploading' && 'Enviando arquivos...'}
        {status === 'processing' && 'Analisando seus exames...'}
        {status === 'complete' && 'Análise concluída!'}
        {status === 'error' && 'Erro na análise'}
      </h3>
      
      {status === 'uploading' && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-doctordicas-text-medium text-right">
            {progress}%
          </p>
        </div>
      )}
      
      {status === 'processing' && (
        <div className="space-y-4">
          <div className="flex justify-center my-6">
            <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-doctordicas-blue animate-spin"></div>
          </div>
        </div>
      )}
      
      {status === 'complete' && (
        <div className="flex items-center justify-center gap-2 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
          <p className="text-lg">Seus resultados estão prontos!</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-center justify-center gap-2 text-red-600">
          <AlertCircle className="h-10 w-10" />
          <p className="text-lg">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatusComponent;
