const jwt = require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config();
const secertKey = process.env.secretKey

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ error : "Unauthorized" });
    }  
    jwt.verify(token, secertKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid Token" });
      }
      req.user = decoded
      next();
    });
  };

  module.exports =  verifyToken
