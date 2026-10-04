import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-details-page">
        <h1>Product Not Found</h1>

        <button
          type="button"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>

      <div className="product-details-card">
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-info">
          <p className="product-details-label">
            PRODUCT DETAILS
          </p>

          <h1>{product.name}</h1>

          <p className="product-details-description">
            {product.description}
          </p>

          <p className="product-details-price">
            ${product.price.toFixed(2)}
          </p>

          <button
            type="button"
            className="add-details-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;