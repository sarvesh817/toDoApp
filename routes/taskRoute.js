//const multer = require('multer');  
const express=require("express"); 
const taskRoute=express.Router();  
const Task=require("../models/taskModel");  
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service (e.g., Gmail)
    auth: {
        user: process.env.EMAIL_USER,  // Set in your .env file
        pass: process.env.EMAIL_PASS   // Your email password or app-specific password
    }
});

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'serveshk7@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent successfully!!:', info.response);   
        }
    });     
};

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
         const task = new Task({
            taskName
        }); 
        // Save the Task instance in the DB 
        const taskData = await task.save();      
        
        // Send email after task is successfully added
        sendEmail('serveshk7@gmail.com','New Task Added',`A new task has been added: ${taskName}.`);        

        res.status(200).json({ message: "Task Added Successfully!!", taskData }); 
    } catch (error) {
        res.status(500).json({ message: "Task insertion failed", error: error.message });     
    }
});

//2 - Fetching All Task 
taskRoute.get("/listTask",async(req,res)=>{
    try{
        const {page,limit,order}=req.query;
        const skip=(page-1)*limit;
        const sortOrder=order=="asc"?1:-1;    
        const fetchAllTasks=await Task.find().skip(skip).limit(Number(limit)).sort({taskName:sortOrder});                          
        if (fetchAllTasks.length === 0) {  
           return res.status(404).json({message:"Task Doesn't Exist"});      
        } 
        res.status(200).json({message:"Task Fetch Successfully!!","Total Count":`${fetchAllTasks.length}`,fetchAllTasks});
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
           return res.status(404).json({message:"Task Updation Failed."});                   
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

//Searching API
taskRoute.post("/searchTask",async(req,res)=>{
    try{    
        const {searchData}=req.body;
        const searchRes=await Task.find({
            taskName:{$regex:searchData,$options:"i"}
        });
        if(searchRes.length===0){
            return res.status(200).json({message:"Data not found"});            
        }
        res.status(200).json({message:"Data found successfully!!",searchRes});             
    }catch(error){
        res.status(500).json({message:error.message});  
    }
});

module.exports=taskRoute;  