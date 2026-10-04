
import { useNavigate } from "react-router-dom";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  orderSuccess,
}) {
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {orderSuccess && (
        <div className="order-success" role="status">
          <span className="order-success-icon">✓</span>
          <div>
            <h2>Order submitted successfully!</h2>
            <p>Thank you for shopping with us.</p>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((product, index) => (
              <div className="cart-item" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-item-info">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>

                  <p>
                    Price: ${product.price.toFixed(2)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      -
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Total: $
                    {(
                      product.price * product.quantity
                    ).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <div>
              <h2>Order Summary</h2>
              <p>
                {cart.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}{" "}
                items
              </p>
            </div>

            <div className="order-total-price">
              <span>Total Amount</span>
              <h3>${totalPrice.toFixed(2)}</h3>
            </div>

            <button
              type="button"
              className="submit-order-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;