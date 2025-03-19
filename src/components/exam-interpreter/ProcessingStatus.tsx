
import React from 'react';
import { Progress } from "@/components/ui/progress";

type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

interface ProcessingStatusProps {
  status: ProcessingStatus;
  progress: number;
}

const ProcessingStatusComponent: React.FC<ProcessingStatusProps> = ({
  status,
  progress
}) => {
  return (
    <div className="mt-6 p-6 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-3">
        {status === 'uploading' ? 'Enviando arquivos...' : 'Analisando seus exames...'}
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
    </div>
  );
};

export default ProcessingStatusComponent;
