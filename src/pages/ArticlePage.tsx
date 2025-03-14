
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
const mockArticles: {[key: string]: Article} = {
  "1": {
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
  },
  "2": {
    id: 2,
    title: '10 superalimentos que combatem inflamação no corpo',
    excerpt: 'Conheça os alimentos com propriedades anti-inflamatórias que podem ajudar a reduzir o processo inflamatório crônico no organismo.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1080&auto=format&fit=crop',
    category: 'Anti-inflamatórios',
    categoryColor: 'blue',
    publishedAt: '4 dias atrás',
    readTime: '7 min de leitura',
    author: 'Dr. Fernando Silva',
    authorImage: 'https://randomuser.me/api/portraits/men/62.jpg',
    views: 765,
    comments: 19,
    likes: 132,
    content: `
      <p>A inflamação crônica é um fator subjacente em muitas doenças modernas, incluindo doenças cardíacas, diabetes, artrite e até mesmo certos tipos de câncer. Felizmente, a natureza oferece uma variedade de alimentos com propriedades anti-inflamatórias que podem ajudar a combater esse processo no organismo.</p>
      
      <h2>O que são alimentos anti-inflamatórios?</h2>
      
      <p>Alimentos anti-inflamatórios são aqueles que contêm compostos bioativos capazes de reduzir a resposta inflamatória no corpo. Esses compostos incluem antioxidantes, polifenóis, ácidos graxos ômega-3 e várias vitaminas e minerais.</p>
      
      <h2>10 superalimentos anti-inflamatórios</h2>
      
      <ol>
        <li>
          <strong>Cúrcuma</strong>
          <p>A curcumina, composto ativo da cúrcuma, é um dos anti-inflamatórios naturais mais potentes conhecidos. Estudos mostram que pode ser tão eficaz quanto alguns medicamentos anti-inflamatórios, sem os efeitos colaterais.</p>
        </li>
        
        <li>
          <strong>Peixes gordurosos</strong>
          <p>Salmão, sardinha, atum e outros peixes gordurosos são ricos em ácidos graxos ômega-3, especialmente EPA e DHA, que ajudam a reduzir a produção de moléculas e substâncias inflamatórias.</p>
        </li>
        
        <li>
          <strong>Frutas vermelhas</strong>
          <p>Mirtilos, framboesas, morangos e amoras contêm antocianinas, que são antioxidantes poderosos com propriedades anti-inflamatórias comprovadas.</p>
        </li>
        
        <li>
          <strong>Azeite de oliva extra virgem</strong>
          <p>Rico em gorduras monoinsaturadas e antioxidantes como o oleocantal, que tem efeitos anti-inflamatórios semelhantes ao ibuprofeno.</p>
        </li>
        
        <li>
          <strong>Verduras de folhas escuras</strong>
          <p>Espinafre, couve e outras verduras contêm altos níveis de vitaminas antioxidantes e flavonoides que combatem a inflamação.</p>
        </li>
        
        <li>
          <strong>Nozes e sementes</strong>
          <p>Ricas em ômega-3 e antioxidantes, as nozes, sementes de linhaça e chia são excelentes aliadas contra a inflamação.</p>
        </li>
        
        <li>
          <strong>Gengibre</strong>
          <p>Contém gingerol, uma substância com poderosas propriedades medicinais e anti-inflamatórias.</p>
        </li>
        
        <li>
          <strong>Alho</strong>
          <p>Compostos sulfurosos no alho ajudam a estimular o sistema imunológico e a combater a inflamação.</p>
        </li>
        
        <li>
          <strong>Chocolate amargo</strong>
          <p>Rico em flavonoides, o chocolate com alto teor de cacau (acima de 70%) tem propriedades anti-inflamatórias.</p>
        </li>
        
        <li>
          <strong>Chá verde</strong>
          <p>Contém EGCG, um catechin com forte ação anti-inflamatória que inibe a produção de citocinas pró-inflamatórias.</p>
        </li>
      </ol>
      
      <h2>Como incorporar esses alimentos na dieta diária</h2>
      
      <p>A chave para obter benefícios anti-inflamatórios é a consistência. Tente incluir vários desses alimentos em suas refeições diárias. Algumas sugestões:</p>
      
      <ul>
        <li>Adicione cúrcuma e gengibre em sopas, curries e smoothies</li>
        <li>Consuma peixes gordurosos pelo menos duas vezes por semana</li>
        <li>Use azeite de oliva extra virgem em saladas e para cozinhar em baixas temperaturas</li>
        <li>Adicione frutas vermelhas ao seu café da manhã</li>
        <li>Inclua uma porção de vegetais de folhas verdes em pelo menos uma refeição por dia</li>
      </ul>
      
      <p>Lembre-se que uma dieta anti-inflamatória não é apenas sobre adicionar esses superalimentos, mas também sobre reduzir o consumo de alimentos pró-inflamatórios como açúcares refinados, carboidratos processados, óleos vegetais refinados e carnes processadas.</p>
    `,
    sources: [
      { name: 'Harvard Health Publishing', url: '#' },
      { name: 'Journal of the American College of Cardiology', url: '#' },
      { name: 'Arthritis Foundation', url: '#' }
    ],
    relatedArticles: [
      {
        id: 1,
        title: 'Alimentos fermentados podem melhorar a saúde intestinal',
        excerpt: 'Iogurte, kefir, kimchi e outros alimentos fermentados são fontes importantes de probióticos que beneficiam o microbioma intestinal.',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=580&auto=format&fit=crop',
        category: 'Microbioma',
        categoryColor: 'green',
        publishedAt: '3 dias atrás',
        readTime: '6 min de leitura',
        author: 'Dra. Marcela Rocha'
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
      }
    ]
  },
  "3": {
    id: 3,
    title: 'Café da manhã proteico pode controlar a fome durante o dia',
    excerpt: 'Estudo demonstra que consumir proteínas no café da manhã ajuda a manter os níveis de glicose estáveis e reduzir a fome ao longo do dia.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1080&auto=format&fit=crop',
    category: 'Nutrição Funcional',
    categoryColor: 'yellow',
    publishedAt: '5 dias atrás',
    readTime: '5 min de leitura',
    author: 'Dra. Juliana Martins',
    authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    views: 654,
    comments: 14,
    likes: 98,
    content: `
      <p>O café da manhã é frequentemente chamado de refeição mais importante do dia, mas a sua composição pode ser ainda mais crucial do que simplesmente fazê-lo. Pesquisas recentes indicam que um café da manhã rico em proteínas pode ser a chave para controlar a fome e os níveis de energia ao longo do dia.</p>
      
      <h2>Por que proteínas no café da manhã?</h2>
      
      <p>As proteínas são macronutrientes essenciais que desempenham várias funções importantes no organismo. Quando consumidas no café da manhã, oferecem benefícios específicos:</p>
      
      <ul>
        <li><strong>Maior saciedade</strong> - As proteínas levam mais tempo para serem digeridas, o que prolonga a sensação de saciedade</li>
        <li><strong>Estabilização da glicemia</strong> - Ajudam a evitar picos e quedas bruscas nos níveis de açúcar no sangue</li>
        <li><strong>Redução do cortisol matinal</strong> - Podem ajudar a regular os níveis de cortisol, o hormônio do estresse</li>
        <li><strong>Preservação de massa muscular</strong> - Fornecem aminoácidos essenciais para manutenção dos músculos</li>
      </ul>
      
      <h2>O que diz a ciência</h2>
      
      <p>Um estudo publicado no American Journal of Clinical Nutrition acompanhou participantes que consumiram cafés da manhã com diferentes teores de proteínas. Aqueles que consumiram um café da manhã contendo cerca de 25-30g de proteínas experimentaram:</p>
      
      <ul>
        <li>Redução de 60% nos desejos por lanches noturnos</li>
        <li>Menor sensação de fome antes do almoço</li>
        <li>Níveis mais estáveis de glicose e insulina ao longo do dia</li>
        <li>Redução média de 175 calorias no consumo total diário</li>
      </ul>
      
      <h2>Opções de café da manhã rico em proteínas</h2>
      
      <p>Existem muitas maneiras deliciosas de adicionar mais proteínas ao seu café da manhã:</p>
      
      <ol>
        <li>
          <strong>Ovos</strong>
          <p>Versáteis e completos, dois ovos fornecem cerca de 12g de proteínas de alta qualidade. Podem ser preparados de diversas formas: cozidos, mexidos, em omelete ou pochê.</p>
        </li>
        
        <li>
          <strong>Iogurte grego</strong>
          <p>Uma porção de 200g pode conter até 20g de proteínas. Adicione frutas, nozes ou sementes para aumentar o valor nutricional.</p>
        </li>
        
        <li>
          <strong>Shake de proteínas</strong>
          <p>Prático e rápido, um shake feito com proteína do soro do leite (whey protein), frutas e leite ou água pode fornecer 20-30g de proteínas.</p>
        </li>
        
        <li>
          <strong>Aveia com fontes proteicas</strong>
          <p>A aveia por si só tem um conteúdo razoável de proteínas, mas pode ser enriquecida com iogurte grego, leite, sementes de chia ou pasta de amendoim.</p>
        </li>
        
        <li>
          <strong>Tofu scramble</strong>
          <p>Uma excelente alternativa vegana aos ovos mexidos, o tofu amassado e temperado oferece uma boa dose de proteínas vegetais.</p>
        </li>
      </ol>
      
      <h2>Dicas para implementar um café da manhã proteico</h2>
      
      <ul>
        <li>Planeje com antecedência para evitar a pressa matinal</li>
        <li>Prepare opções que possam ser transportadas se você costuma comer fora de casa</li>
        <li>Combine proteínas com fibras e gorduras saudáveis para maximizar a saciedade</li>
        <li>Evite adicionar açúcares refinados que podem anular os benefícios da estabilização glicêmica</li>
      </ul>
      
      <p>Ao fazer uma mudança simples como aumentar o conteúdo proteico do café da manhã, você pode experimentar melhorias significativas no controle do apetite, nos níveis de energia e potencialmente até na composição corporal ao longo do tempo.</p>
    `,
    sources: [
      { name: 'American Journal of Clinical Nutrition', url: '#' },
      { name: 'International Journal of Obesity', url: '#' },
      { name: 'Journal of Nutrition', url: '#' }
    ],
    relatedArticles: [
      {
        id: 1,
        title: 'Alimentos fermentados podem melhorar a saúde intestinal',
        excerpt: 'Iogurte, kefir, kimchi e outros alimentos fermentados são fontes importantes de probióticos que beneficiam o microbioma intestinal.',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=580&auto=format&fit=crop',
        category: 'Microbioma',
        categoryColor: 'green',
        publishedAt: '3 dias atrás',
        readTime: '6 min de leitura',
        author: 'Dra. Marcela Rocha'
      },
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
      }
    ]
  }
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
      if (id && mockArticles[id]) {
        setArticle(mockArticles[id]);
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
