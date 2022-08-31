const mongoose = require("mongoose");
const moment= require('moment-timezone');
const dataBrasil = moment.tz(Date.now(), "America/Sao_Paulo");
const  { ObjectId } =  require("mongodb");

var SchemaAvaliacao = mongoose.Schema({
    _id : ObjectId,
    nota1 : Number,
    nota2 :Number,
    media : Number,
    situacao : String,
    observacao : String,
    disciplina_id:{type: ObjectId, ref:'DisciplinaModel'},   
    aluno_id:  {type: ObjectId, ref: 'AlunoModel'} 
});

module.exports =  mongoose.model('avaliacoes', SchemaAvaliacao); 