// Product controller
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
