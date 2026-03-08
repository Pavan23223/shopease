import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
      alert("Product not found");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="main"><p>Loading...</p></div>;
  }

  if (!product) {
    return <div className="main"><p>Product not found</p></div>;
  }

  return (
    <div className="main">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <button 
          className="btn btn-outline" 
          onClick={() => navigate(-1)}
          style={{ marginBottom: "20px" }}
        >
          ← Back
        </button>

        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {product.image && (
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              style={{ 
                width: "100%", 
                maxWidth: "400px", 
                height: "auto",
                borderRadius: "8px"
              }}
            />
          )}

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h1>{product.name}</h1>
            <h2 style={{ color: "#007bff", margin: "10px 0" }}>
              ₹{product.price}
            </h2>

            <p style={{ margin: "15px 0" }}>
              <strong>Category:</strong> {product.category}
            </p>

            <p style={{ margin: "15px 0" }}>
              <strong>Stock:</strong> {product.countInStock > 0 ? `${product.countInStock} available` : "Out of stock"}
            </p>

            {product.description && (
              <div style={{ margin: "20px 0" }}>
                <strong>Description:</strong>
                <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
                  {product.description}
                </p>
              </div>
            )}

            {!isAdmin && product.countInStock > 0 && (
              <button
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  if (!isAuthenticated) {
                    alert("Please login to add items to cart");
                    navigate("/login");
                    return;
                  }
                  addToCart(product);
                  alert("Added to cart!");
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
