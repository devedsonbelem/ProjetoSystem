const mongoose = require("mongoose");

var SchemaUsers = mongoose.Schema({
   nome: String,
   email: String,
   password: String,
   status: String,
   token: String,
   uuid: String
});


module.exports = mongoose.model('users', SchemaUsers);