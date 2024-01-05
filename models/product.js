const fs = require("fs");
const path = require("path");
// const products = [];

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if (this.id) {
      let updatedProducts = [];
      const p = path.join(__dirname, "../", "data", "products.json");
      fs.readFile(p, (err, fileContent) => {
        let products = JSON.parse(fileContent);
        const existingProductIndex = products.findIndex(
          (prod) => Number(prod.id) === Number(this.id)
        );
        updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
      });
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    }
    this.id = Math.floor(Math.random() * 1000);
    // products.push(this);
    // console.log("Value of this", this);
    const p = path.join(__dirname, "../", "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(__dirname, "../", "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      return cb(JSON.parse(fileContent));
    });
  }

  static findById(id, cb) {
    const p = path.join(__dirname, "../", "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]); // Handle the error appropriately, return or send a response if needed.
      }

      return cb(JSON.parse(fileContent));
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      let updatedProducts = [];
      const p = path.join(__dirname, "../", "data", "products.json");

      fs.readFile(p, (err, fileContent) => {
        if (err) {
          reject(err);
          return;
        }

        let productsArray = JSON.parse(fileContent);
        updatedProducts = productsArray.filter(
          (product) => Number(product.id) !== Number(id)
        );
        fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    });
  }
};
