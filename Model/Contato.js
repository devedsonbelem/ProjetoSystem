const mongoose = require("mongoose");
const moment= require('moment-timezone');
const dataBrasil = moment.tz(Date.now(), "America/Sao_Paulo");
const  { ObjectId } =  require("mongodb");

var SchemaContato = mongoose.Schema({
    _id : ObjectId,
    caixa_postal : String,
    cidade : String,
    bairro : String,
    telefone : String,
    aluno_id:  {type: ObjectId, ref: 'AlunoModel'}
});

module.exports =  mongoose.model('contatos', SchemaContato); 