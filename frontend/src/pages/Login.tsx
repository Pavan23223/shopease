import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
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

      login(res.data.token, res.data.user)

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/products")
      } else {
        navigate("/")
      }
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Customer Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            className="form-input"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-input"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary btn-full">
            Login
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ marginBottom: "10px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#007bff" }}>
              Register here
            </Link>
          </p>
          <p>
            <Link to="/admin/login" style={{ color: "#6c757d" }}>
              Login as Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}