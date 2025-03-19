
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  dropAreaRef: React.RefObject<HTMLDivElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  files: any[];
  simpleInterface?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  dropAreaRef,
  fileInputRef,
  files,
  simpleInterface = false
}) => {
  if (simpleInterface) {
    return (
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
          onChange={onFileChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          ref={fileInputRef}
        />
      </div>
    );
  }

  return (
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
        onChange={onFileChange}
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
};

export default FileUpload;
