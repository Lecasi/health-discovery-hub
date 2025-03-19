
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ExamResults from './ExamResults';
import FileUpload from './exam-interpreter/FileUpload';
import FileList from './exam-interpreter/FileList';
import ProcessingStatusComponent from './exam-interpreter/ProcessingStatus';

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

  return (
    <div className="container mx-auto px-4 max-w-3xl mb-12">
      <Card className="shadow-md">
        <CardContent className="p-6">
          {files.length === 0 && status === 'idle' ? (
            <FileUpload 
              onFileChange={handleFileChange}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              dropAreaRef={dropAreaRef}
              fileInputRef={fileInputRef}
              files={files}
              simpleInterface={true}
            />
          ) : null}
          
          {files.length > 0 && status === 'idle' ? (
            <>
              <FileUpload 
                onFileChange={handleFileChange}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                dropAreaRef={dropAreaRef}
                fileInputRef={fileInputRef}
                files={files}
              />
              <FileList 
                files={files}
                removeFile={removeFile}
                simulateProcessing={simulateProcessing}
                status={status}
              />
            </>
          ) : null}
          
          {(status === 'uploading' || status === 'processing') && (
            <ProcessingStatusComponent 
              status={status}
              progress={progress}
            />
          )}
          
          {status === 'complete' && <ExamResults results={results} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamInterpreter;
