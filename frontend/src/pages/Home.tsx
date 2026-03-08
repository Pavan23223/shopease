import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { addToCart } = useCart()
  const { isAdmin, isAuthenticated } = useAuth()

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError("")
      
      const res = await axios.get(
        `http://localhost:5000/api/products?keyword=${keyword}&category=${category}`
      )

      console.log("Products response:", res.data)
      
      const productList = res.data.products || res.data
      setProducts(productList)
      
      if (productList.length === 0) {
        setError("No products found")
      }
    } catch (err: any) {
      console.error("Error fetching products:", err)
      setError("Failed to load products. Please check if the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [keyword, category])

  return (
    <div className="main">
      <h1 className="page-title">Shop Products</h1>

      {/* SEARCH BAR */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          className="form-input"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* LOADING STATE */}
      {loading && <p>Loading products...</p>}

      {/* ERROR STATE */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* PRODUCTS */}
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            {p.image && (
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                className="product-image"
                alt={p.name}
              />
            )}

            <div className="product-name">{p.name}</div>

            <div className="product-price">₹{p.price}</div>

            {p.description && (
              <p style={{ 
                fontSize: "13px", 
                color: "#666", 
                margin: "8px 0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              }}>
                {p.description}
              </p>
            )}

            <p style={{ fontSize: "12px", color: "#888" }}>
              Category: {p.category}
            </p>

            <div style={{ marginTop: "10px" }}>
              <Link
                className="btn btn-outline btn-sm"
                to={`/product/${p._id}`}
              >
                View
              </Link>

              {!isAdmin && (
                <button
                  className="btn btn-primary btn-sm"
                  style={{ marginLeft: "8px" }}
                  onClick={() => {
                    if (!isAuthenticated) {
                      alert("Please login to add items to cart")
                      return
                    }
                    addToCart(p)
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!loading && products.length === 0 && !error && (
        <p>No products available. Please add some products from admin panel.</p>
      )}
    </div>
  )
}
