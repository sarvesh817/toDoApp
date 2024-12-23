const express = require("express");
const app = express();
require('dotenv').config();  
const dbUrl = require("./config/db"); 
const taskRoute = require("./routes/taskRoute");

// Postman reading data by below middleware
app.use(express.json());       
app.use("/", taskRoute); 

// First DB will connect then after that serverless function will handle requests.
dbUrl.then(() => {
    console.log("Database Connected Successfully");
    // Note: Don't use app.listen() here in serverless functions!
}).catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
});

// Export the express app for Vercel to handle
module.exports = (req, res) => {
    app(req, res);  // call the express app with request and response
};
