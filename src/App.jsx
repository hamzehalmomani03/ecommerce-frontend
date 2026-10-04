import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import defaultProducts from "./products";

import { AuthProvider } from "./auth/AuthContext";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./auth/Profile";

import AdminDashboard from "./admin/AdminDashboard";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";

function App() {
  const [productsList, setProductsList] = useState(() => {
    const savedProducts =
      localStorage.getItem("adminProducts");

    return savedProducts
      ? JSON.parse(savedProducts)
      : defaultProducts;
  });

  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  const [notification, setNotification] =
    useState("");

  const [notificationId, setNotificationId] =
    useState(0);

  const [orderSuccess, setOrderSuccess] =
    useState(false);

  // Notification timer
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, notificationId]);

  // Save cart to Local Storage
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Save products to Local Storage
  useEffect(() => {
    localStorage.setItem(
      "adminProducts",
      JSON.stringify(productsList)
    );
  }, [productsList]);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct =
        currentCart.find(
          (item) => item.id === product.id
        );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setNotification(
      `${product.name} added to cart successfully!`
    );

    setNotificationId(
      (id) => id + 1
    );

    setOrderSuccess(false);
  }

  function increaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  function removeFromCart(index) {
    setCart((currentCart) =>
      currentCart.filter(
        (_, i) => i !== index
      )
    );
  }

  function submitOrder() {
    if (cart.length === 0) return;

    setCart([]);
    setOrderSuccess(true);
  }

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar
          cartCount={cartCount}
        />

        {notification && (
          <div
            className="toast-notification"
            role="status"
          >
            <span className="toast-check">
              ✓
            </span>

            <span>
              {notification}
            </span>

            <button
              type="button"
              onClick={() =>
                setNotification("")
              }
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/admin"
            element={
              <AdminDashboard />
            }
          />

          <Route
            path="/admin/products"
            element={
              <ManageProducts />
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ManageOrders />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile />
            }
          />

          <Route
            path="/login"
            element={
              <Login />
            }
          />

          <Route
            path="/register"
            element={
              <Register />
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetails
                products={productsList}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/"
            element={
              <Products
                products={productsList}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                products={productsList}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={
                  removeFromCart
                }
                increaseQuantity={
                  increaseQuantity
                }
                decreaseQuantity={
                  decreaseQuantity
                }
                orderSuccess={
                  orderSuccess
                }
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                submitOrder={
                  submitOrder
                }
              />
            }
          />

          <Route
            path="/order-success"
            element={
              <OrderSuccess />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;