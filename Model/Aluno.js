const mongoose = require("mongoose");
const moment= require('moment-timezone');
const dataBrasil = moment.tz(Date.now(), "America/Sao_Paulo");
const  { ObjectId } =  require("mongodb");

var SchemaAluno = mongoose.Schema({
    _id: ObjectId,
   matricula: Number,
   nome_aluno: String,
   status: String,
   uuid_aluno: String,
   data_nascimento: Date
});


module.exports = mongoose.model('alunos', SchemaAluno);