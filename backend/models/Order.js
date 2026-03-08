const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderItems: [
      {
        name: String,
        qty: Number,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ],

    shippingAddress: {
      address: String,
      city: String,
      phone: String
    },

    totalPrice: {
      type: Number,
      required: true
    },

    isDelivered: {
      type: Boolean,
      default: false
    },

    deliveredAt: {
      type: Date
    }

  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)