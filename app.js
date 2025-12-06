const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db")();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));

module.exports = app;
