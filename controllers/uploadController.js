const Product = require("../models/productModel");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { BadRequestError, CustomAPIError } = require("../errors");
const fs = require("fs");
const cloudianry = require("cloudinary").v2;

const uploadImageLocal = async (req, res) => {
  let productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomAPIError.BadRequestError("Please Only images");
  }

  const maxSize = 1020 * 1024;

  if (!productImage.size > maxSize) {
    throw new CustomAPIError.BadRequestError("Please Only smaller image");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.name}` } });
};

const uploadImageCloud = async (req, res) => {
  const result = await cloudianry.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);

  return res
    .status(StatusCodes.OK)
    .json({ result: { src: result.secure_url } });
};

module.exports = {
  uploadImageLocal,
  uploadImageCloud,
};
