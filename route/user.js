const express = require("express")
const router = express.Router()
const {Register , login , data , userdata , EmailSender}= require("../controll/user.js")
const verifyToken = require('../middleware/ChackToken.js')
const AuthToken = require("../middleware/AuthToken.js")



// user regiter
router.route('/register').post(Register);

// user login
router.post('/login' ,login)

// user get data 
// router.route('/data' , verifyToken).get(data)
router.get('/data', AuthToken,  data);

// user get  data by id
router.get('/data/:id' ,AuthToken , userdata) 

// email send using nodemailer 
router.post('/sendmail' , EmailSender )



module.exports = router