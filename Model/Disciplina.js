const mongoose = require("mongoose");
const moment= require('moment-timezone');
const dataBrasil = moment.tz(Date.now(), "America/Sao_Paulo");
const  { ObjectId } =  require("mongodb");

var SchemaDisciplina = mongoose.Schema({
    _id : ObjectId,
    nome_disciplina : String,
    aluno_id:  [{type: ObjectId, ref: 'AlunoModel'}] 
});

//onetoone sem colchetes ...
//inserir colchetes





module.exports =  mongoose.model('disciplinas', SchemaDisciplina); 