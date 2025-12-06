const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const ratingSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: Number,
  comment: String,
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  isVerified: { type: Boolean, default: false },
  otpCode: String,
  otpExpiresAt: Date,

  refreshToken: String,

  cart: [cartSchema],
  ratings: [ratingSchema],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
