const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { addToCart, removeFromCart, getCartItems } = require("../controllers/cartController");

router.get("/", auth, getCartItems);
router.post("/add", auth, addToCart);
router.post("/remove", auth, removeFromCart);

module.exports = router;
