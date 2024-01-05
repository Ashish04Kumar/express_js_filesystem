const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  //   products.push({ title: req.body.title });

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  console.log(req.body);
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    console.log("bvbj", product);
    const singleProduct = product.find((p) => Number(p.id) === Number(prodId));

    res.render("admin/edit-product", {
      pageTitle: "eDIT Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: singleProduct,
    });
  });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    console.log("Products hai", products);
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   console.log("lulul", prodId);
//   Product.deleteById(prodId);
// };
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("lulul", prodId);

  Product.deleteById(prodId)
    .then(() => {
      res.status(200).json({ message: "Product deleted" });
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
