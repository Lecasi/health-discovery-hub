
export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: 'blue' | 'green' | 'yellow' | 'red';
  publishedAt: string;
  readTime: string;
  author: string;
  authorImage?: string;
  featured?: boolean;
  views?: number;
  comments?: number;
  likes?: number;
  tags?: string[]; // Tags para melhor categorização
  relevance?: {
    gender?: ('male' | 'female' | 'non-binary')[];
    ageGroups?: ('under-18' | '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+')[];
    intent?: ('information' | 'diagnosis' | 'treatment' | 'prevention')[];
  };
}

export interface NewsSectionProps {
  title: string;
  description?: string;
  theme?: 'light' | 'dark' | 'accent';
  items: NewsItem[];
  layout?: 'grid' | 'list' | 'featured';
  className?: string;
}

export const categoryColors = {
  blue: 'bg-blue-100 text-doctordicas-blue',
  green: 'bg-green-100 text-doctordicas-green',
  yellow: 'bg-yellow-100 text-doctordicas-yellow',
  red: 'bg-red-100 text-doctordicas-red',
};

export const themeClasses = {
  light: 'bg-white',
  dark: 'bg-doctordicas-text-dark text-white',
  accent: 'bg-doctordicas-blue text-white',
};

// Função para verificar relevância do conteúdo com base nos dados do usuário
export const checkContentRelevance = (content: NewsItem, userInsights: any): number => {
  if (!userInsights || !content.relevance) return 1; // Relevância padrão
  
  let relevanceScore = 0;
  let criteriaCount = 0;
  
  // Verificar relevância por gênero
  if (content.relevance.gender && userInsights.gender) {
    criteriaCount++;
    if (content.relevance.gender.includes(userInsights.gender)) {
      relevanceScore++;
    }
  }
  
  // Verificar relevância por faixa etária
  if (content.relevance.ageGroups && userInsights.ageGroup) {
    criteriaCount++;
    if (content.relevance.ageGroups.includes(userInsights.ageGroup)) {
      relevanceScore++;
    }
  }
  
  // Verificar relevância por intenção de busca
  if (content.relevance.intent && userInsights.searchIntent) {
    criteriaCount++;
    if (content.relevance.intent.includes(userInsights.searchIntent)) {
      relevanceScore++;
    }
  }
  
  // Se não houver critérios, retornar relevância neutra
  if (criteriaCount === 0) return 1;
  
  // Retornar pontuação de relevância normalizada (0 a 2, onde 1 é neutro)
  return (relevanceScore / criteriaCount) * 2;
};
