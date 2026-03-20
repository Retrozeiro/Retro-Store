import { Link } from 'react-router-dom';
import { categoryInfo, formatCurrency } from '../data/storeData';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, compact = false }) => {
  const { addToCart } = useCart();

  return (
    <article className={`product-card ${compact ? 'compact' : ''}`}>
      <Link to={`/produto/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-badge">{product.badge}</span>
      </Link>

      <div className="product-body">
        <p className="product-category">
          {categoryInfo[product.category]?.icon} {categoryInfo[product.category]?.label}
        </p>
        <h3>
          <Link to={`/produto/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-desc">{product.description}</p>
        <div className="rating-row">
          <span>{product.rating} estrelas</span>
          <span>{product.reviews} avaliacoes</span>
        </div>
      </div>

      <footer className="product-footer">
        <strong>{formatCurrency(product.price)}</strong>
        <div className="product-actions">
          <Link to={`/produto/${product.id}`} className="secondary-btn">
            Ver pagina
          </Link>
          <button type="button" onClick={() => addToCart(product)}>
            Adicionar
          </button>
        </div>
      </footer>
    </article>
  );
};

export default ProductCard;
