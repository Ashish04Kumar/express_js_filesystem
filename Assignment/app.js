const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
  console.log("This is the first middleware");
  res.send("<h1>Hello from /user URI </h1>");
});
app.use("/", (req, res, next) => {
  console.log("some middleware");
  next();
});

app.use("/", (req, res, next) => {
  console.log("This is the second middleware");
  res.send("<h1>Hello from / URI </h1>");
});

app.listen(3001);
