
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar({ cartCount }) {
  const { user, logout } = useAuth();

  return (
    <nav>
      <h2>My Ecommerce</h2>

      <div>
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              Profile
            </Link>

            <span>
              Welcome, {user.name}
            </span>

            <button
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

