export const brandName = 'Retro Store';

export const categoryInfo = {
  chocolates: {
    label: 'Chocolates',
    icon: '🍫',
    description: 'Doces, barras e caixas premium para todos os gostos.'
  },
  ferramentas: {
    label: 'Ferramentas',
    icon: '🔧',
    description: 'Itens para reparos, montagem e manutencao domestica.'
  },
  higiene: {
    label: 'Higiene',
    icon: '🧼',
    description: 'Cuidados pessoais para rotina completa.'
  },
  mercearia: {
    label: 'Mercearia',
    icon: '🛒',
    description: 'Itens de mercado para abastecer a casa.'
  },
  tecnologia: {
    label: 'Tecnologia',
    icon: '💻',
    description: 'Gadgets e acessorios para produtividade.'
  }
};

const productTemplates = {
  chocolates: [
    'Chocolate 1 ao leite 90g',
    'Chocolate 2 meio amargo 80g',
    'Chocolate 3 branco com cookies',
    'Bombom artesanal avela',
    'Tablete trufado caramelo',
    'Caixa mix retro cacau',
    'Drageado crocante classic',
    'Barra intensa 70% cacau'
  ],
  ferramentas: [
    'Chave de fenda 1 ponta reta',
    'Chave de fenda 2 ponta cruz',
    'Alicate universal 8 polegadas',
    'Trena compacta 5m',
    'Martelo emborrachado 500g',
    'Parafusadeira sem fio 12v',
    'Jogo de brocas multiuso',
    'Nivelador de mao aluminio'
  ],
  higiene: [
    'Sabonete liquido suave',
    'Shampoo hidratante diario',
    'Condicionador reparacao intensa',
    'Escova dental ultra macia',
    'Creme dental fresh mint',
    'Protetor solar facial fps50',
    'Desodorante roll-on clean',
    'Kit cuidados premium pele'
  ],
  mercearia: [
    'Arroz tipo 1 premium 5kg',
    'Feijao carioca selecionado 1kg',
    'Cafe torrado e moido 500g',
    'Macarrao espaguete classic',
    'Molho de tomate caseiro',
    'Azeite extra virgem 500ml',
    'Biscoito amanteigado retro',
    'Suco integral de uva 1L'
  ],
  tecnologia: [
    'Fone bluetooth retro bass',
    'Carregador turbo usb-c 30w',
    'Mouse sem fio ergonomico',
    'Teclado mecanico compacto',
    'Suporte articulado notebook',
    'Webcam full hd 1080p',
    'Hub usb multiplo 6 portas',
    'Power bank 20000mah'
  ]
};

const imagePool = {
  chocolates: [
    'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80'
  ],
  ferramentas: [
    'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1581147036324-c1c1506f5f6b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1581579188871-45ea61f2aeb8?auto=format&fit=crop&w=900&q=80'
  ],
  higiene: [
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80'
  ],
  mercearia: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80'
  ],
  tecnologia: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
  ]
};

const badges = ['Frete gratis', 'Entrega hoje', 'Loja oficial', 'Oferta retro'];

const categoryKeys = Object.keys(categoryInfo);

const pick = (arr, index) => arr[index % arr.length];

export const products = Array.from({ length: 560 }, (_, index) => {
  const id = index + 1;
  const category = pick(categoryKeys, index);
  const template = pick(productTemplates[category], index);
  const image = pick(imagePool[category], index);
  const rating = Number((4 + ((index * 17) % 10) / 10).toFixed(1));
  const price = Number((18 + ((index * 13) % 380) + (index % 3) * 0.9).toFixed(2));
  const reviews = 50 + ((index * 11) % 900);

  return {
    id,
    slug: `produto-${id}`,
    name: template,
    category,
    image,
    badge: pick(badges, index),
    rating,
    reviews,
    price,
    stock: 5 + ((index * 7) % 70),
    description: `${categoryInfo[category].description} Item ideal para quem quer praticidade no dia a dia.`,
    shippingDays: 1 + ((index * 3) % 7)
  };
});

export const paymentMethods = [
  { id: 'credit', label: 'Cartao de credito' },
  { id: 'pix', label: 'Pix (simulado)' },
  { id: 'boleto', label: 'Boleto digital' }
];

export const shippingOptions = [
  { id: 'express', label: 'Entrega expressa', price: 34.9, eta: '1-2 dias uteis' },
  { id: 'standard', label: 'Entrega padrao', price: 19.5, eta: '3-5 dias uteis' },
  { id: 'economy', label: 'Entrega economica', price: 9.9, eta: '6-9 dias uteis' }
];

export const homepageHighlights = [
  {
    title: 'Semana Retro de Chocolates',
    text: 'Combinacoes especiais para presentear e vender mais.',
    cta: 'Ver ofertas'
  },
  {
    title: 'Ferramentas com envio rapido',
    text: 'Chave de fenda, kits e acessorios para reparos imediatos.',
    cta: 'Explorar ferramentas'
  },
  {
    title: 'Higiene e mercearia no mesmo carrinho',
    text: 'Monte pedidos completos com simulacao de frete em tempo real.',
    cta: 'Comecar compra'
  }
];

export const formatCurrency = (value) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
