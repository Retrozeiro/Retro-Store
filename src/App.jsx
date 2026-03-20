import { useEffect, useMemo, useState } from 'react';

const categoryInfo = {
  Higiene: { icon: '🧼', description: 'Cuidados diários para pele, cabelo e higiene bucal' },
  Ferramenta: { icon: '🛠️', description: 'Ferramentas e acessórios prontos para manutenção leve' },
  Comida: { icon: '🥗', description: 'Snacks, ingredientes e suplementos para o dia a dia' },
  Casa: { icon: '🛋️', description: 'Pequenos itens para organizar o lar' },
  Tecnologia: { icon: '💡', description: 'Gadgets e energia para complementar o ambiente' }
};

const categories = ['Todos', ...Object.keys(categoryInfo)];

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
    const price = Number((Math.random() * 180 + 12).toFixed(2));
    const stock = 5 + ((seed * 7) % 46);
    const deliveryTime = 1 + ((seed * 4) % 9);
    products.push({
      id: seed + 1,
      name,
      category,
      price,
      stock,
      deliveryTime,
      icon: categoryInfo[category].icon,
      description: `${categoryInfo[category].description} com acabamento ${descriptors[(seed + 1) % descriptors.length]}.`
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
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategories, searchTerm]);

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <p className="badge">Vitrine para exposição</p>
          <h1>Loja conceito com mais de 500 produtos variados</h1>
          <p className="intro">
            Navegue por categorias de higiene, ferramenta, comida, casa e tecnologia. Use o carrinho para testar a
            experiência, simule um login e finalize uma entrega fictícia.
          </p>
          <div className="hero-stats">
            <div>
              <strong>{products.length}</strong>
              <span>Produtos criados para este showroom</span>
            </div>
            <div>
              <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
              <span>Produtos simulados no carrinho</span>
            </div>
          </div>
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
          <p>{user ? `Usuário: ${user}` : 'Preencha seus dados para entrar na vitrine.'}</p>
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
          <button type="submit">Entrar na vitrine</button>
          {loginMessage && <p className="form-note">{loginMessage}</p>}
        </form>
      </header>

      <main>
        <section className="filters">
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
                placeholder="Digite um termo como shampoo, snack ou chave"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <p>{filteredProducts.length} itens encontrados</p>
          </div>
        </section>
        <div className="selection-panel">
          <div>
            <strong>
              {selectedCount
                ? `${selectedCount} item${selectedCount > 1 ? 's' : ''} selecionado${selectedCount > 1 ? 's' : ''}`
                : 'Selecione vários produtos'}
            </strong>
            <p>
              {selectedCount
                ? `Total fictício: ${formatCurrency(selectedTotal)}`
                : 'Passe o mouse ou clique em um card para expandir e destacar.'}
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
        <section className="content">
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
                        <p>{formatCurrency(item.price)} × {item.quantity}</p>
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
        </section>
      </main>
    </div>
  );
};

export default App;
