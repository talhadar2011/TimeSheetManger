const express = require('express');
const mongoose = require('mongoose');
const TSMModel = require('./models/tsm.model');
const AuthModel= require("./models/auth.model")
const cors = require('cors'); // Import the cors package

const app = express()
app.use(cors()); // Enable CORS for all origins

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})
//Signin User API
app.get('/api/SignIn/:UserName',async(req,res)=>{
  try{
    const { UserName } = req.params;

    const user = await AuthModel.findOne({ UserName });

    if (!user) {
      // If no user is found, return a 404 error
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user data
    res.status(200).json(user);
  }catch(error){
    res.status(500).json({message:error.message})
  }
});
//Create User API
app.post('/api/SignUp',async(req,res)=>{
  try{
     const User= await AuthModel.create(req.body)
     res.status(200).json(User);
  }catch(error){
    res.status(500).json({message:error.message})
  }
});
/////
app.post('/api/TimeSheetEntry',async(req,res)=>{
    try{
       const TimeSheetData= await TSMModel.create(req.body)
       res.status(200).json(TimeSheetData);
    }catch(error){
      res.status(500).json({message:error.message})
    }
});
app.get('/api/TimeSheetEntry',async(req,res)=>{
  try{
    const TimeSheetData= await TSMModel.find({})
     res.status(200).json(TimeSheetData);
  }catch(error){
    res.status(500).json({message:error.message})
  }
});
app.get('/api/TimeSheetEntry/:id',async(req,res)=>{
  try{
    const {id}= req.params;
    console.log(id,"ID")
    const TimeSheetDataWithId= await TSMModel.findById(id)
     res.status(200).json(TimeSheetDataWithId);
  }catch(error){
    res.status(500).json({message:error.message})
  }
});
mongoose.connect("mongodb+srv://talhadar2011:Deviljin3.@tsm.w5emb.mongodb.net/Data?retryWrites=true&w=majority&appName=TSM")
.then(()=>{
  console.log("Connect to database" )
  app.listen(3000,()=>{
    console.log("Server is running on port 3000")
  })
})
.catch(()=>{
  console.log("Connection Failed!")
})