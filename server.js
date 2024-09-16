const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
