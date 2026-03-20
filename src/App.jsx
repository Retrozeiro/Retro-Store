import { useEffect, useMemo, useState } from 'react';

const categoryInfo = {
  Higiene: { icon: '🧼', description: 'Cuidados diários para pele, cabelo e higiene bucal' },
  Ferramenta: { icon: '🛠️', description: 'Ferramentas e acessórios prontos para manutenção leve' },
  Comida: { icon: '🥗', description: 'Snacks, ingredientes e suplementos para o dia a dia' },
  Casa: { icon: '🛋️', description: 'Pequenos itens para organizar o lar' },
  Tecnologia: { icon: '💡', description: 'Gadgets e energia para complementar o ambiente' }
};

const categories = ['Todos', ...Object.keys(categoryInfo)];

const badgeOptions = ['Frete grátis', 'Venda oficial', 'Mercado Pontos', 'Oferta relâmpago'];

const imageLibrary = {
  Higiene: [
    'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc65c?auto=format&fit=crop&w=600&q=80'
  ],
  Ferramenta: [
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1601988413535-06b91143091c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1509022476081-4796a75f7a2f?auto=format&fit=crop&w=600&q=80'
  ],
  Comida: [
    'https://images.unsplash.com/photo-1600180758890-15b0a1b90761?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505253216360-7c89badf6a5a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1481391026234-3e3b0effa7b2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
  ],
  Casa: [
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=600&q=80'
  ],
  Tecnologia: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519222970733-f546218fa6b2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80'
  ]
};

const pages = ['Início', 'Ofertas', 'Categorias', 'Minha Conta'];

const carouselDeals = [
  {
    title: 'Kit Fresh Care',
    description: 'Selecionamos cuidados de higiene em embalagem compacta para tropicalizar o momento wellness.',
    highlight: '+15% de energia renovada',
    category: 'Higiene'
  },
  {
    title: 'Oficina Express',
    description: 'Ferramentas premium com acabamento resistente, prontas para ajustes rápidos em casa.',
    highlight: 'Frete fictício em até 2 dias',
    category: 'Ferramenta'
  },
  {
    title: 'Estoque saboroso',
    description: 'Lanches, cafés e ingredientes preparados para abastecer a despensa sem pesar no bolso.',
    highlight: 'Combo imaginário com 5 itens gratuitos',
    category: 'Comida'
  },
  {
    title: 'Lar iluminado',
    description: 'Itens para casa com texturas suaves e tecnologia conectada para um ambiente mais acolhedor.',
    highlight: 'Validade apenas nesta simulação',
    category: 'Casa'
  },
  {
    title: 'Energia inteligente',
    description: 'Gadgets e carregadores que combinam estética e inteligência para quem vive online.',
    highlight: '3 kits visualizados por segundo',
    category: 'Tecnologia'
  }
];

const baseItems = {
  Higiene: [
    'Sabonete líquido',
    'Shampoo neutro',
    'Condicionador leve',
    'Desodorante roll-on',
    'Álcool em gel',
    'Creme dental',
    'Lenço umedecido',
    'Escova dental compacta'
  ],
  Ferramenta: [
    'Jogo de chaves',
    'Furadeira compacta',
    'Supercola industrial',
    'Trena digital',
    'Lâmpada LED',
    'Kit de pintura rápida'
  ],
  Comida: [
    'Barra de cereal',
    'Granola crocante',
    'Óleo de coco',
    'Molho pronto',
    'Café em cápsulas',
    'Chá orgânico'
  ],
  Casa: [
    'Velas aromáticas',
    'Organizador modular',
    'Toalha de mão',
    'Difusor de aromas',
    'Kit de cama aérea'
  ],
  Tecnologia: [
    'Carregador USB-C',
    'Power bank slim',
    'Cabo trançado',
    'Hub multiportas',
    'Luz inteligente',
    'Suporte articulado'
  ]
};

const adjectives = ['Essencial', 'Premium', 'Smart', 'Compacto', 'Resistente', 'Clássico', 'Design', 'Fresh', 'Turbo', 'Eco'];
const descriptors = ['de viagem', 'para uso diário', 'com acabamento fosco', 'com toque suave', 'em edição limitada', 'com refil incluso', 'com visual minimalista'];

