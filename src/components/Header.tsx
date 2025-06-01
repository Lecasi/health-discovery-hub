import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, Search, Bell, ChevronDown, Heart, FileText, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import SearchBar from '@/components/SearchBar';

const Header = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<'sign-in' | 'sign-up'>('sign-in');
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: '/artigos', label: 'Artigos', icon: FileText },
    { to: '/diagnostico', label: 'Diagnóstico', icon: Heart },
    { to: '/exames', label: 'Exames', icon: FileText },
    { to: '/consulta', label: 'Consulta', icon: MessageCircle },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 text-sm font-medium transition-colors hover:text-doctordicas-blue px-3 py-2 rounded-md',
      isActive
        ? 'text-doctordicas-blue bg-blue-50'
        : 'text-doctordicas-text-medium'
    );

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const openAuthModal = (view: 'sign-in' | 'sign-up') => {
    setAuthModalView(view);
    setShowAuthModal(true);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-gradient-to-r from-doctordicas-blue to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl inline-block group-hover:shadow-lg transition-all duration-300">
              <span className="text-lg">doctordicas</span>
              <span className="text-sm opacity-90">.com</span>
            </div>
          </Link>

          {/* Navigation for desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClasses}>
                <link.icon size={16} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side elements */}
          <div className="flex items-center space-x-3">
            {/* Search button */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full text-doctordicas-text-medium hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl p-4 border border-gray-200 z-50">
                  <SearchBar />
                </div>
              )}
            </div>

            {/* Emergency CTA for desktop */}
            <div className="hidden md:block">
              <Link to="/diagnostico">
                <Button 
                  size="sm" 
                  className="bg-doctordicas-red hover:bg-red-600 text-white font-medium"
                >
                  Emergência
                </Button>
              </Link>
            </div>

            {/* Notifications - only for logged in users */}
            {user && (
              <button
                className="p-2.5 rounded-full text-doctordicas-text-medium hover:bg-gray-100 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* User menu or login buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-doctordicas-blue text-white text-sm">
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-doctordicas-text-medium" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name || 'Usuário'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="cursor-pointer">Meu Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/perfil/historico" className="cursor-pointer">Histórico Médico</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/perfil/consultas" className="cursor-pointer">Minhas Consultas</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => openAuthModal('sign-in')}
                  className="font-medium"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => openAuthModal('sign-up')}
                  className="font-medium"
                >
                  Cadastrar
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <Link to="/" className="flex items-center">
                      <div className="bg-doctordicas-blue text-white font-bold py-2 px-4 rounded-lg inline-block">
                        doctordicas.com
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="py-4">
                    <SearchBar />
                  </div>

                  <nav className="flex flex-col space-y-2 py-4">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                            isActive
                              ? 'bg-blue-50 text-doctordicas-blue'
                              : 'text-doctordicas-text-medium hover:bg-gray-100'
                          )
                        }
                      >
                        <link.icon size={18} />
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>

                  <div className="mt-auto py-4">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 px-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name || 'Usuário'}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Link
                            to="/perfil"
                            className="block px-2 py-1 rounded-md text-doctordicas-text-medium hover:bg-gray-100 transition-colors"
                          >
                            Meu Perfil
                          </Link>
                          <Link
                            to="/perfil/historico"
                            className="block px-2 py-1 rounded-md text-doctordicas-text-medium hover:bg-gray-100 transition-colors"
                          >
                            Histórico Médico
                          </Link>
                          <Link
                            to="/perfil/consultas"
                            className="block px-2 py-1 rounded-md text-doctordicas-text-medium hover:bg-gray-100 transition-colors"
                          >
                            Minhas Consultas
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left px-2 py-1 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Sair
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setIsMenuOpen(false);
                            openAuthModal('sign-in');
                          }}
                        >
                          Entrar
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => {
                            setIsMenuOpen(false);
                            openAuthModal('sign-up');
                          }}
                        >
                          Cadastrar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
