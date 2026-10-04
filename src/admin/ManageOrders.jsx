import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function ManageOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  if (!user || user.role !== "admin") {
    return (
      <main className="admin-page">
        <div className="admin-access-denied">
          <div className="admin-denied-icon">
            !
          </div>

          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>Access Denied</h1>

          <p>
            You do not have permission to manage
            orders.
          </p>

          <Link
            to="/"
            className="admin-primary-button"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  }

  function getStatusClass(status) {
    return status
      .toLowerCase()
      .replace(" ", "-");
  }

  return (
    <main className="admin-page">
      <div className="admin-orders-top">
        <div>
          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>Manage Orders</h1>

          <p className="admin-welcome">
            View customer orders and manage their
            delivery status.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-back-link"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="admin-orders-heading">
        <div>
          <p className="admin-label">
            ORDERS
          </p>

          <h2>
            {orders.length}{" "}
            {orders.length === 1
              ? "Order"
              : "Orders"}
          </h2>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="admin-empty-state">
          <div>🛍️</div>

          <h2>No Orders Yet</h2>

          <p>
            Customer orders will appear here after
            they complete checkout.
          </p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <article
              className="admin-order-card"
              key={order.id}
            >
              <div className="admin-order-top">
                <div>
                  <p className="admin-order-label">
                    ORDER
                  </p>

                  <h2>
                    #{order.id}
                  </h2>

                  <p className="admin-order-customer">
                    {order.customer.fullName}
                  </p>
                </div>

                <div className="admin-order-status">
                  <span
                    className={`admin-status-badge ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(
                        order.id,
                        event.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>

              <div className="admin-order-info">
                <div>
                  <span>Email</span>
                  <strong>
                    {order.customer.email}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {order.customer.phone}
                  </strong>
                </div>

                <div>
                  <span>City</span>
                  <strong>
                    {order.delivery.city}
                  </strong>
                </div>

                <div>
                  <span>Payment</span>
                  <strong>
                    {order.payment}
                  </strong>
                </div>
              </div>

              <div className="admin-order-address">
                <span>Delivery Address</span>

                <strong>
                  {order.delivery.address}
                </strong>
              </div>

              <div className="admin-order-products">
                <div className="admin-order-products-heading">
                  <h3>Products</h3>

                  <span>
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>

                <div className="admin-order-items">
                  {order.items.map((item) => (
                    <div
                      className="admin-order-item"
                      key={item.id}
                    >
                      <div className="admin-order-item-info">
                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          Quantity:{" "}
                          {item.quantity}
                        </span>
                      </div>

                      <strong>
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-order-footer">
                <span>Total Order Value</span>

                <strong>
                  ${order.total.toFixed(2)}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default ManageOrders;