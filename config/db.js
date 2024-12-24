const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    //await mongoose.connect("mongodb://localhost:27017/toDoApp");     
    await mongoose.connect("mongodb+srv://serveshk7:OtjtAGuiBLmayihB@cluster0.yxk0r.mongodb.net/toDoApp?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Call the async function to connect to the database
connectToDatabase();
