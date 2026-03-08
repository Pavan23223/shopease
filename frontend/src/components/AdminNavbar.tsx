import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function AdminNavbar() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="nav">
      <div className="nav-brand">
        <Link to="/admin/products" style={{ textDecoration: "none", color: "inherit" }}>
          Shop<span>Ease</span> Admin
        </Link>
      </div>

      <div className="nav-links">
        <Link className="nav-btn" to="/">
          Home
        </Link>

        <Link className="nav-btn" to="/admin/products">
          Products
        </Link>

        <Link className="nav-btn" to="/admin/orders">
          Orders
        </Link>

        <span className="nav-btn" style={{ cursor: "default" }}>
          {user?.name}
        </span>

        <button className="nav-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
