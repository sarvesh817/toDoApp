const express=require("express"); 
const taskRoute=express.Router();  
const Task=require("../models/taskModel");  

//1 - Adding New Task
taskRoute.post("/addTask",async(req,res)=>{ 
    try{   
        const {taskName}=req.body;  
        //Check to prevent same task
        const exitTask=await Task.findOne({taskName}); 
        if(exitTask){   
            return res.status(409).json({message:'Task already exist'});         
        }
         // Create a new Task instance
         const task=new Task({
            taskName
         }); 
        // Save the Task instance in the DB 
        const taskData=await task.save();     
        if(!taskData){
           return res.status(400).json({message:"Task insertion failed"}); 
        }
        res.status(200).json({message:"Task Added Successfully!!",taskData}); 
    }catch(error){
        res.status(500).json({message:error.message});  
    }
});

//2 - Fetching All Task 
taskRoute.get("/listTask",async(req,res)=>{
    try{
        const fetchAllTasks=await Task.find();   
        if(!fetchAllTasks){
           return res.status(404).json({message:"Task Doesn't Exist"});      
        } 
        res.status(200).json({message:"Task Fetch Successfully!!",fetchAllTasks});
    }catch(error){
        res.status(500).json({message:error.message});  
    }
});

//3 - Update Task
taskRoute.patch("/updateTask/:updId",async(req,res)=>{
    try{
        const updId=req.params.updId;  
        const {taskName}=req.body;      
        const updData=await Task.findByIdAndUpdate(updId,{taskName},{new:true});              
        if(!updData){
            res.status(404).json({message:"Task Updation Failed."});                  
        }
        res.status(200).json({message:"Task Updated Successfully!!",updData});             
    }catch(error){
        res.status(500).json({message:error.message});    
    }
}); 

//4 - Delete Task
taskRoute.delete("/deleteTask/:delId",async(req,res)=>{
    try{
        //Params is used to get query string ID. 
        const delId=req.params.delId;
        const delData=await Task.findByIdAndDelete(delId);
        if(delData){
            res.status(200).json({message:"Task Deleted Successfully!!",delData});        
        }else{
            res.status(404).json({message:"Task Deletion Failed, Not Found."});                  
        }
    }catch(error){
        res.status(500).json({message:error.message});  
    }
});

module.exports=taskRoute;  