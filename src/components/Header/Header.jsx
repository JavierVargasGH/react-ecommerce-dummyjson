import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛍️</span>
          <span>ShopDummy</span>
        </Link>

        <nav className="nav">
          <Link to="/">Productos</Link>
          <Link to="/cart" className="cart-link">
            Carrito
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;