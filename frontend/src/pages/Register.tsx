import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleRegister = async (e: any) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      )

      // Auto login after registration
      login(res.data.token, res.data.user)

      // Redirect to home (customers only register here)
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleRegister}>
          <input
            className="form-input"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

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
            Register
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#007bff" }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}