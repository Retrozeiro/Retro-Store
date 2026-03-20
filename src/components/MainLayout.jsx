import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}`;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <Link className="brand" to="/">
            {brandName}
          </Link>
          <p className="brand-sub">Marketplace de exposicao com fluxo completo</p>
        </div>

        <button
          type="button"
          className="mobile-menu-trigger"
          aria-label="Abrir menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          Menu
        </button>

        <nav className="topbar-nav" aria-label="Navegacao principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-right">
          <Link className="account-btn" to="/auth" onClick={closeMobileMenu}>
            {user ? `Conta: ${user.name}` : 'Login/Cadastro'}
          </Link>
          <Link className="cart-btn" to="/checkout" onClick={closeMobileMenu}>
            Carrinho ({units})
          </Link>
        </div>
      </header>

      <div className={`mobile-overlay ${mobileMenuOpen ? 'show' : ''}`} onClick={closeMobileMenu} />
      <aside className={`mobile-sidebar ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-sidebar-head">
          <strong>{brandName}</strong>
          <button type="button" onClick={closeMobileMenu} aria-label="Fechar menu">
            Fechar
          </button>
        </div>
        <nav className="mobile-sidebar-nav" aria-label="Menu mobile">
          {navLinks.map((link) => (
            <NavLink
              key={`mobile-${link.to}`}
              to={link.to}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-sidebar-foot">
          <Link className="account-btn" to="/auth" onClick={closeMobileMenu}>
            {user ? `Conta: ${user.name}` : 'Login/Cadastro'}
          </Link>
          <Link className="cart-btn" to="/checkout" onClick={closeMobileMenu}>
            Carrinho ({units})
          </Link>
        </div>
      </aside>

      <main className="page-content">
        <div key={routeKey} className="route-shell">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