const generateProducts = (count = 500) => {
  const products = [];
  let seed = 0;
  const categoryKeys = Object.keys(baseItems);
  while (products.length < count) {
    const category = categoryKeys[seed % categoryKeys.length];
    const options = baseItems[category];
    const baseName = options[seed % options.length];
    const name = `${adjectives[seed % adjectives.length]} ${baseName} ${descriptors[(seed * 3) % descriptors.length]}`;
    const price = Number((Math.random() * 220 + 18).toFixed(2));
    const stock = 5 + ((seed * 7) % 46);
    const deliveryTime = 1 + ((seed * 4) % 9);
    const rating = Number((Math.random() * 1.2 + 3.6).toFixed(1));
    const reviews = 30 + ((seed * 13) % 480);
    const badge = badgeOptions[(seed + 1) % badgeOptions.length];
    const imageSet = imageLibrary[category] ?? Object.values(imageLibrary).flat();
    const image = imageSet[seed % imageSet.length];
    products.push({
      id: seed + 1,
      name,
      category,
      price,
      stock,
      deliveryTime,
      icon: categoryInfo[category].icon,
      description: `${categoryInfo[category].description} com acabamento ${descriptors[(seed + 1) % descriptors.length]}.`,
      rating,
      reviews,
      badge,
      image
    });
    seed += 1;
  }
  return products;
};

const formatCurrency = (value) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

