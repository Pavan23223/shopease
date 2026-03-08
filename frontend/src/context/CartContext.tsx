import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext<any>(null)

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: any) => {
    const exist = cart.find((item: any) => item._id === product._id)

    if (exist) {
      setCart(
        cart.map((item: any) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const decreaseQty = (id: string) => {
    const exist = cart.find((item: any) => item._id === id)

    if (exist.qty === 1) {
      removeFromCart(id)
    } else {
      setCart(
        cart.map((item: any) =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
      )
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item._id !== id))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  const total = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.qty,
    0
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQty, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
