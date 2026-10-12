import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-error">
        <p>Producto no encontrado</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">← Volver a productos</Link>

      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="main-image">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
            />
          </div>
          <div className="thumbnails">
            {product.images?.map((img, index) => (
              <button
                key={index}
                className={`thumb ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`Vista ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          
          <div className="detail-rating">
            <span className="stars">★ {product.rating}</span>
            <span className="reviews-count">
              ({product.reviews?.length || 0} reseñas)
            </span>
          </div>

          <div className="detail-price">
            <span className="current">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="original">${product.price}</span>
                <span className="discount">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <div><strong>Marca:</strong> {product.brand}</div>
            <div><strong>Stock:</strong> {product.stock} unidades</div>
            <div><strong>SKU:</strong> {product.sku}</div>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="reviews-section">
          <h2>Reseñas de clientes</h2>
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <strong>{review.reviewerName}</strong>
                  <span className="review-stars">★ {review.rating}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;