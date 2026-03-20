import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { brandName, categoryInfo, homepageHighlights, products } from '../data/storeData';

const HomePage = () => {
  const spotlight = products.slice(0, 8);

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
