
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Settings, Heart, History, 
  FileEdit, LogOut, Bell, Calendar, 
  ChevronRight 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ProfileFavorites from '@/components/profile/ProfileFavorites';
import ProfileHistory from '@/components/profile/ProfileHistory';
import ProfileConsultations from '@/components/profile/ProfileConsultations';

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Acesso negado',
        description: 'Você precisa estar logado para acessar esta página',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isAuthenticated, navigate, toast]);

  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path === 'perfil' || path === '') {
      setActiveTab('info');
    } else {
      setActiveTab(path || 'info');
    }
  }, [location]);

  // Sidebar navigation items
  const navItems = [
    { id: 'info', label: 'Informações Pessoais', icon: User, path: '/perfil' },
    { id: 'favorites', label: 'Favoritos', icon: Heart, path: '/perfil/favorites' },
    { id: 'history', label: 'Histórico de Saúde', icon: History, path: '/perfil/history' },
    { id: 'consultations', label: 'Minhas Consultas', icon: Calendar, path: '/perfil/consultations' },
    { id: 'settings', label: 'Configurações', icon: Settings, path: '/perfil/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-doctordicas-bg-light flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-doctordicas-blue-light mb-4 overflow-hidden">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-doctordicas-blue">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-doctordicas-text-dark">{user?.name}</h3>
                  <p className="text-sm text-doctordicas-text-medium">{user?.email}</p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                    asChild
                  >
                    <Link to="/perfil/settings">
                      <FileEdit className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </Link>
                  </Button>
                </div>
                
                <Separator />
                
                <nav className="p-2">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <Link 
                          to={item.path}
                          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                            activeTab === item.id 
                              ? 'bg-doctordicas-blue-light text-doctordicas-blue font-medium' 
                              : 'text-doctordicas-text-medium hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.label}
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <Separator />
                
                <div className="p-4">
                  <Button
                    variant="outline"
                    className="w-full justify-between text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair da Conta
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <Routes>
                  <Route path="/" element={<ProfileInfo />} />
                  <Route path="/favorites" element={<ProfileFavorites />} />
                  <Route path="/history" element={<ProfileHistory />} />
                  <Route path="/consultations" element={<ProfileConsultations />} />
                  <Route path="/settings" element={<ProfileSettings />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
