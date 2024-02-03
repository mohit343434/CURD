const con = require("./db/connect.js");
const express = require("express");
const Product_route = require("./route/Product.js");
const app = express();
const dotenv = require('dotenv')
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/Product", Product_route);
app.use("/api/auth", require("./route/user.js"))


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


