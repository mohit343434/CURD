const express = require("express");
const bodyparser = require("body-parser");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const nodemailer = require("nodemailer");
const secretKey = process.env.secretKey;
app.use(bodyparser.urlencoded({ extended: true }));

//  user register
const Register = async (req, res) => {
  const { userName, email, password, city, age } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const token = generateToken(res._id);
  // console.log(token);
  const Users = new User({
    userName,
    email,
    password: hashPassword,
    city,
    age,
  });
  try {
    await Users.save();
    res.status(201).json({ message: "SeccessFull", Users, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

// user login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const matchHashPass = await bcrypt.compare(password, user.password);
    if (matchHashPass) {
      const token = generateToken(user._id);
      res.status(200).json({ message: "Login user", token });
    } else {
      res.status(400).json({ message: `Invalid user` });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// get data
const data = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "all Users ", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get data by user id
const userdata = async (req, res) => {
  const userid = req.params.id;
  console.log(userid);
  try {
    const SingelUser = await User.findById(userid);
    res.status(200).json({ message: SingelUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Emailsem using nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_YOUREMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
const EmailSender = async (req, res) => {
  const { email, subject, message } = req.body;
  // mail option
  const mailOption = {
    from: process.env.NODEMAILER_YOUREMAIL,
    to: email,
    subject: subject,
    message: message,
  };
  try {
    transporter.sendMail(mailOption, (error) => {
      if (error) {
        res.status(400).json({ message: "Transpot error" });
      } else {
        res.status(200).json({ message: "Email send !" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message, seccuss: false });
  }
};

module.exports = { Register, login, data, userdata, EmailSender };
