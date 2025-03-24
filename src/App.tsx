
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import DiagnosticPage from "./pages/DiagnosticPage";
import DiagnosticResultsPage from "./pages/DiagnosticResultsPage";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ConsultationPage from "./pages/ConsultationPage";
import ExamInterpreterPage from "./pages/ExamInterpreterPage";
import ComparadorPrecos from "./pages/ComparadorPrecos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/artigos" element={<ArticlesListPage />} />
            <Route path="/artigos/:id" element={<ArticlePage />} />
            <Route path="/categoria/:categoryId" element={<CategoryPage />} />
            <Route path="/diagnostico" element={<DiagnosticPage />} />
            <Route path="/diagnostico/resultados/:id" element={<DiagnosticResultsPage />} />
            <Route path="/perfil/*" element={<ProfilePage />} />
            <Route path="/busca" element={<SearchResultsPage />} />
            <Route path="/consulta" element={<ConsultationPage />} />
            <Route path="/exames" element={<ExamInterpreterPage />} />
            <Route path="/comparador" element={<ComparadorPrecos />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
