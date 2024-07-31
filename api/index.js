require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 8001;
//const cors = require('cors');
const uri = process.env.MONGODB_URI||"mongodb+srv://vercel-admin-user:JSdjiSgjTzMS3cUy@cluster6.mfwkoxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json());

//app.use(cors());

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("Login_cred", userSchema);

async function connectToDatabase() {
    try {
        console.log("Trying to connect to the server");
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Connection error:", error);
        throw error;
    }
}

// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Sign up api for user sign up
app.post('/SignUp', async (req, res) => {
    try {
        await connectToDatabase();
        let userData = req.body;
        const newUser = new User(userData);
       // console.log("user Data is inserted succesfully",userData)
        await newUser.save();
        //console.log("user Data is inserted succesfully",req.body)
        res.send('User inserted successfully');
        
    } catch (error) {
        res.status(500).send("Error connecting to the database or fetching users");
    } finally {
        mongoose.connection.close();
    }
});

//login api for user login
app.post('/Login', async (req,res)=> {
     await connectToDatabase();
     let userData = req.body;
     let email = userData.email;
     const user = await User.findOne({ email });
     if(user.password===userData.password){
        res.send(true);
     }else{
        res.send("details are incorrect")
     }
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});