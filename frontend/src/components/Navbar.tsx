import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-brand">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Shop<span>Ease</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link className="nav-btn" to="/">
          Shop
        </Link>

        {isAuthenticated && !isAdmin && (
          <>
            <Link className="nav-btn" to="/cart">
              Cart ({cart.length})
            </Link>
            <Link className="nav-btn" to="/my-orders">
              My Orders
            </Link>
          </>
        )}

        {isAuthenticated && isAdmin && (
          <Link className="nav-btn" to="/admin/products">
            Admin Dashboard
          </Link>
        )}

        {!isAuthenticated ? (
          <>
            <Link className="nav-btn" to="/login">
              Login
            </Link>
            <Link className="nav-btn" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="nav-btn" style={{ cursor: "default" }}>
              Hi, {user?.name}
            </span>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
