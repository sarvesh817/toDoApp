const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    taskName:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'taskName must be 3 character long']
    } 
},{timestamps:true});

module.exports=mongoose.model("Task",taskSchema);    
