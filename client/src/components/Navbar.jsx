import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">RSK Buys 🐉</Link>
      </div>
      
      <ul className="navbar-links">
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/pronta-entrega">Pronta Entrega</Link>
        </li>
        <li>
          <Link to="/catalogo">Catálogo</Link>
        </li>
      </ul>

      <div className="navbar-cart">
        <Link to="/carrinho" className="cart-icon">
          <ShoppingCart size={28} color="#fff" />
          <span className="cart-badge">0</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;