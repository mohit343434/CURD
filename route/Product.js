const express = require("express");
const router = express.Router();

const {
  data,
  insertdata,
  singleData,
  Delete,
  UpdateData,
  Login
} = require("../controll/Product.js");

// get data
router.route("/data").get(data);

// get single data
router.route("/data/:id").get(singleData);

// Insert data
router.route("/data").post(insertdata);

//  Delete id
router.route("/data/:id").delete(Delete);

// Update id 
router.route('/data/:id').put(UpdateData)


// Login 
router.route('/login').post(Login)




module.exports = router;
