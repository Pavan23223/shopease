import { useState } from "react"
import axios from "axios"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const placeOrder = async (e: any) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }

    setLoading(true)

    try {
      // Format order items properly
      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        product: item._id
      }))

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: orderItems,
          totalPrice: total,
          shippingAddress: {
            address,
            city,
            phone
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log("Order created:", response.data)

      alert("Order placed successfully!")
      clearCart()
      navigate("/my-orders")
    } catch (error: any) {
      console.error("Order error:", error)
      alert(error.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="main">
        <h1>Checkout</h1>
        <p>Your cart is empty. Please add items to cart before checkout.</p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="main">
      <h1>Checkout</h1>

      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Order Summary</h3>
        <div style={{ marginTop: "10px" }}>
          {cart.map((item) => (
            <div key={item._id} style={{ 
              display: "flex", 
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #dee2e6"
            }}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>
        <div style={{ 
          marginTop: "15px", 
          paddingTop: "15px", 
          borderTop: "2px solid #dee2e6",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>

      <h3>Shipping Information</h3>
      <form onSubmit={placeOrder}>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            placeholder="Enter your address"
            className="form-input"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">City</label>
          <input
            placeholder="Enter your city"
            className="form-input"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            placeholder="Enter your phone number"
            className="form-input"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <button 
          className="btn btn-outline" 
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </button>
      </form>
    </div>
  )
}