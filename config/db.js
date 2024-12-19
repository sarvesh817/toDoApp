const mongoose=require("mongoose");

const dbUrl=mongoose.connect("mongodb://localhost:27017/toDoApp");   

module.exports=dbUrl; 


