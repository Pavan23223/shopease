import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import AdminNavbar from "./components/AdminNavbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/AuthContext"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Product from "./pages/Product"
import MyOrders from "./pages/MyOrders"

import AdminLogin from "./pages/admin/AdminLogin"
import Products from "./pages/admin/Products"
import AddProduct from "./pages/admin/AddProduct"
import EditProduct from "./pages/admin/EditProduct"
import Orders from "./pages/admin/Orders"

function App() {
  const { isAdmin } = useAuth()
  const location = useLocation()

  // Show admin navbar only on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <div>
      {isAdminRoute && isAdmin ? <AdminNavbar /> : <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES - Anyone can access */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CUSTOMER PROTECTED ROUTES */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute adminOnly>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App