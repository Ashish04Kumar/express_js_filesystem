const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  // console.log("shop.js", adminData.products);
  // console.log("In another middleware");
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  Product.fetchAll((products) => {
    console.log("Products hai", products);
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    console.log("Products hai", products);
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    const singleProduct = product.find((p) => Number(p.id) === Number(prodId));
    Cart.deleteProduct(prodId, singleProduct.price);
    res.redirect("/cart");
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
    const singleProduct = product.find((p) => Number(p.id) === Number(prodId));
    // console.log("Single product detail page", singleProduct);
    res.render("shop/product-detail", {
      product: singleProduct,
      pageTitle: singleProduct.title,
      path: "/products",
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("product id hai", prodId);
  Product.findById(prodId, (product) => {
    const singleProduct = product.find((p) => Number(p.id) === Number(prodId));
    console.log("single product hai", singleProduct);
    Cart.addProduct(prodId, singleProduct.price);
  });
  res.redirect("/cart");
};

// exports.getCart = (req, res, next) => {
//   Cart.getCart((cart) => {
//     const cartProducts = [];
//     console.log("cartwa2", cart.products);
//     // cartProducts.push(Json.parse(cart.products));

//     // Product.fetchAll((products) => {
//     //   const cartProducts = [];
//     //   for (product of products) {
//     //     const cartProductData = cart.products.find(
//     //       (prod) => prod.id === product.id
//     //     );
//     //     if (cartProductData) {
//     //       cartProducts.push({ productData: product, qty: cartProductData.qty });
//     //     }
//     //   }
//     res.render("shop/cart", {
//       path: "/cart",
//       pageTitle: "Your Cart",
//       products: cartProducts,
//     });
//     // });
//   });
// };

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => Number(prod.id) === Number(product.id)
        );
        console.log("yaha console kro", cartProductData);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};
