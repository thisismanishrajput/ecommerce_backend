// Category controller
const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.addCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
};
