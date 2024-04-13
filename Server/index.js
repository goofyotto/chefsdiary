
const express = require("express");

const homeroute = require("./Routes/Home.js");
const loginroute = require("./Routes/Login.js");

const app = express();

app.use("/", homeroute);
app.use("/", loginroute);


app.listen((3000), () => {
    console.log("Server is Running");
});