
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
            }
          ],
          recommendations: [
            "Reduzir o consumo de carboidratos refinados e açúcares",
            "Aumentar a atividade física para pelo menos 150 minutos por semana",
            "Considerar consulta com endocrinologista para avaliação da glicose elevada"
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

  const renderResults = () => (
    <div className="mt-6 p-6 border rounded-lg bg-white">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
          <h3 className="text-xl font-semibold text-doctordicas-text-dark">
            Interpretação concluída
          </h3>
        </div>
        <p className="text-doctordicas-text-medium text-center">
          {results.summary}
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-lg text-doctordicas-text-dark">Parâmetros analisados</h4>
        <div className="space-y-4">
          {results.parameters.map((param: any, index: number) => (
            <div key={index} className="p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium text-doctordicas-text-dark">{param.name}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  param.status === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : param.status === 'low'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {param.status === 'high' 
                    ? 'Elevado' 
                    : param.status === 'low'
                      ? 'Baixo'
                      : 'Normal'}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Seu resultado: <strong>{param.value}</strong></span>
                <span>Referência: {param.reference}</span>
              </div>
              <p className="text-sm text-doctordicas-text-medium">{param.explanation}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium text-lg text-doctordicas-text-dark">Recomendações</h4>
        <ul className="space-y-2 list-disc list-inside text-doctordicas-text-medium">
          {results.recommendations.map((rec: string, index: number) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start">
        <AlertCircle className="h-5 w-5 text-doctordicas-blue mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-doctordicas-text-medium">
          <strong>Importante:</strong> Esta interpretação é uma análise automatizada e não substitui a avaliação de um profissional de saúde. Sempre consulte seu médico para entender completamente seus resultados.
        </p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 max-w-3xl mb-12">
      <Card className="shadow-md">
        <CardContent className="p-6">
          {status === 'idle' && renderUploadArea()}
          {files.length > 0 && status === 'idle' && renderFilesList()}
          {(status === 'uploading' || status === 'processing') && renderProcessingStatus()}
          {status === 'complete' && renderResults()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamInterpreter;
