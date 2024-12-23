const mongoose = require("mongoose");
require('dotenv').config(); 

// Using environment variable for MongoDB URI
const dbUrl = mongoose.connect(process.env.DB_URI || "mongodb+srv://serveshk7:OtjtAGuiBLmayihB@cluster0.yxk0r.mongodb.net/toDoApp?retryWrites=true&w=majority&appName=Cluster0");

module.exports = dbUrl;
