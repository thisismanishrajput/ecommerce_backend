const User = require("../models/User");

exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const user = await User.findById(req.user.id);

  const existing = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existing) existing.quantity += quantity;
  else user.cart.push({ product: productId, quantity });

  await user.save();

  res.json({ message: "Added", cart: user.cart });
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user.id);

  user.cart = user.cart.filter((c) => c.product.toString() !== productId);
  await user.save();

  res.json({ message: "Removed", cart: user.cart });
};
exports.getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("cart.product", "name price imageUrl stock");

    return res.json({
      message: "Cart fetched successfully",
      cart: user.cart
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
