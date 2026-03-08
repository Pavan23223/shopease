const express = require("express")
const router = express.Router()

const { protect, admin } = require("../middleware/authMiddleware")

const {
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus
} = require("../controllers/orderController")

router.post("/", protect, createOrder)

router.get("/myorders", protect, getMyOrders)

router.get("/", protect, admin, getOrders)

router.put("/:id/deliver", protect, admin, updateOrderStatus)

module.exports = router