export const brandName = 'Carmelita Festas';

export const categoryInfo = {
  doces: {
    label: 'Doces',
    icon: 'DO',
    description: 'Bombons, balas e kits para festas e lembrancinhas.'
  },
  embalagens: {
    label: 'Embalagens',
    icon: 'EM',
    description: 'Caixas, fitas, sacos e papeis para embalar com estilo.'
  },
  festas: {
    label: 'Artigos de Festa',
    icon: 'AF',
    description: 'Decorações, descartáveis e itens temáticos para aniversários.'
  },
  fantasias: {
    label: 'Fantasias',
    icon: 'FA',
    description: 'Acessórios e roupas para carnaval, festa a fantasia e brincadeiras.'
  },
  criativos: {
    label: 'Criativos',
    icon: 'CR',
    description: 'Adesivos, tags e materiais para personalizar brindes e lembranças.'
  }
};

const productTemplates = {
  doces: [
    'Mix de balas sortidas 300g',
    'Bombom artesanal sortido 12un',
    'Brigadeiro gourmet em copinho',
    'Tablete de chocolate decorado',
    'Trufa recheada premium 6un',
    'Pirulito artesanal colorido 10un',
    'Kit mini cupcakes festa 8un',
    'Bala de goma nostalgic 200g'
  ],
  embalagens: [
    'Caixa kraft decorada 10un',
    'Saco celofan 20x30cm 15un',
    'Fita cetim 10mm 20m',
    'Tag personalizada kraft 12un',
    'Papel seda colorido 5 folhas',
    'Bolsa papel festa 8un',
    'Caixa com visor 12un',
    'Embalagem para doces 50un'
  ],
  festas: [
    'Kit decoracao de baloes 40pcs',
    'Pratos e copos descartaveis',
    'Chapeu cone de festa 10un',
    'Toalha de mesa plastica',
    'Painel de parede em papel metalizado',
    'Caixa de confetes coloridos 250g',
    'Guirlanda festa surpresa',
    'Fitas decorativas para mesa'
  ],
  fantasias: [
    'Mascara carnaval glitter',
    'Peruca colorida festa',
    'Tiara princesa com brilhos',
    'Acessorio varinha de fada',
    'Capa vampiro infantil',
    'Maquiagem facial de carnaval',
    'Chapeu pirata adulto',
    'Saia tutu colorida'
  ],
  criativos: [
    'Adesivos decorativos 50un',
    'Molde silicone lembrancinha',
    'Stencil letras festa',
    'Caneta metalica para papel',
    'Mini laço de cetim 40un',
    'Fitilho decorativo 20m',
    'Tag de agradecimento 20un',
    'Mini bandeirola de papel 12un'
  ]
};

const imagePool = {
  doces: [
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1610448571322-3d5a5d1d1f4b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1547517028-79d0d34e57b4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80'
  ],
  embalagens: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1508051123996-69f8caf4891f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1514409149934-5d32cc0d82d1?auto=format&fit=crop&w=900&q=80'
  ],
  festas: [
    'https://images.unsplash.com/photo-1524777312-0298f4b55bd0?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1532635249-8d6a4d0bb1e3?auto=format&fit=crop&w=900&q=80'
  ],
  fantasias: [
    'https://images.unsplash.com/photo-1522098543979-ffc7f79d12a8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1544177156-29f5d69f1b36?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1528731708534-816fe59f90c7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  ],
  criativos: [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1483389127114-0d5e5271112c?auto=format&fit=crop&w=900&q=80'
  ]
};

const badges = ['Frete gratis', 'Entrega hoje', 'Loja oficial', 'Oferta de festa'];

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
    title: 'Doces e lembrancinhas para festa',
    text: 'Encontre opções prontas e personalizadas para aniversários e eventos.',
    cta: 'Ver doces'
  },
  {
    title: 'Embalagens para presentes e doces',
    text: 'Caixas, sacos e fitas para deixar sua entrega ainda mais bonita.',
    cta: 'Explorar embalagens'
  },
  {
    title: 'Fantasias e artigos temáticos',
    text: 'Itens para brincar, decorar e montar looks de festa completos.',
    cta: 'Montar sua festa'
  }
];

export const formatCurrency = (value) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
