// Rating controller
const User = require("../models/User");

exports.getRatings = async (req, res) => {
  const { productId } = req.params;

  const users = await User.find({ "ratings.product": productId });

  const ratings = [];

  users.forEach((u) => {
    u.ratings.forEach((r) => {
      if (r.product.toString() === productId) {
        ratings.push({
          userName: u.name,
          rating: r.rating,
          comment: r.comment,
          createdAt: r.createdAt,
        });
      }
    });
  });

  res.json(ratings);
};

exports.addOrEditRating = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  const user = await User.findById(req.user._id);

  const existing = user.ratings.find((r) => r.product.toString() === productId);

  if (existing) {
    existing.rating = rating;
    existing.comment = comment;
  } else {
    user.ratings.push({ product: productId, rating, comment });
  }

  await user.save();

  res.json({ message: "Rating saved" });
};
