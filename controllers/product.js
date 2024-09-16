const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    createdBy: req.user.id,
  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

//Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.createdBy.toString() !== userId)
      return res.status(403).json({ message: "Not authorized" });

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.createdBy.toString() !== userId)
      return res.status(403).json({ message: "Not authorized" });

    await Product.findByIdAndDelete(id);
    res.status(204).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
