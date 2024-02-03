const express = require("express");
const bodyparser = require("body-parser");
const Product = require("../models/product.js");
const jwt = require("json-web-token");
const bcrypt = require("bcrypt");
const app = express();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

const data = async (req, res) => {
  // res.json({message:"ok"})
  try {
    const Productmodel = await Product.find();
    res.json({ Productmodel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Singl data
const singleData = async (req, res) => {
  try {
    const userid = req.params.id;
    const { ProductName, Product_Desc, Product_Price, Password, City } =
      await Product.findById(userid);
    // const Passwordd = bcrypt.compare( Password , Product.Password )
    res.json({
      message: "Sec",
      ProductName,
      Product_Desc,
      Product_Price,
      Password,
      City,
    });
  } catch (error) {
    res.json({ error });
  }
};

// Insert data
// bcrypt.compare(password, user.password);
const insertdata = async (req, res) => {
  const { ProductName, email, Product_Desc, Product_Price, Password, cities } =
    req.body;
  const hashPasword = await bcrypt.hash(Password, 10);
  const Products = new Product({
    ProductName,
    email,
    Product_Desc,
    Product_Price,
    Password: hashPasword,
    City: cities,
  });
  try {
    await Products.save();
    res.status(201).json({ message: "message", Products });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const Login = async (req, res) => {
  const { email, Password } = req.body;
  try {
    const user = await Product.findOne({ email });
    // console.log(user);
    const matchHashPass = await bcrypt.compare(Password, user.Password);
    if (matchHashPass) {
      res.status(200).json({ message: ` Login  ` });
    } else {
      res.status(401).json({ message: "Password error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Intrnal error" });
  }
};

// Delete data by id
const Delete = async (req, res) => {
  const deleteId = req.params.id;
  await Product.findByIdAndDelete(deleteId);
  try {
    res.status(201).json({ message: "ID Delete" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const UpdateData = async (req, res) => {
  const updateId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: updateId },
      {
        $set: ({
          // ProductName: req.body.ProductName,
          // Product_Desc: req.body.Product_Desc,
          // Product_Price: req.body.Product_Price,
          // Password:req.body.Password
          ProductName,
          Product_Desc,
          Product_Price,
          Password,
        } = req.body),
      },
      { new: true } // This option returns the updated document
    );

    res.status(201).json({ message: "Update Data", updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { data, insertdata, singleData, Delete, UpdateData, Login };
