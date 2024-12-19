const mongoose=require("mongoose");

//const dbUrl=mongoose.connect("mongodb://localhost:27017/toDoApp");   
const dbUrl = mongoose.connect("mongodb+srv://serveshk7:OtjtAGuiBLmayihB@cluster0.yxk0r.mongodb.net/toDoApp?retryWrites=true&w=majority&appName=Cluster0");
module.exports=dbUrl; 


