
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Eye, MessageSquare, ThumbsUp, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '@/types/article';
import { categoryColors } from '@/components/news/types';
import { Button } from '@/components/ui/button';
import RelatedArticles from '@/components/articles/RelatedArticles';
import ArticleNotFound from '@/components/articles/ArticleNotFound';
import { useToast } from '@/hooks/use-toast';

// Mock data - seria substituído por chamada à API
const mockArticle: Article = {
  id: 1,
  title: 'Alimentos fermentados podem melhorar a saúde intestinal',
  excerpt: 'Iogurte, kefir, kimchi e outros alimentos fermentados são fontes importantes de probióticos que beneficiam o microbioma intestinal.',
  image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1080&auto=format&fit=crop',
  category: 'Microbioma',
  categoryColor: 'green',
  publishedAt: '3 dias atrás',
  readTime: '6 min de leitura',
  author: 'Dra. Marcela Rocha',
  authorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  views: 876,
  comments: 23,
  likes: 145,
  content: `
    <p>Os alimentos fermentados têm sido consumidos por milhares de anos, mas apenas recentemente a ciência começou a entender completamente seus benefícios para a saúde intestinal. A fermentação é um processo no qual bactérias benéficas e leveduras transformam os carboidratos em álcoois, ácidos ou gases, criando alimentos com perfis de sabor únicos e benefícios nutricionais aumentados.</p>
    
    <h2>O que são alimentos fermentados?</h2>
    
    <p>Alimentos fermentados incluem uma variedade de produtos, como:</p>
    
    <ul>
      <li><strong>Iogurte</strong> - Leite fermentado por bactérias lácticas</li>
      <li><strong>Kefir</strong> - Uma bebida fermentada feita com grãos de kefir</li>
      <li><strong>Kimchi</strong> - Um condimento coreano feito de vegetais fermentados</li>
      <li><strong>Kombucha</strong> - Um chá fermentado com sabor levemente ácido</li>
      <li><strong>Chucrute</strong> - Repolho fermentado popular na culinária alemã</li>
      <li><strong>Missô</strong> - Pasta de soja fermentada usada na culinária japonesa</li>
    </ul>
    
    <h2>Benefícios para a saúde intestinal</h2>
    
    <p>Os alimentos fermentados são ricos em probióticos, que são microrganismos vivos que, quando consumidos em quantidades adequadas, conferem benefícios à saúde do hospedeiro. Esses probióticos podem:</p>
    
    <ol>
      <li>Melhorar a diversidade do microbioma intestinal</li>
      <li>Ajudar na digestão e absorção de nutrientes</li>
      <li>Fortalecer a barreira intestinal</li>
      <li>Reduzir inflamação no trato digestivo</li>
      <li>Ajudar a prevenir ou tratar diarreias e constipação</li>
      <li>Produzir vitaminas do complexo B e K</li>
    </ol>
    
    <p>Estudos recentes têm demonstrado que o consumo regular de alimentos fermentados está associado a uma maior diversidade microbiana intestinal, o que é considerado um marcador de boa saúde intestinal.</p>
    
    <h2>Como incorporar alimentos fermentados na dieta</h2>
    
    <p>Para obter os benefícios dos alimentos fermentados, especialistas recomendam o consumo regular e variado. Aqui estão algumas dicas:</p>
    
    <ul>
      <li>Comece com pequenas porções para permitir que seu sistema digestivo se adapte</li>
      <li>Experimente diferentes tipos de alimentos fermentados</li>
      <li>Prefira versões não pasteurizadas, que contêm culturas vivas</li>
      <li>Considere fazer seus próprios alimentos fermentados em casa</li>
    </ul>
    
    <p>É importante notar que pessoas com sistemas imunológicos comprometidos devem consultar um médico antes de consumir alimentos fermentados não pasteurizados.</p>
  `,
  sources: [
    { name: 'Journal of Food Science', url: '#' },
    { name: 'Gut Microbiota for Health', url: '#' },
    { name: 'American Journal of Clinical Nutrition', url: '#' }
  ],
  relatedArticles: [
    {
      id: 2,
      title: '10 superalimentos que combatem inflamação no corpo',
      excerpt: 'Conheça os alimentos com propriedades anti-inflamatórias que podem ajudar a reduzir o processo inflamatório crônico no organismo.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=580&auto=format&fit=crop',
      category: 'Anti-inflamatórios',
      categoryColor: 'blue',
      publishedAt: '4 dias atrás',
      readTime: '7 min de leitura',
      author: 'Dr. Fernando Silva'
    },
    {
      id: 3,
      title: 'Café da manhã proteico pode controlar a fome durante o dia',
      excerpt: 'Estudo demonstra que consumir proteínas no café da manhã ajuda a manter os níveis de glicose estáveis e reduzir a fome ao longo do dia.',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=580&auto=format&fit=crop',
      category: 'Nutrição Funcional',
      categoryColor: 'yellow',
      publishedAt: '5 dias atrás',
      readTime: '5 min de leitura',
      author: 'Dra. Juliana Martins'
    },
    {
      id: 4,
      title: 'Probióticos e prebióticos: qual a diferença e como funcionam juntos',
      excerpt: 'Entenda como probióticos e prebióticos trabalham em conjunto para melhorar a saúde intestinal e fortalecer o sistema imunológico.',
      image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=580&auto=format&fit=crop',
      category: 'Microbioma',
      categoryColor: 'green',
      publishedAt: '1 semana atrás',
      readTime: '8 min de leitura',
      author: 'Dr. André Santos'
    }
  ]
};

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Em um ambiente real, aqui seria feita uma chamada à API
    setLoading(true);
    
    // Simulação de chamada à API
    setTimeout(() => {
      if (id === '1') {
        setArticle(mockArticle);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description: "O link deste artigo foi copiado para sua área de transferência.",
      duration: 3000,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="h-80 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return <ArticleNotFound />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/artigos" 
          className="inline-flex items-center text-doctordicas-text-medium hover:text-doctordicas-blue transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar para artigos
        </Link>
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${categoryColors[article.categoryColor]}`}>
          {article.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-doctordicas-text-dark mb-6">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap gap-4 md:gap-8 mb-6 text-doctordicas-text-medium">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{article.publishedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>{article.views} visualizações</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {article.authorImage ? (
            <img 
              src={article.authorImage} 
              alt={article.author} 
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {article.author.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-doctordicas-text-dark">{article.author}</p>
            <p className="text-sm text-doctordicas-text-medium">Especialista em Nutrição</p>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full rounded-2xl object-cover h-64 md:h-96"
        />
      </div>

      {/* Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t">
            {/* Sources */}
            {article.sources && article.sources.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Fontes e referências</h3>
                <ul className="space-y-2">
                  {article.sources.map((source, index) => (
                    <li key={index} className="flex items-center">
                      <ExternalLink size={14} className="text-doctordicas-blue mr-2" />
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-doctordicas-blue hover:underline"
                      >
                        {source.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Social Sharing */}
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-doctordicas-text-medium">Compartilhar:</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShareArticle}
                >
                  Copiar link
                </Button>
              </div>
            </div>
            
            {/* Reactions */}
            <div className="flex gap-6 mt-8">
              <button className="flex items-center gap-2 hover:text-doctordicas-blue transition-colors">
                <ThumbsUp size={18} />
                <span>{article.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-doctordicas-blue transition-colors">
                <MessageSquare size={18} />
                <span>{article.comments} comentários</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-4">
          {/* Related Articles */}
          {article.relatedArticles && (
            <RelatedArticles articles={article.relatedArticles} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
