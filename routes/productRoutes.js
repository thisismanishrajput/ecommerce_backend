// Product routes
const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { getAllProducts, addProduct } = require("../controllers/productController");

router.get("/", auth, getAllProducts);
router.post("/", auth, addProduct);

module.exports = router;
