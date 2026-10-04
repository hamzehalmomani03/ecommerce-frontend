import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main className="order-success-page">
      <div className="success-card">
        <div className="success-icon">
          ✓
        </div>

        <p className="success-label">
          ORDER CONFIRMED
        </p>

        <h1>
          Your order is on its way!
        </h1>

        <p className="success-message">
          Thank you for your purchase. Your order has been
          successfully placed and will be prepared for delivery.
        </p>

        <div className="order-info">
          <div>
            <span>Order status</span>
            <strong>Confirmed</strong>
          </div>

          <div>
            <span>Payment</span>
            <strong>Cash on delivery</strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>Free</strong>
          </div>
        </div>

        <div className="success-actions">
          <Link
            to="/products"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="back-home"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;