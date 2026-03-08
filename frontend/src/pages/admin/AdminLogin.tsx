import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      // Check if user is admin
      if (res.data.user.role !== "admin") {
        setError("Access denied. Admin only.")
        return
      }

      login(res.data.token, res.data.user)

      navigate("/admin/products")
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password")
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Admin Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-full">
            Login
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            <Link to="/login" style={{ color: "#6c757d" }}>
              Customer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}