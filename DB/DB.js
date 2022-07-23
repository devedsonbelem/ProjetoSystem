const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/dbusers");

mongoose.connection.once("open",()=>{console.log("mongodb conectado")});



