const Order = require("../models/Order")

// Create Order
exports.createOrder = async (req, res) => {
  try {

    const { orderItems, shippingAddress, totalPrice } = req.body

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      totalPrice
    })

    res.status(201).json(order)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

// Get my orders (customer)
exports.getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("orderItems.product", "name price image")

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all orders (admin) - sorted by pending first
exports.getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ isDelivered: 1, createdAt: -1 })

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Mark order delivered
exports.updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()

    await order.save()

    res.json({ message: "Order marked as delivered" })

  } catch (error) {

    console.log(error)

    res.status(500).json({ message: error.message })

  }

}