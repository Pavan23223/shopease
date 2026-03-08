import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

interface Product {
  _id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {

  const { addToCart } = useCart()

  return (
    <div className="product-card">

      <div className="product-img">
        <Link to={`/product/${product._id}`}>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            style={{ width: "100%", height: "160px", objectFit: "cover" }}
          />
        </Link>
      </div>

      <div className="product-body">

        <div className="product-category">{product.category}</div>

        <Link to={`/product/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <p className="product-desc">{product.description}</p>

        <div className="product-footer">

          <span className="product-price">₹{product.price}</span>

          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            +
          </button>

        </div>

      </div>

    </div>
  )
}