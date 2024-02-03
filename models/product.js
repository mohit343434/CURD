const mongoose = require("mongoose");

const ProductSchema =mongoose.Schema({
    ProductName:{
        type:String
    },
    email:{
        type:String
    },
    Product_Desc:{
        type:String
    },
    Product_Price:{
        type:Number
    },
    Password:{
        type:String
    },
    City: {
        type: String
    }
},{timestamps: true})

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product