const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
},{ timestamps:true });

const productSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  name:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true
  },

  image:String,

  description:String,

  category:String,

  countInStock:{
    type:Number,
    default:0
  },

  reviews:[reviewSchema],

  rating:{
    type:Number,
    default:0
  },

  numReviews:{
    type:Number,
    default:0
  }

},{ timestamps:true });

module.exports = mongoose.model("Product",productSchema);