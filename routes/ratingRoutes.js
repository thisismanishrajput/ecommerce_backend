// Rating routes
const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { getRatings, addOrEditRating } = require("../controllers/ratingController");

router.get("/:productId", auth, getRatings);
router.post("/:productId", auth, addOrEditRating);

module.exports = router;
