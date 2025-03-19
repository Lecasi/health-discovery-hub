
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ExamResults from './ExamResults';

type FileWithPreview = {
  file: File;
  preview: string;
  name: string;
  type: string;
};

type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

const ExamInterpreter = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    if (selectedFiles.length > 3) {
      toast({
        title: "Limite excedido",
        description: "Você pode enviar no máximo 3 arquivos por vez",
        variant: "destructive",
      });
      return;
    }

    addFiles(selectedFiles);
  };

  const addFiles = (selectedFiles: FileList) => {
    const newFiles: FileWithPreview[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      
      if (!isImage && !isPdf) {
        toast({
          title: "Formato não suportado",
          description: "Apenas arquivos PDF, JPG e PNG são aceitos",
          variant: "destructive",
        });
        continue;
      }
      
      const preview = isImage 
        ? URL.createObjectURL(file) 
        : '/placeholder.svg';
      
      newFiles.push({
        file,
        preview,
        name: file.name,
        type: file.type
      });
    }
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
    
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('bg-blue-50', 'border-blue-300');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('bg-blue-50', 'border-blue-300');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('bg-blue-50', 'border-blue-300');
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      if (prev[index].preview && prev[index].preview !== '/placeholder.svg') {
        URL.revokeObjectURL(prev[index].preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const simulateProcessing = () => {
    if (files.length === 0) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, faça upload de pelo menos um exame",
        variant: "destructive",
      });
      return;
    }

    setStatus('uploading');
    setProgress(0);
    
    const uploadTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadTimer);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(uploadTimer);
      setProgress(100);
      setStatus('processing');
      
      // Simular processamento
      setTimeout(() => {
        const mockResults = {
          summary: "Seus exames indicam valores dentro da normalidade para a maioria dos parâmetros, com exceção de níveis levemente elevados de glicose e colesterol LDL.",
          parameters: [
            {
              name: "Glicose",
              value: "108 mg/dL",
              reference: "70-99 mg/dL",
              status: "high",
              explanation: "Seu nível de glicose está levemente elevado, o que pode indicar pré-diabetes. Recomenda-se uma consulta com endocrinologista para avaliação."
            },
            {
              name: "Colesterol Total",
              value: "190 mg/dL",
              reference: "<200 mg/dL",
              status: "normal",
              explanation: "Seu nível de colesterol total está dentro dos limites desejáveis."
            },
            {
              name: "Colesterol LDL",
              value: "145 mg/dL",
              reference: "<130 mg/dL",
              status: "high",
              explanation: "Seu LDL (conhecido como 'colesterol ruim') está elevado. Reduzir o consumo de gorduras saturadas e aumentar a atividade física pode ajudar."
            },
            {
              name: "Colesterol HDL",
              value: "52 mg/dL",
              reference: ">40 mg/dL",
              status: "normal",
              explanation: "Seu HDL (conhecido como 'colesterol bom') está em um nível adequado."
            },
            {
              name: "Triglicerídeos",
              value: "120 mg/dL",
              reference: "<150 mg/dL",
              status: "normal",
              explanation: "Seus triglicerídeos estão dentro dos valores de referência."
            }
          ],
          recommendations: [
            "Reduzir o consumo de carboidratos refinados e açúcares",
            "Aumentar a atividade física para pelo menos 150 minutos por semana",
            "Considerar consulta com endocrinologista para avaliação da glicose elevada",
            "Aumentar o consumo de fibras e ômega-3"
          ]
        };
        
        setResults(mockResults);
        setStatus('complete');
        
        toast({
          title: "Análise completa",
          description: "Seus exames foram interpretados com sucesso!",
        });
      }, 3000);
    }, 2000);
  };

  const renderSimpleUploadButton = () => (
    <div className="text-center py-10">
      <div className="mb-4">
        <div className="rounded-full bg-blue-50 w-16 h-16 flex items-center justify-center mx-auto mb-2">
          <FileText className="h-8 w-8 text-doctordicas-blue" />
        </div>
        <h3 className="text-lg font-semibold text-doctordicas-text-dark mb-2">
          Interpretador de Exames
        </h3>
        <p className="text-doctordicas-text-medium mb-6">
          Entenda seus resultados
        </p>
      </div>
      <Button 
        onClick={() => fileInputRef.current?.click()}
        className="w-full max-w-md bg-doctordicas-blue"
      >
        Enviar exame para análise
      </Button>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        ref={fileInputRef}
      />
    </div>
  );

  const renderUploadArea = () => (
    <div 
      ref={dropAreaRef}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors duration-200 ease-in-out"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        ref={fileInputRef}
      />
      
      <div className="mb-4">
        <div className="rounded-full bg-blue-50 w-16 h-16 flex items-center justify-center mx-auto mb-2">
          <Upload className="h-8 w-8 text-doctordicas-blue" />
        </div>
        <h3 className="text-lg font-semibold text-doctordicas-text-dark">
          Arraste ou selecione seus exames
        </h3>
      </div>
      
      <div className="mb-6">
        <p className="text-doctordicas-text-medium mb-2">
          Suportamos exames de sangue, urina, hormônios, imagem e mais
        </p>
        <div className="flex justify-center space-x-3 mb-4">
          <div className="p-2 bg-gray-50 rounded">
            <FileText className="h-6 w-6 text-red-500" />
          </div>
        </div>
        <p className="text-sm text-doctordicas-text-medium">
          PDF, JPG, PNG (máx. 3 arquivos, 10MB cada)
        </p>
      </div>
      
      <div>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-doctordicas-blue"
        >
          <Upload className="h-4 w-4 mr-2" />
          Selecionar arquivos
        </Button>
      </div>
    </div>
  );

  const renderFilesList = () => (
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

  const renderProcessingStatus = () => (
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

  return (
    <div className="container mx-auto px-4 max-w-3xl mb-12">
      <Card className="shadow-md">
        <CardContent className="p-6">
          {files.length === 0 && status === 'idle' ? renderSimpleUploadButton() : null}
          {files.length > 0 && status === 'idle' ? (
            <>
              {renderUploadArea()}
              {renderFilesList()}
            </>
          ) : null}
          {(status === 'uploading' || status === 'processing') && renderProcessingStatus()}
          {status === 'complete' && <ExamResults results={results} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamInterpreter;
