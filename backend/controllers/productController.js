const Product = require("../models/Product")

// Get all products (Search + Category + Pagination)
exports.getProducts = async (req, res) => {
  try {

    const pageSize = Number(req.query.pageSize) || 50
    const page = Number(req.query.page) || 1

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i"
          }
        }
      : {}

    const category = req.query.category
      ? { category: req.query.category }
      : {}

    const filter = {
      ...keyword,
      ...category
    }

    const count = await Product.countDocuments(filter)

    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 })

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Get product by ID
exports.getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Create product
exports.createProduct = async (req,res)=>{

  try{

    const product = new Product({

      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      countInStock: req.body.countInStock,
      user: req.user.id

    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)

  }catch(error){

    console.log(error)

    res.status(500).json({message:error.message})

  }

}


// Update product
exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Delete product
exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}