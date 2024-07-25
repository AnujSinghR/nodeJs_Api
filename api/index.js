// mongo db crud operations
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const PORT = 3000;
const uri = "mongodb+srv://vercel-admin-user:JSdjiSgjTzMS3cUy@cluster6.mfwkoxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db('userData');
    await database.collection('Login_cred').insertOne(obj);
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
    run({"Username":"Anuj"});
    res.send('data updated succesfully');
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
