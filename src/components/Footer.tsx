
import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-doctordicas-blue text-white font-bold py-2 px-4 rounded-lg inline-block mb-4">
              doctordicas.com
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Informações de saúde confiáveis e verificadas por especialistas, conectando você às melhores soluções para suas necessidades.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-doctordicas-blue transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-doctordicas-blue transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-doctordicas-blue transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Receba nossas dicas de saúde</h3>
            <p className="text-gray-400 mb-4">
              Assine nossa newsletter e fique por dentro das novidades em saúde
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="w-full pl-10 pr-4 py-2.5 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-doctordicas-blue/30 focus:border-doctordicas-blue"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-doctordicas-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-r-lg font-medium transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Assinar'}
                </button>
              </div>
              
              {subscriptionStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm animate-fade-in">
                  <CheckCircle size={16} />
                  <span>Cadastrado com sucesso! Obrigado.</span>
                </div>
              )}
              
              {subscriptionStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
                  <AlertCircle size={16} />
                  <span>Por favor, insira um e-mail válido.</span>
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2023 doctordicas.com • As informações não substituem consultas médicas
          </p>
          
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
