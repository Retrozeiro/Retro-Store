import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, paymentMethods, shippingOptions } from '../data/storeData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { items, amount, units, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const [shipping, setShipping] = useState(shippingOptions[1].id);
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [destination, setDestination] = useState({ cep: '', city: '', address: '' });
  const [status, setStatus] = useState('');

  const selectedShipping = useMemo(
    () => shippingOptions.find((option) => option.id === shipping) || shippingOptions[1],
    [shipping]
  );

  const finalAmount = amount + selectedShipping.price;

  const simulatePayment = () => {
    if (!items.length) {
      setStatus('Adicione produtos ao carrinho para simular pagamento.');
      return;
    }

    if (!destination.cep.trim() || !destination.city.trim() || !destination.address.trim()) {
      setStatus('Preencha CEP, cidade e endereco para simular o frete.');
      return;
    }

    const methodLabel = paymentMethods.find((option) => option.id === payment)?.label;
    setStatus(
      `Pagamento simulado via ${methodLabel}. Entrega para ${destination.city} (${destination.cep}) com prazo ${selectedShipping.eta}. Total ${formatCurrency(finalAmount)}.`
    );
  };

  return (
    <div className="stack-page checkout-layout">
      <section className="list-panel">
        <div className="list-heading vertical">
          <div>
            <h1>Carrinho e checkout</h1>
            <p>Fluxo completo com ajuste de quantidade, frete personalizado e pagamento simulado.</p>
          </div>
          <p>
            {user ? `Comprador simulado: ${user.name}` : 'Usuario nao logado. Voce ainda pode simular compra.'}
          </p>
        </div>

        {!items.length && (
          <div className="empty-box">
            <p>Seu carrinho esta vazio no momento.</p>
            <Link to="/produtos">Ir para produtos</Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-list">
            {items.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{formatCurrency(item.price)}</p>
                </div>
                <div className="qty-group">
                  <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
                <button type="button" className="link-danger" onClick={() => removeFromCart(item.id)}>
                  Remover
                </button>
              </article>
            ))}
            <button type="button" className="clean-btn" onClick={clearCart}>
              Limpar carrinho
            </button>
          </div>
        )}
      </section>

      <aside className="checkout-panel">
        <h2>Simulacao de pagamento</h2>

        <label>
          Metodo de pagamento
          <select value={payment} onChange={(event) => setPayment(event.target.value)}>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo de frete
          <select value={shipping} onChange={(event) => setShipping(event.target.value)}>
            {shippingOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} ({formatCurrency(option.price)})
              </option>
            ))}
          </select>
        </label>

        <label>
          CEP
          <input
            type="text"
            placeholder="00000-000"
            value={destination.cep}
            onChange={(event) => setDestination((current) => ({ ...current, cep: event.target.value }))}
          />
        </label>

        <label>
          Cidade
          <input
            type="text"
            placeholder="Sao Paulo"
            value={destination.city}
            onChange={(event) => setDestination((current) => ({ ...current, city: event.target.value }))}
          />
        </label>

        <label>
          Endereco
          <input
            type="text"
            placeholder="Rua Exemplo, 123"
            value={destination.address}
            onChange={(event) => setDestination((current) => ({ ...current, address: event.target.value }))}
          />
        </label>

        <div className="summary-box">
          <p>Itens: {units}</p>
          <p>Subtotal: {formatCurrency(amount)}</p>
          <p>Frete: {formatCurrency(selectedShipping.price)}</p>
          <strong>Total final: {formatCurrency(finalAmount)}</strong>
        </div>

        <button type="button" className="payment-btn" onClick={simulatePayment}>
          Simular pagamento
        </button>

        {status && <p className="status-msg">{status}</p>}
      </aside>
    </div>
  );
};

export default CheckoutPage;
