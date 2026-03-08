import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Cart() {

  const { cart, addToCart, decreaseQty, removeFromCart, total } = useCart()

  const navigate = useNavigate()

  return (
    <div className="cart-container">

      <h1>Your Cart</h1>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item: any) => (
        <div key={item._id} className="cart-item">

          <div>
            <div className="cart-name">{item.name}</div>
            <div className="cart-price">₹{item.price}</div>
          </div>

          <div>

            <button onClick={() => decreaseQty(item._id)}>
              -
            </button>

            <span style={{ margin: "0 10px" }}>
              {item.qty}
            </span>

            <button onClick={() => addToCart(item)}>
              +
            </button>

          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>

        </div>
      ))}

      <div className="cart-total">
        Total: ₹{total}
      </div>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>

    </div>
  )
}