import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { token, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyOrders()
  }, [])

  const fetchMyOrders = async () => {
    try {
      setLoading(true)
      setError("")
      
      console.log("Fetching orders for user:", user?.name)
      console.log("Token:", token ? "Present" : "Missing")
      
      const res = await axios.get(
        "http://localhost:5000/api/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log("Orders response:", res.data)
      setOrders(res.data)
    } catch (err: any) {
      console.error("Error fetching orders:", err)
      console.error("Error response:", err.response?.data)
      
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
        setTimeout(() => navigate("/login"), 2000)
      } else if (err.response?.status === 404) {
        setError("Orders endpoint not found. Please check backend.")
      } else {
        setError(err.response?.data?.message || "Failed to load orders. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="main">
        <p>Loading your orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="main">
        <h1 className="page-title">My Orders</h1>
        <div style={{ 
          padding: "20px", 
          backgroundColor: "#f8d7da", 
          color: "#721c24",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <p>{error}</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <div className="main">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 && (
        <div>
          <p>You haven't placed any orders yet.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate("/")}
            style={{ marginTop: "10px" }}
          >
            Start Shopping
          </button>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        {orders.map((order) => (
          <div 
            key={order._id} 
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#fff"
            }}
          >
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              marginBottom: "15px",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <div>
                <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p style={{ margin: "5px 0", fontSize: "20px", color: "#007bff" }}>
                  <strong>₹{order.totalPrice}</strong>
                </p>
                <p style={{ margin: "5px 0" }}>
                  <span style={{ 
                    color: order.isDelivered ? "green" : "orange",
                    fontWeight: "bold",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    backgroundColor: order.isDelivered ? "#d4edda" : "#fff3cd",
                    display: "inline-block"
                  }}>
                    {order.isDelivered ? "✓ Delivered" : "⏳ Pending"}
                  </span>
                </p>
              </div>
            </div>

            <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
              <strong>Shipping Address:</strong>
              <p style={{ margin: "5px 0", color: "#666" }}>
                {order.shippingAddress?.address}, {order.shippingAddress?.city}
                <br />
                Phone: {order.shippingAddress?.phone}
              </p>
            </div>

            <div style={{ marginTop: "15px" }}>
              <strong>Order Items:</strong>
              <div style={{ marginTop: "10px" }}>
                {order.orderItems?.map((item: any, index: number) => (
                  <div 
                    key={index}
                    style={{
                      display: "flex",
                      gap: "15px",
                      padding: "10px",
                      borderBottom: index < order.orderItems.length - 1 ? "1px solid #eee" : "none",
                      alignItems: "center"
                    }}
                  >
                    {item.product?.image && (
                      <img
                        src={`http://localhost:5000/uploads/${item.product.image}`}
                        alt={item.product?.name || item.name}
                        style={{ 
                          width: "60px", 
                          height: "60px", 
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #ddd"
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0", fontWeight: "500" }}>
                        {item.product?.name || item.name}
                      </p>
                      <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                        Quantity: {item.qty} × ₹{item.price}
                      </p>
                    </div>
                    <div style={{ fontWeight: "bold", color: "#007bff" }}>
                      ₹{(item.qty * item.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
