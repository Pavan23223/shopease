const express = require("express")
const router = express.Router()

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController")

const { protect, admin } = require("../middleware/authMiddleware")

// Get all products
router.get("/", getProducts)

// Get single product
router.get("/:id", getProductById)

// Create product (admin)
router.post("/", protect, admin, createProduct)

// Update product
router.put("/:id", protect, admin, updateProduct)

// Delete product
router.delete("/:id", protect, admin, deleteProduct)

module.exports = router