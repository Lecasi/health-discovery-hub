
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="bg-doctordicas-blue text-white font-bold py-2 px-4 rounded-lg inline-block">
              doctordicas.com
            </div>
            <p className="text-gray-400 mt-2 text-sm">
              © 2023 doctordicas.com • As informações não substituem consultas médicas
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
