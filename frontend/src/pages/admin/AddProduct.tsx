import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
    image: ""
  });

  const categories = ["Electronics", "Clothing", "Books", "Accessories"];

  // Upload image
  const uploadImage = async (e: any) => {
    const file = e.target.files[0]

    if (!file) return;

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      setProduct({
        ...product,
        image: res.data.image
      })
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    }
  }

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
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

      alert("Product Added Successfully!");

      navigate("/admin/products");

    } catch (err: any) {
      console.log(err.response?.data);

      alert("Error adding product");
    }
  }

  return (
    <div className="main">
      <h1 className="page-title">Add Product</h1>

      <form onSubmit={submit} style={{ maxWidth: "600px" }}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            className="form-input"
            placeholder="Enter product name"
            required
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price (₹)</label>
          <input
            className="form-input"
            placeholder="Enter price"
            type="number"
            min="0"
            step="0.01"
            required
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            required
            value={product.category}
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
            placeholder="Enter stock quantity"
            type="number"
            min="0"
            required
            value={product.countInStock}
            onChange={(e) => setProduct({ ...product, countInStock: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            placeholder="Enter product description"
            rows={4}
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Image</label>
          <input type="file" accept="image/*" onChange={uploadImage} />
        </div>

        {/* Image Preview */}
        {product.image && (
          <div className="form-group">
            <label className="form-label">Image Preview</label>
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt="Product preview"
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
          Add Product
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