import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/storeData';

const ProductsPage = () => {
  const [search, setSearch] = useState('');

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="stack-page">
      <section className="list-panel">
        <div className="list-heading vertical">
          <div>
            <h1>Pagina geral de produtos</h1>
            <p>Catalogo completo da Retro Store com centenas de itens e pagina individual por produto.</p>
          </div>
          <label className="search-label">
            Buscar produto
            <input
              type="search"
              placeholder="Ex: chocolate, chave de fenda, shampoo"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="products-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
