const express = require("express");
const app = express();
require('dotenv').config();  
const dbUrl = require("./config/db"); 
const taskRoute = require("./routes/taskRoute");
const cors = require("cors");
app.use(cors());

// Postman reading data by below middleware
app.use(express.json());       
app.use("/", taskRoute); 
 
   

// Listen on port for local development
const PORT = process.env.PORT || 5000;  // Use the port from environment or 5000 by default
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* // Export the express app for Vercel to handle
module.exports = (req, res) => {
    app(req, res);  // call the express app with request and response
};
 */