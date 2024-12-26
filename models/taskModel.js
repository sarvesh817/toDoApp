const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    taskName:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'taskName must be 3 character long'],
        validate: {
            validator: function(value) {
                return /^[A-Za-z\s]+$/.test(value);  // Only alphabets and spaces allowed
            },
            message: 'Task name can only contain letters and spaces'
        }
    } 
},{timestamps:true});

module.exports=mongoose.model("Task",taskSchema);    
