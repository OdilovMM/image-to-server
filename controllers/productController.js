const Product = require("../models/productModel");
const { StatusCodes } = require("http-status-codes");

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

module.exports = {
  addProduct,
  getProducts,
};
