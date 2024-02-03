const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
 dotenv.config();
const secretKey = process.env.secretKey;


const Auth = async (req ,res , next)=>{
    const bearearHeader = req.headers.authorization
    // return bearearHeader
    // console.log(bearearHeader);
    if (!bearearHeader) {
       return  res.status(401).json({ seccues :false,  message:"missing token"})
    }
    const bearer = bearearHeader.split(' ');
    const token = bearer[1];

    jwt.verify(token , secretKey , (err , decoded)=>{
        if (err) {
            if (err.name === "TokenExpiredError" ) {
                return res.status(403).json({status: false, message: 'Token expired. Please log in again.'})
            }
            if (err.name === "JsonWebTokenError" ) {
                return res.status(403).json({status: false, message: 'Token expired. Please log in again.'})
            }
            else{
                return res.status(403).json({status: false, message: 'Token expired. Please log in again.'}) 
            }
        }

        req.user = decoded;
        next();
    })
}

module.exports = Auth

