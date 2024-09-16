const express = require("express");
const auth = require("../middleware/auth");
const {
  createProduct,
  getProducts,
  updateProduct,
  getProductById,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

router.post("/", auth, createProduct);
// /api/products/ to get all products
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
