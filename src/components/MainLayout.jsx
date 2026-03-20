import { Link, NavLink, Outlet } from 'react-router-dom';
import { brandName } from '../data/storeData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/filtros', label: 'Filtros' },
  { to: '/checkout', label: 'Checkout' }
];

const MainLayout = () => {
  const { user } = useAuth();
  const { units } = useCart();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <Link className="brand" to="/">
            {brandName}
          </Link>
          <p className="brand-sub">Marketplace de exposicao com fluxo completo</p>
        </div>

        <nav className="topbar-nav" aria-label="Navegacao principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-right">
          <Link className="account-btn" to="/auth">
            {user ? `Conta: ${user.name}` : 'Login/Cadastro'}
          </Link>
          <Link className="cart-btn" to="/checkout">
            Carrinho ({units})
          </Link>
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
