
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
