import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart(); 

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">RSK<span className="logo-buys">Buys</span> 🐉</Link>
      </div>
      
      <ul className="navbar-links">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/pronta-entrega">Pronta Entrega</Link></li>
        <li><Link to="/catalogo">Catálogo</Link></li>
      </ul>

      <div className="navbar-cart">
        <Link to="/carrinho" className="cart-icon">
          <ShoppingCart size={28} color="#fff" />
          
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;