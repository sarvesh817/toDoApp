const express = require("express");
const app = express();
require('dotenv').config();  
const dbUrl = require("./config/db"); 
const taskRoute = require("./routes/taskRoute");

// Postman reading data by below middleware
app.use(express.json());       
app.use("/", taskRoute); 



// Export the express app for Vercel to handle
module.exports = (req, res) => {
    app(req, res);  // call the express app with request and response
};