const App = () => {
  const [products] = useState(() => generateProducts(520));
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [categoryFilters, setCategoryFilters] = useState(['Todos']);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [loginForm, setLoginForm] = useState({ name: '', email: '' });
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [purchaseNotice, setPurchaseNotice] = useState('');
  const [selectedProducts, setSelectedProducts] = useState({});
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [activePage, setActivePage] = useState('Categorias');
  const [priceFilter, setPriceFilter] = useState(320);

  const productMap = useMemo(() => {
    const map = {};
    products.forEach((product) => {
      map[product.id] = product;
    });
    return map;
  }, [products]);

  const activeCategories = useMemo(() => {
    if (categoryFilters.includes('Todos')) {
      return Object.keys(categoryInfo);
    }
    return categoryFilters;
  }, [categoryFilters]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategories.includes(product.category);
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price <= priceFilter;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, activeCategories, searchTerm, priceFilter]);

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const categoryTotals = useMemo(() => {
    return products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const featuredOffers = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating - a.rating || a.price - b.price)
      .slice(0, 6);
  }, [products]);

  const selectedCount = Object.keys(selectedProducts).length;
  const selectedTotal = selectedCount
    ? Object.keys(selectedProducts).reduce((total, id) => {
        const product = productMap[id];
        return product ? total + product.price : total;
      }, 0)
    : 0;

  const toggleCategoryFilter = (category) => {
    if (category === 'Todos') {
      setCategoryFilters(['Todos']);
      return;
    }
    setCategoryFilters((current) => {
      const sanitized = current.filter((value) => value !== 'Todos');
      const includes = sanitized.includes(category);
      const next = includes ? sanitized.filter((value) => value !== category) : [...sanitized, category];
      if (next.length === 0) {
        return ['Todos'];
      }
      return next;
    });
  };

  const toggleProductSelection = (id) => {
    setSelectedProducts((current) => {
      if (current[id]) {
        const { [id]: removed, ...rest } = current;
        return rest;
      }
      return { ...current, [id]: true };
    });
  };

  const addSelectedToCart = () => {
    if (!selectedCount) return;
    setCart((current) => {
      const next = { ...current };
      Object.keys(selectedProducts).forEach((id) => {
        const product = productMap[id];
        if (!product) return;
        const existing = next[id];
        next[id] = {
          ...product,
          quantity: existing ? existing.quantity + 1 : 1
        };
      });
      return next;
    });
  };

  const clearSelection = () => setSelectedProducts({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselDeals.length);
    }, 6200);
    return () => clearInterval(timer);
  }, [carouselDeals.length]);

  const moveCarousel = (direction) => {
    setCarouselIndex((prev) => (prev + direction + carouselDeals.length) % carouselDeals.length);
  };

  const currentDeal = carouselDeals[carouselIndex];

  const handleAddProduct = (product) => {
    setCart((current) => {
      const existing = current[product.id];
      return {
        ...current,
        [product.id]: {
          ...product,
          quantity: existing ? existing.quantity + 1 : 1
        }
      };
    });
  };

  const changeQuantity = (id, delta) => {
    setCart((current) => {
      const target = current[id];
      if (!target) return current;
      const nextQty = target.quantity + delta;
      if (nextQty <= 0) {
        const { [id]: drop, ...rest } = current;
        return rest;
      }
      return {
        ...current,
        [id]: {
          ...target,
          quantity: nextQty
        }
      };
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!loginForm.name.trim() || !loginForm.email.trim()) {
      setLoginMessage('Preencha nome e e-mail para simular o login.');
      return;
    }
    setUser(loginForm.name.trim());
    setLoginMessage(`Login simulado concluído para ${loginForm.name.trim()}.`);
    setActivePage('Minha Conta');
  };

  const handleSimulatePurchase = () => {
    if (!deliveryLocation.trim()) {
      setPurchaseNotice('Informe o local de entrega antes de simular a compra.');
      return;
    }
    if (!cartItems.length) {
      setPurchaseNotice('Adicione pelo menos um produto ao carrinho para simular a compra.');
      return;
    }
    setPurchaseNotice(
      `Simulação pronta: ${cartItems.length} itens para ${deliveryLocation.trim()} com total de ${formatCurrency(
        subtotal
      )}.`
    );
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('Início');
    setLoginMessage('Sessão fictícia encerrada. Volte sempre!');
  };

  return (
    <div className="page market-page">
      <header className="hero">
        <div className="hero-copy">
          <p className="badge">Vitrine para exposição</p>
          <h1>Mercado Live · mais de 500 produtos à la Mercado Livre</h1>
          <p className="intro">
            Explore categorias diversas como higiene, ferramenta, comida, casa e tecnologia. Selecione múltiplos
            produtos, filtre por faixa de preço, simule login, adicione ao carrinho e finalize uma entrega fictícia.
          </p>
          <div className="hero-stats">
            <div>
              <strong>{products.length}</strong>
              <span>Produtos prontos para exibição</span>
            </div>
            <div>
              <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
              <span>{cartItems.length ? 'Itens adicionados ao carrinho' : 'Carrinho vazio por enquanto'}</span>
            </div>
          </div>
          <p className="hero-user">
            {user ? `Olá, ${user}! Sua conta fictícia está pronta.` : 'Faça login para encarar o fluxo completo de conta.'}
          </p>
          <div className="hero-carousel">
            <div className="carousel-controls">
              <button type="button" onClick={() => moveCarousel(-1)} aria-label="Oferta anterior">
                ‹
              </button>
              <div className="carousel-card">
                <p className="carousel-tag">Oferta fictícia • {currentDeal.category}</p>
                <h3>{currentDeal.title}</h3>
                <p>{currentDeal.description}</p>
                <div className="carousel-meta">
                  <strong>{currentDeal.highlight}</strong>
                  <span>Categoria: {currentDeal.category}</span>
                </div>
              </div>
              <button type="button" onClick={() => moveCarousel(1)} aria-label="Próxima oferta">
                ›
              </button>
            </div>
            <div className="carousel-indicators">
              {carouselDeals.map((_, index) => (
                <span
                  key={`indicator-${index}`}
                  className={index === carouselIndex ? 'active' : ''}
                  onClick={() => setCarouselIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Login simulado</h2>
          <p>{user ? `Usuário ativo: ${user}` : 'Preencha os dados e entre para acessar a conta fictícia.'}</p>
          <label>
            Nome
            <input
              type="text"
              placeholder="Maria Silva"
              value={loginForm.name}
              onChange={(event) => setLoginForm({ ...loginForm, name: event.target.value })}
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              placeholder="maria@email.com"
              value={loginForm.email}
              onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
            />
          </label>
          <button type="submit">Entrar na conta</button>
          {loginMessage && <p className="form-note">{loginMessage}</p>}
        </form>
      </header>

      <nav className="page-tabs" role="tablist" aria-label="Seções da vitrine">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            role="tab"
            aria-selected={activePage === page}
            className={`tab ${activePage === page ? 'active' : ''}`}
            onClick={() => setActivePage(page)}
          >
            {page}
          </button>
        ))}
        <span className="tab-flag">Estilo Mercado Livre · Interface profissional</span>
      </nav>

      <section className="page-shell">
        {activePage === 'Início' && (
          <article className="panel panel-home">
            <header className="panel-header">
              <div>
                <p className="panel-eyebrow">Início rápido</p>
                <h2>Portal da vitrine estilo Mercado Livre</h2>
                <p>Resumo das categorias mais visitadas para quem quer um catálogo completo.</p>
              </div>
              <button type="button" onClick={() => setActivePage('Categorias')}>
                Ver catálogo completo
              </button>
            </header>
            <div className="home-cards">
              {Object.entries(categoryInfo).map(([category, info]) => (
                <article key={category} className="home-card">
                  <span className="home-icon">{info.icon}</span>
                  <div>
                    <h3>{category}</h3>
                    <p>{info.description}</p>
                  </div>
                  <span className="home-count">{categoryTotals[category] ?? 0} itens</span>
                </article>
              ))}
            </div>
            <div className="home-extra">
              <div>
                <h4>Recomendações quentes</h4>
                <p>{featuredOffers[0]?.name} e outros destaques estão prontos para você.</p>
              </div>
              <div className="home-highlights">
                <p>{`Carrinho ativo: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} itens`}</p>
                <p>{`Subtotal fictício: ${formatCurrency(subtotal)}`}</p>
              </div>
            </div>
          </article>
        )}

        {activePage === 'Ofertas' && (
          <article className="panel panel-offers">
            <header className="panel-header">
              <div>
                <p className="panel-eyebrow">Ofertas Relâmpago</p>
                <h2>Combinando Mercado Pontos e Frete gratuito</h2>
              </div>
              <p>Produtos mais bem avaliados da vitrine para exibição em um estilo profissional.</p>
            </header>
            <div className="offer-grid">
              {featuredOffers.map((offer) => (
                <article key={offer.id} className="offer-card">
                  <div className="offer-media">
                    <img src={offer.image} alt={offer.name} loading="lazy" />
                    <span className="product-badge">{offer.badge}</span>
                  </div>
                  <div className="offer-body">
                    <p className="offer-category">{offer.category}</p>
                    <h3>{offer.name}</h3>
                    <p className="offer-price">{formatCurrency(offer.price)}</p>
                    <div className="offer-meta">
                      <span>
                        {offer.rating} ★ ({offer.reviews} avaliações)
                      </span>
                      <span>Entrega em até {offer.deliveryTime} dias</span>
                    </div>
                    <button type="button" onClick={() => handleAddProduct(offer)}>
                      Adicionar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        )}

        {activePage === 'Categorias' && (
          <article className="panel panel-catalog">
            <div className="filters">
              <div className="filter-row">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={categoryFilters.includes(category) ? 'active' : ''}
                    onClick={() => toggleCategoryFilter(category)}
                    type="button"
                  >
                    {category === 'Todos' ? 'Todos' : `${categoryInfo[category].icon} ${category}`}
                  </button>
                ))}
              </div>
              <div className="search-row">
                <label>
                  Buscar produtos
                  <input
                    type="search"
                    placeholder="Digite termos como chocolate, chave de fenda ou carregador"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </label>
                <p>{filteredProducts.length} itens encontrados</p>
              </div>
              <div className="price-filter">
                <label>
                  Preço até {formatCurrency(priceFilter)}
                  <input
                    type="range"
                    min="80"
                    max="420"
                    step="5"
                    value={priceFilter}
                    onChange={(event) => setPriceFilter(Number(event.target.value))}
                  />
                </label>
              </div>
            </div>
            <div className="selection-panel">
              <div>
                <strong>
                  {selectedCount
                    ? `${selectedCount} item${selectedCount > 1 ? 's' : ''} selecionado${selectedCount > 1 ? 's' : ''}`
                    : 'Selecione vários produtos para montar seu combo'}
                </strong>
                <p>
                  {selectedCount
                    ? `Total fictício: ${formatCurrency(selectedTotal)}`
                    : 'Clique em um box para expandir e ver detalhes antes de adicionar.'}
                </p>
              </div>
              <div className="selection-actions">
                <button type="button" disabled={!selectedCount} onClick={addSelectedToCart}>
                  Adicionar selecionados ao carrinho
                </button>
                <button type="button" disabled={!selectedCount} onClick={clearSelection}>
                  Limpar seleção
                </button>
              </div>
            </div>
            <div className="catalog-body">
              <div className="grid">
                {filteredProducts.map((product) => (
                  <article
                    className={`product-card ${selectedProducts[product.id] ? 'selected' : ''} ${
                      expandedProduct === product.id ? 'expanded' : ''
                    }`}
                    key={product.id}
                    onMouseEnter={() => setExpandedProduct(product.id)}
                    onMouseLeave={() => setExpandedProduct((prev) => (prev === product.id ? null : prev))}
                    onFocus={() => setExpandedProduct(product.id)}
                    onBlur={() => setExpandedProduct((prev) => (prev === product.id ? null : prev))}
                    onClick={() => toggleProductSelection(product.id)}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleProductSelection(product.id);
                      }
                    }}
                    aria-pressed={!!selectedProducts[product.id]}
                    aria-expanded={expandedProduct === product.id}
                  >
                    <div className="product-media">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="product-badge">{product.badge}</span>
                    </div>
                    <div className="product-head">
                      <div className="product-icon">{product.icon}</div>
                      <div>
                        <h3>{product.name}</h3>
                        <p className="subtitle">{product.category}</p>
                      </div>
                    </div>
                    <p className="description">{product.description}</p>
                    <div className="product-extra">
                      <div className="product-meta">
                        <span>Estoque: {product.stock}</span>
                        <span>Entrega em até {product.deliveryTime} dias úteis</span>
                      </div>
                      <div className="product-rating">
                        <strong>{product.rating} ★</strong> · {product.reviews} avaliações
                      </div>
                      <p className="extra-note">
                        {selectedProducts[product.id]
                          ? 'Marcado para o combo. Clique novamente para remover da seleção.'
                          : 'Detalhes extras aparecem quando você expande este box.'}
                      </p>
                    </div>
                    <div className="card-footer">
                      <strong>{formatCurrency(product.price)}</strong>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAddProduct(product);
                        }}
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="sidebar">
                <div className="cart">
                  <h2>Carrinho</h2>
                  {cartItems.length === 0 ? (
                    <p>Adicione produtos para ver o subtotal.</p>
                  ) : (
                    <ul>
                      {cartItems.map((item) => (
                        <li key={item.id}>
                          <div>
                            <strong>{item.name}</strong>
                            <p>
                              {formatCurrency(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <div className="quantity-controls">
                            <button type="button" onClick={() => changeQuantity(item.id, -1)}>
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button type="button" onClick={() => changeQuantity(item.id, 1)}>
                              +
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(subtotal)}</strong>
                  </div>
                </div>

                <div className="purchase-simulator">
                  <h2>Simular compra</h2>
                  <label>
                    Local da entrega
                    <input
                      type="text"
                      placeholder="Rua das Flores, 123, São Paulo"
                      value={deliveryLocation}
                      onChange={(event) => setDeliveryLocation(event.target.value)}
                    />
                  </label>
                  <button type="button" onClick={handleSimulatePurchase}>
                    Finalizar simulação
                  </button>
                  {purchaseNotice && <p className="form-note">{purchaseNotice}</p>}
                </div>
              </aside>
            </div>
          </article>
        )}

        {activePage === 'Minha Conta' && (
          <article className="panel panel-account">
            <div className="account-card">
              {user ? (
                <>
                  <h2>Olá, {user}</h2>
                  <p>Conta fictícia simulando a experiência completa de um marketplace.</p>
                  <p>E-mail registrado: {loginForm.email || 'não informado'}</p>
                  <div className="account-buttons">
                    <button type="button" onClick={() => setActivePage('Categorias')}>
                      Voltar ao catálogo
                    </button>
                    <button type="button" className="ghost" onClick={handleLogout}>
                      Sair da conta
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>Entre para acessar sua conta</h2>
                  <p>Use o formulário de login ao lado e explore a vitrine completa.</p>
                </>
              )}
            </div>
            <div className="account-details">
              <div className="activity-card">
                <strong>{cartItems.length ? `${cartItems.length} itens no carrinho` : 'Carrinho limpo'}</strong>
                <p>
                  {cartItems.length ? `Subtotal de ${formatCurrency(subtotal)}` : 'Selecione produtos na aba Categorias'}
                </p>
              </div>
              <div className="activity-card">
                <strong>Entrega simulada</strong>
                <p>{deliveryLocation || 'Informe um endereço no simulador de compra'}</p>
                {purchaseNotice && <span className="account-note">{purchaseNotice}</span>}
              </div>
            </div>
          </article>
        )}
      </section>
    </div>
  );
};

export default App;
