const express = require("express");
const app = express();

app.get("/",(req,res) => res.send("Express on vercel"));
app.listen(3000, ()=>console.log("server ready in port 3000"));

module.exports = app;