import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const categories = ["Electronics", "Clothing", "Books", "Accessories"];

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);
    } catch (err) {
      console.error("Error loading product:", err);
      alert("Failed to load product");
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  }

  const update = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          ...product,
          price: Number(product.price),
          countInStock: Number(product.countInStock)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product");
    }
  }

  if (loading) {
    return <div className="main"><p>Loading...</p></div>;
  }

  return (
    <div className="main">
      <h1 className="page-title">Edit Product</h1>

      <form onSubmit={update} style={{ maxWidth: "600px" }}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            className="form-input"
            placeholder="Product name"
            required
            value={product.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price (₹)</label>
          <input
            className="form-input"
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            required
            value={product.price || ""}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            required
            value={product.category || ""}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Stock Quantity</label>
          <input
            className="form-input"
            placeholder="Stock"
            type="number"
            min="0"
            required
            value={product.countInStock || ""}
            onChange={(e) => setProduct({ ...product, countInStock: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            placeholder="Product description"
            rows={4}
            value={product.description || ""}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        {product.image && (
          <div className="form-group">
            <label className="form-label">Current Image</label>
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt="Product"
              style={{ 
                width: "200px", 
                height: "200px", 
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />
          </div>
        )}

        <button className="btn btn-primary" type="submit">
          Update Product
        </button>

        <button 
          className="btn btn-outline" 
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/admin/products")}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}