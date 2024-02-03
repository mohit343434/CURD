const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1:27017/CURD_Expresss";
const con = mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB is Connect ");
  })
  .catch((error) => {
    console.error(`Error in Connect DB On catch Block ${error}`);
  });

module.exports = con;
