// mongo db crud operations
require('dotenv').config();
//const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
const uri = process.env.MONGODB_URI;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log("Trying to connect with server");
    await mongoose.connect(uri).then(()=>console.log("mongo db connected"));
    console.log("connected");
    const userSchema = new mongoose.Schema({
      firstName:{
          type:String,
          required:true
      },
      email:{
          type:String,
          required:true,
      }
  })
  const user = mongoose.model("Login_cred",userSchema)
  await user.create({
      firstName:"it finally works",
      email:"newuserbyvercel@gmail.com"
  })
  }catch(error){
    console.log("Err",error); 

 } finally {
    // Ensures that the client will close when you finish/error
  }
}

// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// test db connection
app.get('/anuj',(req,res)=>{
    run();
    res.send(process.env.MONGODB_URI);
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
