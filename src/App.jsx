import { useMemo, useState } from 'react';

const categoryInfo = {
  Higiene: { icon: '🧼', description: 'Cuidados diários para pele, cabelo e higiene bucal' },
  Ferramenta: { icon: '🛠️', description: 'Ferramentas e acessórios prontos para manutenção leve' },
  Comida: { icon: '🥗', description: 'Snacks, ingredientes e suplementos para o dia a dia' },
  Casa: { icon: '🛋️', description: 'Pequenos itens para organizar o lar' },
  Tecnologia: { icon: '💡', description: 'Gadgets e energia para complementar o ambiente' }
};

const categories = ['Todos', ...Object.keys(categoryInfo)];

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
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [loginForm, setLoginForm] = useState({ name: '', email: '' });
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [purchaseNotice, setPurchaseNotice] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === 'Todos' || product.category === categoryFilter;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, categoryFilter, searchTerm]);

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
        <div>
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
                className={categoryFilter === category ? 'active' : ''}
                onClick={() => setCategoryFilter(category)}
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
        <section className="content">
          <div className="grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-icon">{product.icon}</div>
                <h3>{product.name}</h3>
                <p className="subtitle">{product.category}</p>
                <p className="description">{product.description}</p>
                <div className="product-meta">
                  <span>Estoque: {product.stock}</span>
                  <span>Entrega em até {product.deliveryTime} dias úteis</span>
                </div>
                <div className="card-footer">
                  <strong>{formatCurrency(product.price)}</strong>
                  <button type="button" onClick={() => handleAddProduct(product)}>
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
