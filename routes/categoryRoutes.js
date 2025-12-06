// Category routes
const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { getAllCategories, addCategory } = require("../controllers/categoryController");

router.get("/", auth, getAllCategories);
router.post("/", auth, addCategory);

module.exports = router;
