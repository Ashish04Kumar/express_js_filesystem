const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");
const errorController = require("./controllers/error");
const app = express();
const db = require("./util/database.js");
//for templating engines
//setting global configuration value

//registerting new templating engine HandleBar just for demo
// app.engine("hbs", expressHbs());

// we wanna compile dynamic templates to the pug engine
// app.set("view engine", "pug");
//let's test the other engine other than pug i.e handlebars
// app.set("view engine", "hbs");

//let's test the other engine other than pug i.e EJS
app.set("view engine", "ejs");

//here is the path to find the dynamic templates
app.set("views", "views");

const path = require("path");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

//to add new middleware function
//next is a function that will be passed as an argument to use method
//this next function will alllow us to travel the request to next middleware
// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next();
// });

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/", errorController.get404);
app.listen(3001);
