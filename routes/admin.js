const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");

// const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);

//this route only valid for /admin/products as both /products and /admin/products serves different purpose
router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);
// exports.routes = router;
// exports.products = products;
module.exports = router;
