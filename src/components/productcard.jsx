
import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  function viewDetails() {
    navigate(`/products/${product.id}`);
  }

  return (
    <div className="product-card">
      {product.video ? (
        <video
          src={product.video}
          autoPlay
          muted
          loop
          playsInline
          className="product-image"
        />
      ) : (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      )}

      <div className="product-info">
        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <p className="product-price">
          ${product.price.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <button
          type="button"
          className="details-button"
          onClick={viewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

