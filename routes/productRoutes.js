const express = require("express");
const { addProduct, getProducts } = require("../controllers/productController");
const {
  uploadImageCloud,
  uploadImageLocal,
} = require("../controllers/uploadController");
const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
// router.post("/uploads", uploadImageLocal);
router.post("/uploads", uploadImageCloud);

module.exports = router;
