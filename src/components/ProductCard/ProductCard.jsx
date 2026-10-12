import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <span className="discount-badge">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <div className="product-rating">
          <span className="stars">★ {product.rating}</span>
          <span className="stock">
            {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
          </span>
        </div>

        <div className="product-price-row">
          <div className="prices">
            <span className="current-price">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <span className="original-price">${product.price}</span>
            )}
          </div>
          <button
            className="add-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;