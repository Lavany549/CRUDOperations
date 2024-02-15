const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const path = require('path');
require("dotenv").config();

const app = express();

//middlewares
const corsOptions ={
  origin: "https://crudoperations-k5nc.onrender.com"
}

const dbConfig = require('./DB');

const usersRoute = require('./routes/usersRoute');
const dataRoute = require('./routes/dataRoute');



// app.use(express.static(path.join(__dirname+"/public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api/users', usersRoute);
app.use('/api/data', dataRoute);


const port = process.env.PORT || 5000;


app.listen(port, () => console.log('Node server started using nodemon',port));
