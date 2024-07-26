// mongo db crud operations
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const PORT = 3000;
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(obj) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log("Trying to connect with server");
    await client.connect();
    
    console.log("connected");
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db('userData');
    await database.collection('Login_data').insertOne(obj);
  }catch(error){
    console.log("Err",error); 

 } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// test db connection
app.get('/anuj',(req,res)=>{
    run({"Username":"Anuj","city":"dehradun"});
    res.send(process.env.MONGODB_URI);
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
