import { Link, Navigate, useParams } from 'react-router-dom';
import { categoryInfo, formatCurrency, products } from '../data/storeData';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => String(item.id) === id);
  if (!product) {
    return <Navigate to="/produtos" replace />;
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="stack-page">
      <section className="detail-panel">
        <img src={product.image} alt={product.name} className="detail-image" />

        <div className="detail-body">
          <p className="product-category">
            {categoryInfo[product.category]?.icon} {categoryInfo[product.category]?.label}
          </p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>
            Avaliacao: {product.rating} estrelas ({product.reviews} avaliacoes)
          </p>
          <p>Estoque disponivel: {product.stock} unidades</p>
          <p>Entrega estimada: ate {product.shippingDays} dias uteis</p>
          <strong className="detail-price">{formatCurrency(product.price)}</strong>

          <div className="hero-actions">
            <button type="button" className="primary-link button-link" onClick={() => addToCart(product)}>
              Adicionar ao carrinho
            </button>
            <Link to="/checkout" className="secondary-link">
              Ir para checkout
            </Link>
          </div>
        </div>
      </section>

      <section className="list-panel">
        <div className="list-heading">
          <h2>Produtos relacionados</h2>
        </div>

        <div className="products-grid">
          {related.map((item) => (
            <article key={item.id} className="mini-related">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div>
                <h3>
                  <Link to={`/produto/${item.id}`}>{item.name}</Link>
                </h3>
                <p>{formatCurrency(item.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
