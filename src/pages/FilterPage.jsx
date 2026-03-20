import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categoryInfo, formatCurrency, products } from '../data/storeData';

const allCategories = Object.keys(categoryInfo);

const FilterPage = () => {
  const [params, setParams] = useSearchParams();
  const queryCategory = params.get('categoria') || 'todas';
  const [category, setCategory] = useState(queryCategory);
  const [priceLimit, setPriceLimit] = useState(240);
  const [minRating, setMinRating] = useState(4.0);
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === 'todas' || product.category === category;
      const priceMatch = product.price <= priceLimit;
      const ratingMatch = product.rating >= minRating;
      const termMatch = term ? product.name.toLowerCase().includes(term) : true;
      return categoryMatch && priceMatch && ratingMatch && termMatch;
    });
  }, [category, minRating, priceLimit, search]);

  const handleCategory = (nextCategory) => {
    setCategory(nextCategory);
    const nextParams = new URLSearchParams(params);
    if (nextCategory === 'todas') {
      nextParams.delete('categoria');
    } else {
      nextParams.set('categoria', nextCategory);
    }
    setParams(nextParams);
  };

  return (
    <div className="stack-page">
      <section className="filter-panel">
        <h1>Pagina de filtragem avancada</h1>
        <p>Combine categoria, faixa de preco, avaliacao minima e busca para encontrar exatamente o item certo.</p>

        <div className="controls-grid">
          <label>
            Categoria
            <select value={category} onChange={(event) => handleCategory(event.target.value)}>
              <option value="todas">Todas</option>
              {allCategories.map((key) => (
                <option key={key} value={key}>
                  {categoryInfo[key].label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Preco maximo: {formatCurrency(priceLimit)}
            <input
              type="range"
              min="20"
              max="400"
              step="5"
              value={priceLimit}
              onChange={(event) => setPriceLimit(Number(event.target.value))}
            />
          </label>

          <label>
            Avaliacao minima: {minRating.toFixed(1)}
            <input
              type="range"
              min="4"
              max="5"
              step="0.1"
              value={minRating}
              onChange={(event) => setMinRating(Number(event.target.value))}
            />
          </label>

          <label>
            Buscar item
            <input
              type="search"
              placeholder="Chocolate 1, chave de fenda, webcam"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="list-panel">
        <div className="list-heading">
          <h2>{filteredProducts.length} itens encontrados</h2>
        </div>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilterPage;
