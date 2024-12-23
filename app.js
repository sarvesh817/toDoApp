const express=require("express");
const app=express();
require('dotenv').config();  
const PORT=process.env.PORT || 7000;     
const dbUrl=require("./config/db"); 
const taskRoute=require("./routes/taskRoute");

//Postman reading data by below middleware
app.use(express.json());       
app.use("/",taskRoute); 



//First DB will connect then after that server listen port.     
dbUrl.then(()=>{
    console.log("Database Connected Successfully"); 
    app.listen(PORT,()=>{
        console.log(`Server listing on port ${PORT}`);       
    });   
}).catch((error)=>{
    console.log(`Error connection to MongoDB ${error}`);
});
      



