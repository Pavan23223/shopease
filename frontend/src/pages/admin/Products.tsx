import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(true)

  const { token } = useAuth()

  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      const res = await axios.get(
        `http://localhost:5000/api/products?keyword=${keyword}&category=${category}`
      )

      console.log("Admin products response:", res.data)
      
      const productList = res.data.products || res.data
      setProducts(productList)
    } catch (err) {
      console.error("Error fetching products:", err)
      alert("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [keyword, category])

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Delete this product?")) return

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Product deleted successfully")
      fetchProducts()
    } catch (err) {
      console.error("Error deleting product:", err)
      alert("Failed to delete product")
    }
  }

  return (
    <div className="main">
      <div className="page-header">
        <h1 className="page-title">Manage Products</h1>

        <Link
          className="btn btn-primary"
          to="/admin/add-product"
        >
          Add Product
        </Link>
      </div>

      {/* SEARCH + CATEGORY */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          className="form-input"
          placeholder="Search product..."
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

      {loading && <p>Loading products...</p>}

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

            <p style={{ fontSize: "12px", color: "#888" }}>
              Stock: {p.countInStock}
            </p>

            <div style={{ marginTop: "10px" }}>
              <Link
                className="btn btn-outline btn-sm"
                to={`/admin/edit-product/${p._id}`}
              >
                Edit
              </Link>

              <button
                className="btn btn-danger btn-sm"
                style={{ marginLeft: "8px" }}
                onClick={() => deleteProduct(p._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && products.length === 0 && (
        <p>No products found. Click "Add Product" to create one.</p>
      )}
    </div>
  )
}
