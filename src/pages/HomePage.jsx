import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { brandName, categoryInfo, formatCurrency, homepageHighlights, products } from '../data/storeData';

const HomePage = () => {
  const spotlight = products.slice(0, 8);
  const [eventSeed, setEventSeed] = useState(() => Math.floor(Math.random() * 999999));

  const promoEvent = useMemo(() => {
    const eventNames = [
      'Evento relampago de estoque',
      'Virada de precos da semana',
      'Selecao comercial em promocao'
    ];
    const title = eventNames[eventSeed % eventNames.length];
    const selected = [];
    const used = new Set();

    while (selected.length < 6) {
      const index = (eventSeed + selected.length * 37 + Math.floor(selected.length * 9.2)) % products.length;
      const candidate = products[index];
      if (used.has(candidate.id)) {
        continue;
      }
      used.add(candidate.id);
      const discount = 8 + ((candidate.id * 3) % 18);
      const promoPrice = Number((candidate.price * (1 - discount / 100)).toFixed(2));
      selected.push({
        ...candidate,
        discount,
        promoPrice
      });
    }

    return { title, selected };
  }, [eventSeed]);

  const shuffleEvent = () => setEventSeed(Math.floor(Math.random() * 999999));

  return (
    <div className="stack-page">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">{brandName}</p>
          <h1>Marketplace completo com produtos, login, checkout e rotas reais</h1>
          <p>
            Estrutura pronta para Vite com paginas separadas de autenticacao, catalogo, filtro avancado, detalhe por
            produto e simulacao de pagamento com frete customizavel.
          </p>
          <div className="hero-actions">
            <Link to="/produtos" className="primary-link">
              Ver produtos
            </Link>
            <Link to="/auth" className="secondary-link">
              Entrar na conta
            </Link>
          </div>
        </div>
        <div className="highlight-grid">
          {homepageHighlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span>{item.cta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="categories-panel">
        <h2>Categorias principais</h2>
        <div className="category-grid">
          {Object.entries(categoryInfo).map(([key, value]) => (
            <article key={key} className="category-item">
              <div>
                <span>{value.icon}</span>
                <h3>{value.label}</h3>
              </div>
              <p>{value.description}</p>
              <Link to={`/filtros?categoria=${key}`}>Filtrar categoria</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="list-panel">
        <div className="list-heading">
          <div>
            <h2>{promoEvent.title}</h2>
            <p>Itens escolhidos aleatoriamente para a vitrine de promocoes.</p>
          </div>
          <button type="button" className="secondary-btn random-btn" onClick={shuffleEvent}>
            Novo evento
          </button>
        </div>
        <div className="event-grid" key={eventSeed}>
          {promoEvent.selected.map((item) => (
            <article key={item.id} className="event-card">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.discount}% off no evento</p>
                <strong>{formatCurrency(item.promoPrice)}</strong>
                <Link to={`/produto/${item.id}`}>Abrir pagina do item</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="list-panel">
        <div className="list-heading">
          <h2>Produtos em destaque</h2>
          <Link to="/produtos">Ver todos</Link>
        </div>
        <div className="products-grid">
          {spotlight.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
