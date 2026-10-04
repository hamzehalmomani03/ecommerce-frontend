import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  const [productsCount] = useState(() => {
    const savedProducts =
      localStorage.getItem("adminProducts");

    return savedProducts
      ? JSON.parse(savedProducts).length
      : 3;
  });

  const [ordersCount] = useState(() => {
    const savedOrders =
      localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders).length
      : 0;
  });

  const [customersCount] = useState(() => {
    const savedOrders =
      localStorage.getItem("orders");

    if (!savedOrders) {
      return 0;
    }

    const orders = JSON.parse(savedOrders);

    const uniqueCustomers = new Set(
      orders.map(
        (order) => order.customer.email
      )
    );

    return uniqueCustomers.size;
  });

  if (!user || user.role !== "admin") {
    return (
      <main className="admin-page">
        <div className="admin-access-denied">
          <div className="admin-denied-icon">!</div>

          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>Access Denied</h1>

          <p>
            You do not have permission to access
            the admin dashboard.
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

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>Dashboard</h1>

          <p className="admin-welcome">
            Welcome back, {user.name}. Here's what's
            happening with your store.
          </p>
        </div>

        <div className="admin-user-badge">
          <div className="admin-avatar">
            {user.name
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>{user.name}</strong>
            <span>Administrator</span>
          </div>
        </div>
      </section>

      <section className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            📦
          </div>

          <div>
            <span>Total Products</span>
            <strong>{productsCount}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            🛒
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{ordersCount}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            👥
          </div>

          <div>
            <span>Customers</span>
            <strong>{customersCount}</strong>
          </div>
        </div>
      </section>

      <section className="admin-section-heading">
        <div>
          <p className="admin-label">
            MANAGEMENT
          </p>

          <h2>Store Management</h2>
        </div>
      </section>

      <section className="admin-actions">
        <div className="admin-action-card">
          <div className="admin-action-icon">
            📦
          </div>

          <div className="admin-action-content">
            <h2>Product Management</h2>

            <p>
              Add, edit and remove products from
              your online store.
            </p>

            <Link
              to="/admin/products"
              className="admin-action-link"
            >
              Manage Products
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="admin-action-card">
          <div className="admin-action-icon">
            🛍️
          </div>

          <div className="admin-action-content">
            <h2>Order Management</h2>

            <p>
              View customer orders and update their
              delivery status.
            </p>

            <Link
              to="/admin/orders"
              className="admin-action-link"
            >
              Manage Orders
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;