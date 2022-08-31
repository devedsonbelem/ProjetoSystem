const mongoose = require("mongoose");
const moment = require('moment-timezone');
const dataBrasil = moment.tz(Date.now(), "America/Sao_Paulo");
const  { ObjectId } =  require("mongodb");

var SchemaUsers = mongoose.Schema({
   _id: ObjectId,
   nome: String,
   email: String,
   password: String,
   status: String,
   token: String,
   uuid: String,
   dateCreated: {
      type: Date
   },
   dateUpdate: {
      type: Date
   }
});


module.exports = mongoose.model('users', SchemaUsers);