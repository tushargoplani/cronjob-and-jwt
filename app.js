const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var fs = require('fs');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config()

// db
mongoose.connect(process.env.MONGO_URI, {useNewURLParser: true} ).then(()=> console.log("DB connected"))

mongoose.connection.on('error',err => {
    console.log(`DB connection error: ${err.message}`);
})

// bring in routes
const postRoutes = require('./routes/post');

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/" , postRoutes);

cron.schedule('* * * * *', () => {
    appendDataToFile();
  });

function appendDataToFile(){
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    const data = "Data inserted - " + dateTime + "\n";

    fs.appendFile("crondata.txt", data, () => {
        console.log("Data is inserted into the file after one minute!");
    });
}

const port = process.env.Port || 4000;
app.listen(port, ()=>{
    console.log(`A node js API is listening on port : ${port}`);
});