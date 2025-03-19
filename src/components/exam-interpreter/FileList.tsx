
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from 'lucide-react';

type FileWithPreview = {
  file: File;
  preview: string;
  name: string;
  type: string;
};

type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

interface FileListProps {
  files: FileWithPreview[];
  removeFile: (index: number) => void;
  simulateProcessing: () => void;
  status: ProcessingStatus;
}

const FileList: React.FC<FileListProps> = ({
  files,
  removeFile,
  simulateProcessing,
  status
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-3">
        Arquivos selecionados ({files.length}/3)
      </h3>
      
      <div className="space-y-3">
        {files.map((file, index) => (
          <div key={index} className="flex items-center p-3 border rounded-lg bg-white">
            <div className="mr-3">
              {file.type.startsWith('image/') ? (
                <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                  <img 
                    src={file.preview} 
                    alt={file.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-red-500" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-doctordicas-text-dark truncate">
                {file.name}
              </p>
              <p className="text-xs text-doctordicas-text-medium">
                {(file.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            <button 
              onClick={() => removeFile(index)}
              className="ml-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={simulateProcessing} 
          disabled={files.length === 0 || status !== 'idle'}
          className="w-full bg-doctordicas-blue"
        >
          {status === 'idle' ? (
            <>Interpretar exames</>
          ) : status === 'uploading' || status === 'processing' ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {status === 'uploading' ? 'Enviando...' : 'Processando...'}
            </>
          ) : (
            <>Concluído</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FileList;
