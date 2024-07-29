require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
const uri = process.env.MONGODB_URI;

app.use(express.json());

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
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

// Test DB connection and fetch all users
app.get('/anuj', async (req, res) => {
    try {
        await connectToDatabase();
        const newUser = new User({ firstName: "new user", email: "newuser@example.com" });
        await newUser.save();
        
        res.send('User inserted successfully');
    } catch (error) {
        res.status(500).send("Error connecting to the database or fetching users");
    } finally {
        mongoose.connection.close();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
