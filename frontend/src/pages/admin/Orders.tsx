import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([])
  const { token } = useAuth()

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log("Orders API:", res.data)

      // Handles both formats
      if (Array.isArray(res.data)) {
        setOrders(res.data)
      } else {
        setOrders(res.data.orders)
      }

    } catch (err) {
      console.log("Order fetch error:", err)
    }
  }

  const markDelivered = async (id: string) => {
    await axios.put(
      `http://localhost:5000/api/orders/${id}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    fetchOrders()
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="main">
      <h1>Orders</h1>

      {orders.length === 0 && (
        <p>No orders found</p>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o: any) => (
            <tr key={o._id}>
              <td>{o.user?.name}</td>

              <td>
                {o.shippingAddress?.address},
                {o.shippingAddress?.city}
                <br />
                {o.shippingAddress?.phone}
              </td>

              <td>₹{o.totalPrice}</td>

              <td>
                {o.isDelivered ? "Delivered" : "Pending"}
              </td>

              <td>
                {!o.isDelivered && (
                  <button
                    className="btn btn-primary"
                    onClick={() => markDelivered(o._id)}
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}